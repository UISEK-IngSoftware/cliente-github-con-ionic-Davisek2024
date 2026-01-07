import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
} from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import { useState } from "react";
import AuthServices from "../services/AuthService";

const Login: React.FC = () => {
  const [username, setUsername] = useState(""); 
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !token) {
      setError("Por favor, ingresa tanto el usuario como el token de GitHub.");
      return;
    }

    const success = AuthServices.login(username, token);

    if (success) {
      console.log("éxito!!!!");
      window.location.href = "/tab1";
    } else {
      console.log("falla!!!!");
      setError("Error al iniciar sesión.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="login-container">
          <IonIcon icon={logoGithub} className="login-logo" />
          <h1>Inicio de Sesión con GitHub</h1>

          <form className="login-form" onSubmit={handleLogin}>
            <IonInput
              className="login-field"
              label="Usuario de GitHub"
              labelPlacement="floating"
              fill="outline"
              value={username}
              onIonInput={(e) => setUsername(e.detail.value!)}
              type="text"
              required
            />

            <IonInput
              className="login-field"
              label="Token de GitHub"
              labelPlacement="floating"
              fill="outline"
              value={token}
              onIonInput={(e) => setToken(e.detail.value!)}
              type="password"
              required
            />

            {error && (
              <IonText color="danger">
                <p>{error}</p>
              </IonText>
            )}

            <IonButton expand="block" type="submit" className="login-button">
              Iniciar Sesión
            </IonButton>

            <IonText color="medium" className="login-hint">
              <p>Ingresa tu usuario y token de GitHub para continuar.</p>
            </IonText>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;