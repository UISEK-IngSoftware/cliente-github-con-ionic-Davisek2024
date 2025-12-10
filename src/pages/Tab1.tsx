import { IonContent, IonHeader,IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonList,
} from '@ionic/react';
import { fetchUserRepositories } from '../services/GithubService';
import './Tab1.css';
import React, { useState } from 'react';
import { RepositoryItem } from '../interfaces/Repositoryitem';
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
const [repos, setRepos] = useState<RepositoryItem[]>([]);
const loadRepos= async () => {
  const reposData = await fetchUserRepositories();
  setRepos(reposData);
};
useIonViewDidEnter(() => {
  console.log('Cargando repositorios al entrar en la vista');
  loadRepos();
});


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
          {repos.map((repo, index) => (
            <RepoItem key={index} repo={repo}/>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;