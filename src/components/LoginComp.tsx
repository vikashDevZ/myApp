import "./ExploreContainer.css";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  IonContent,
  IonInput,
  IonButton,
  IonPage,
  IonRouterLink,
  IonRow,
  IonCol,
} from "@ionic/react";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async () => {
    const credentials = JSON.parse(
      (await localStorage.getItem(
        "mykey",
        JSON.stringify({ email, password })
      )) || ""
    );
    if (credentials.email == email && credentials.password == password) {
      history.push("/home");
    }
  };

  return (
    <IonPage
      style={{
        display: "flex",
        width: "80%",
        margin: "auto",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IonContent>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" sizeMd="6">
            <h2>Login</h2>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
              placeholder="Email"
            />
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
              placeholder="Password"
            />
            <IonButton expand="full" onClick={handleLogin}>
              Login
            </IonButton>
            <p style={{ textAlign: "center" }}>
              Not registered?{" "}
              <IonRouterLink routerLink="/register">Register</IonRouterLink>
            </p>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default LoginContainer;
