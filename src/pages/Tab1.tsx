import { IonContent, IonHeader,IonPage, IonTitle, IonToolbar, useIonViewDidEnter, IonAlert, IonToast } from '@ionic/react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonList,
} from '@ionic/react';
import { fetchUserRepositories, updateRepository, deleteRepository } from '../services/GithubService';
import AuthService from '../services/AuthService';
import './Tab1.css';
import React, { useState, useEffect } from 'react';
import { RepositoryItem } from '../interfaces/Repositoryitem';
import RepoItem from '../components/RepoItem';

import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
const [loading, setLoading] = useState(false);
const [repos, setRepos] = useState<RepositoryItem[]>([]);
const loadRepos= async () => {
  setLoading(true);
  const reposData = await fetchUserRepositories();
  setRepos(reposData);
  setLoading(false);
};
useIonViewDidEnter(() => {
  console.log('Cargando repositorios al entrar en la vista');
  loadRepos();
});

// Escuchar evento global para recargar repos al crearse uno nuevo desde Tab2
useEffect(() => {
  const handler = () => {
    console.log('Evento recibo: repos:updated -> recargando repositorios');
    loadRepos();
  };
  const createdHandler = (e: Event) => {
    const ev = e as CustomEvent<{ message?: string }>;
    console.log('Evento repos:created ->', ev.detail?.message);
    setToastMessage(ev.detail?.message ?? 'Repositorio creado');
    setToastColor('success');
    setToastOpen(true);
  };

  window.addEventListener('repos:updated', handler as EventListener);
  window.addEventListener('repos:created', createdHandler as EventListener);
  return () => {
    window.removeEventListener('repos:updated', handler as EventListener);
    window.removeEventListener('repos:created', createdHandler as EventListener);
  };
}, []);

  const [editAlertOpen, setEditAlertOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepositoryItem | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  //toasts
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success'|'danger'|'primary'|'warning'>('success');

  // carga
  const [processingRepoKey, setProcessingRepoKey] = useState<string | null>(null);

  const handleEdit = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
    setEditName(repo.name);
    setEditDescription(repo.description ?? '');
    setEditAlertOpen(true);
  };

  const confirmEdit = async (nameParam?: string, descriptionParam?: string) => {
    if (!selectedRepo) return;
    const owner = selectedRepo.owner ?? (AuthService.getUsername() ?? '');
    const oldName = selectedRepo.name;
   
    const nameToSend = typeof nameParam === 'string' ? nameParam : editName;
    const descToSend = typeof descriptionParam === 'string' ? descriptionParam : editDescription;
    
    setEditAlertOpen(false);
    const key = `${owner}/${oldName}`;
    setProcessingRepoKey(key);
    setLoading(true);

    console.log('Editando repo:', owner, oldName, '->', nameToSend, descToSend);

    const updated = await updateRepository(owner, oldName, { name: nameToSend, description: descToSend });

    // Detectar si la API devolvió un objeto con datos o un objeto de error
    type UpdatedRepo = { name?: string; description?: string | null; owner?: { login?: string; avatar_url?: string }; language?: string | null; message?: string };
    const upd = (updated as UpdatedRepo) ?? null;

    
    if (upd && (typeof upd.name === 'string' || typeof upd.description === 'string')) {
      setRepos(prev => prev.map(r => (r.owner === owner && r.name === oldName ? {
        name: typeof upd.name === 'string' ? upd.name : r.name,
        description: typeof upd.description === 'string' ? upd.description : r.description,
        imageUrl: upd.owner?.avatar_url ?? r.imageUrl,
        owner: upd.owner?.login ?? r.owner,
        language: typeof upd.language === 'string' ? upd.language : r.language,
      } : r)));

      
      const nameMismatch = typeof upd.name === 'string' && upd.name !== nameToSend;
      const descMismatch = typeof upd.description === 'string' && upd.description !== descToSend;
      if (nameMismatch || descMismatch) {
        setToastMessage(`La API devolvió valores distintos a los solicitados. Respuesta: ${JSON.stringify(upd)}`);
        setToastColor('warning');
        setToastOpen(true);
      } else {
        setToastMessage('Repositorio actualizado correctamente.');
        setToastColor('success');
        setToastOpen(true);
      }
    } else {
      // Si la respuesta no contiene campos válidos, mostramos el mensaje de error si existe
      const errMsg = upd?.message ? ` (${upd.message})` : '';
      setToastMessage('Error al actualizar el repositorio.' + errMsg + ' Reintentando recarga.');
      setToastColor('danger');
      setToastOpen(true);
      await loadRepos();
    }

    setProcessingRepoKey(null);
    setSelectedRepo(null);
    setLoading(false);

  };

  const handleDelete = (repo: RepositoryItem) => {
    setSelectedRepo(repo);
    setDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRepo) return;
    const owner = selectedRepo.owner ?? '';
    const name = selectedRepo.name;
    const key = `${owner}/${name}`;
    setProcessingRepoKey(key);
    setLoading(true);

    const success = await deleteRepository(owner, name);
    if (success) {
      setRepos(prev => prev.filter(r => !(r.owner === owner && r.name === name)));
      setToastMessage('Repositorio eliminado correctamente.');
      setToastColor('success');
      setToastOpen(true);
    } else {
      setToastMessage('Error al eliminar el repositorio.');
      setToastColor('danger');
      setToastOpen(true);
    }

    setProcessingRepoKey(null);
    setDeleteAlertOpen(false);
    setSelectedRepo(null);
    setLoading(false);
  };
//slide
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Estos son los repositorios disponibles:</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {repos.map((repo) => {
            const key = `${repo.owner ?? 'unknown'}/${repo.name}`;
            return (
              <RepoItem
                key={key}
                repo={repo}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isProcessing={processingRepoKey === key}
              />
            );
          })}
        </IonList>
        <LoadingSpinner isOpen={loading} />

        <IonAlert
          isOpen={editAlertOpen}
          onDidDismiss={() => setEditAlertOpen(false)}
          header={'Editar repositorio'}
          inputs={[
            {
              name: 'name',
              type: 'text',
              value: editName,
              placeholder: 'Nombre',
            },
            {
              name: 'description',
              type: 'text',
              value: editDescription,
              placeholder: 'Descripción',
            },
          ]}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                setEditAlertOpen(false);
                setSelectedRepo(null);
              }
            },
            {
              text: 'Guardar',
              handler: (data) => {
                const d = data as { name?: string; description?: string };
                
                confirmEdit(d.name ?? '', d.description ?? '');
              }
            }
          ]}
        />

        <IonAlert
          isOpen={deleteAlertOpen}
          onDidDismiss={() => setDeleteAlertOpen(false)}
          header={'Confirmar eliminación'}
          message={`¿Deseas eliminar el repositorio "${selectedRepo?.name}"?`}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                setDeleteAlertOpen(false);
                setSelectedRepo(null);
              }
            },
            {
              text: 'Eliminar',
              cssClass: 'danger',
              handler: () => {
              
                setDeleteAlertOpen(false);
                confirmDelete();
              }
            }
          ]}
        />

        <IonToast
          isOpen={toastOpen}
          message={toastMessage}
          duration={3000}
          color={toastColor}
          onDidDismiss={() => setToastOpen(false)}
        />
      </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;