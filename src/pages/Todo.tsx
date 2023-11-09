import React, { useState, useEffect } from "react";
import {
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { create, trash } from "ionicons/icons";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setCurrEditingIndex] = useState(null);

  const initializeTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  };

  useEffect(() => {
    initializeTodos();
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, { text: newTodo, editing: false }];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
      setNewTodo("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const startEditing = (index) => {
    setCurrEditingIndex(index);
  };

  const updateTodo = (index, newText) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].text = newText;
      updatedTodos[index].editing = false;
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setCurrEditingIndex(null);
  };

  const cancelEditing = (index) => {
    setCurrEditingIndex(null);
  };

  const deleteTodo = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setCurrEditingIndex(null);
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>TODO App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          value={newTodo}
          placeholder="Enter a new TODO"
          onIonChange={(e) => setNewTodo(e.detail.value)}
          onKeyPress={handleKeyPress}
        />
        <IonButton expand="full" onClick={addTodo}>
          Add TODO
        </IonButton>
        <IonList>
          {todos.map((todo, idx) => (
            <IonItem key={idx}>
              {editingIndex === idx ? (
                <>
                  <IonInput
                    value={todo.text}
                    onIonChange={(e) => updateTodo(idx, e.detail.value)}
                  />
                  <IonButton slot="end" onClick={() => cancelEditing(idx)}>
                    Cancel
                  </IonButton>
                </>
              ) : (
                <>
                  <IonLabel>{todo.text}</IonLabel>
                  <IonButtons slot="end">
                    <IonButton onClick={() => startEditing(idx)}>
                      <IonIcon icon={create} />
                    </IonButton>
                    <IonButton onClick={() => deleteTodo(idx)}>
                      <IonIcon icon={trash} />
                    </IonButton>
                  </IonButtons>
                </>
              )}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TodoApp;
