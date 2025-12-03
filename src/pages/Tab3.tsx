import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
         <IonCard>
      <img alt="David Chamorro" src="https://img.a.transfermarkt.technology/portrait/big/117682-1440096403.JPG?lm=1" />
      <IonCardHeader>
        <IonCardTitle>DavidChamorro</IonCardTitle>
        <IonCardSubtitle>@Davisek2024</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Soy un estudiante de informática de la UISEK.</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
