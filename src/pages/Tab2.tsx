import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router';
import { RepositoryItem } from '../interfaces/Repositoryitem';
import { createRepository } from '../services/GithubService';

const Tab2: React.FC = () => {

  const history = useHistory();

  const RepoFormData : RepositoryItem={
    name: '',
    description: '',
    imageUrl: null,
    owner: null,
    language:null,
  };


  const setRepoName=(value:string)=>{
    RepoFormData.name=value;
  };

  const setRepoDescription=(value:string)=>{
    RepoFormData.description=value;
  }

  const saveRepository=()=>{
    if (RepoFormData.name.trim() ==='') {
      alert('El nombre del repositorio es obligatorio.');
      return;
    }

    createRepository(RepoFormData)
    .then(() => {history.push('/tab1');})
    .catch(() => {
      alert('Hubo un error al crear el repositorio.');
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de repositiorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de repositiorio</IonTitle>
          </IonToolbar>
        </IonHeader>
<div className='center-vertical'>

      <IonInput label="Nombre del repositorio" labelPlacement="floating" fill="outline" placeholder="Inserte nombre"
        value={RepoFormData.name} onIonChange={(e) => setRepoName(e.detail.value!)}>
      </IonInput>

      <IonInput label="Descripción del repositorio" labelPlacement="floating" fill="outline" placeholder="Inserte una descripción" 
      value={RepoFormData.description} onIonChange={(e) => setRepoDescription(e.detail.value!)}>

      </IonInput>
    </div>

    <IonButton expand="block" className="form-field" onClick={saveRepository}>
      Guardar
    </IonButton>
    </IonContent>
    </IonPage>
  );
};

export default Tab2;
