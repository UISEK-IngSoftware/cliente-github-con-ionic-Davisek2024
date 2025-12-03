import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
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
      <IonInput label="Nombre del repositorio" labelPlacement="floating" fill="outline" placeholder="Inserte nombre">

      </IonInput>

      <br />

      <IonInput label="Descripción del repositorio" labelPlacement="floating" fill="outline" placeholder="Inserte una descripción"></IonInput>
    </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
