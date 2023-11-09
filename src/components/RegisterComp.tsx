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

const RegisterContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegister = async () => {
    await localStorage.setItem("mykey", JSON.stringify({ email, password }));
    history.push("/home");
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
            <h2>Register</h2>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              placeholder="Email"
            />
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              placeholder="Password"
            />
            <IonButton expand="full" onClick={handleRegister}>
              Register
            </IonButton>
            <p style={{ textAlign: "center" }}>
              already registered?{" "}
              <IonRouterLink routerLink="/login">Login</IonRouterLink>
            </p>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default RegisterContainer;
