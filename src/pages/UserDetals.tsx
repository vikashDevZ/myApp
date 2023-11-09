import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonImg,
  IonModal,
  IonButton,
} from "@ionic/react";
import "./UserDetails.css";

const TableExample = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const fetchUser = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.log("error", error);
    }
  };
  const openModal = (id) => {
    setModalData(...users.filter((item) => item.id === id));
    setShowModal(true);
  };

  console.log("modalData", modalData);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Table</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="2" style={{ paddingLeft: "0", paddingRight: "0" }}>
              <IonItem>
                <IonLabel>Image</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol size="3" style={{ paddingLeft: "0", paddingRight: "0" }}>
              <IonItem>
                <IonLabel>Name</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol size="3" style={{ paddingLeft: "0", paddingRight: "0" }}>
              <IonItem>
                <IonLabel>Gender</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol size="3" style={{ paddingLeft: "0", paddingRight: "0" }}>
              <IonItem>
                <IonLabel>Email</IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          {users.map((item, index) => (
            <IonRow key={index}>
              <IonCol size="2" style={{ paddingLeft: "0", paddingRight: "0" }}>
                <IonItem style={{ height: "100%", overflow: "hidden" }}>
                  <IonImg
                    src={item.image}
                    alt={`User ${index + 1}`}
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "contain",
                    }}
                  />
                </IonItem>
              </IonCol>
              <IonCol size="3" style={{ paddingLeft: "0", paddingRight: "0" }}>
                <IonItem>
                  <IonLabel>
                    {item.firstName} {item.lastName}
                  </IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="3" style={{ paddingLeft: "0", paddingRight: "0" }}>
                <IonItem>
                  <IonLabel>{item.gender}</IonLabel>
                </IonItem>
              </IonCol>
              <IonCol size="3" style={{ paddingLeft: "0", paddingRight: "0" }}>
                <IonItem>
                  <IonLabel>{item.email}</IonLabel>
                </IonItem>
              </IonCol>
              <IonCol
                size="1"
                style={{ paddingLeft: "0", paddingRight: "0" }}
                className="ellipsis-col"
                onClick={() => openModal(item.id)}
              >
                <IonItem className="ellipsis-item">
                  <div>&#8942;</div>
                </IonItem>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        <IonModal
          isOpen={showModal}
          onDidDismiss={closeModal}
          className={showModal ? "ion-modal-visible" : ""}
        >
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonItem style={{ height: "100%", overflow: "hidden" }}>
                    <IonImg
                      src={modalData.image}
                      alt={`User`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
              <IonCol size="4">
                  <IonLabel>{modalData.username}</IonLabel>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol>
                  <IonLabel>{modalData.fullName}</IonLabel>
                </IonCol>
              </IonRow>

              <IonRow>
                <IonCol size="6">
                  <IonLabel>{modalData.gender}</IonLabel>
                </IonCol>
                <IonCol size="6">
                  <IonLabel>{modalData.email}</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonButton onClick={closeModal} expand="full" fill="clear">
              Close Modal
            </IonButton>
          </IonContent>
        </IonModal>{" "}
      </IonContent>
    </IonPage>
  );
};

export default TableExample;
