import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
} from '@ionic/react';
import './Tab1.css';
import { logoAndroid } from 'ionicons/icons';

const Tab1: React.FC = () => {
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
          <IonItem>
            <IonThumbnail slot="start">
              <IonIcon aria-hidden="true" icon={logoAndroid} style={{ width: '40px', height: '40px' }}color='success'/>
            </IonThumbnail>
            <IonLabel>Repositorio 1</IonLabel>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
              <IonIcon aria-hidden="true" icon={logoAndroid} style={{ width: '40px', height: '40px' }} color='success'/>
            </IonThumbnail>
            <IonLabel>Repositorio 2</IonLabel>
          </IonItem>

          <IonItem>
            <IonThumbnail slot="start">
              <IonIcon aria-hidden="true" icon={logoAndroid} style={{ width: '40px', height: '40px' }} color='success' />
            </IonThumbnail>
            <IonLabel>Repositorio 3</IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonThumbnail slot="start">
              <IonIcon aria-hidden="true" icon={logoAndroid} style={{ width: '40px', height: '40px' }}color='success' />
            </IonThumbnail>
            <IonLabel>Repositorio 4</IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;