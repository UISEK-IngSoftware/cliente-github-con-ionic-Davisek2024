import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter
} from '@ionic/react';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/react';
import { useState } from 'react';
import './Tab3.css';

import { getUserInfo} from '../services/GithubService';
import { UserInfo } from '../interfaces/Userinfo';
import AuthServices from '../services/AuthService';
import { useHistory } from 'react-router-dom';
import { logOutOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const history = useHistory();

  const loadUserInfo = async () => {
    const info = await getUserInfo();
    setUserInfo(info);
  };

  useIonViewDidEnter(() => {
    loadUserInfo();
  });

  const handleLogout = () => {
    AuthServices.logout();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          {userInfo && (
            <>
              <img
                src={userInfo.avatar_url}
                alt={userInfo.name}
                style={{
                  width: '120px',
                  borderRadius: '50%',
                  margin: '16px auto',
                  display: 'block'
                }}
              />

              <IonCardHeader>
                <IonCardTitle>{userInfo.name}</IonCardTitle>
                <IonCardSubtitle>@{userInfo.login}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                {userInfo.bio}
              </IonCardContent>
            </>
          )}
        </IonCard>

        <IonButton
          expand="block"
          color="danger"
          onClick={handleLogout}
        >
          <IonIcon slot="start" icon={logOutOutline} />
          Cerrar Sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;