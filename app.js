import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, updateDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWPCV6rYquQmpWa_TaLXr-YRKYjsXyXqM",
  authDomain: "fir-01-9ed61.firebaseapp.com",
  projectId: "fir-01-9ed61",
  storageBucket: "fir-01-9ed61.appspot.com",
  messagingSenderId: "316672678531",
  appId: "1:316672678531:web:4c8421026df75336e619b6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateTodo(id) {
  todoList.innerHTML = '';
  const docRef = doc(db, "todo", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.data().check == "False") {
    await updateDoc(docRef, {
      check: "True"
    });
  } else {
    await updateDoc(docRef, {
      check: "False"
    });
  }
}

async function deleteTodo(id) {
  todoList.innerHTML = '';
  await deleteDoc(doc(db, "todo", id));
}

const todoList = document.getElementById("todo-list");

const querySnapshot = await getDocs(collection(db, "todo"));
querySnapshot.forEach((doc) => {
  const todoOutput = document.createElement('li');
  todoOutput.innerHTML = `
    <p class="p-container"><input type="checkbox" id="checkbox-${doc.id}"> ${doc.data().id}</p> <button id="delete-${doc.id}">Delete</button>
  `;
  todoList.appendChild(todoOutput);
  if (doc.data().check == "False") {
    document.getElementById(`checkbox-${doc.id}`).checked = false;
  } else {
    document.getElementById(`checkbox-${doc.id}`).checked = true;
  }
  document.getElementById(`checkbox-${doc.id}`).addEventListener("change", () => updateTodo(doc.id));
  document.getElementById(`delete-${doc.id}`).addEventListener("click", () => deleteTodo(doc.id));
});

const todoInput = document.getElementById("todo-input");
document.getElementById("todo-submit").onclick = async () => {
  const docRef = await addDoc(collection(db, "todo"), {
    id: todoInput.value,
    check: "False"
  });
  console.log("Document written with ID: ", docRef.id);
  todoList.innerHTML = '';
  todoInput.value = '';
  const querySnapshot = await getDocs(collection(db, "todo"));
  querySnapshot.forEach((doc) => {
    const todoOutput = document.createElement('li');
    todoOutput.innerHTML = `
      <p class="p-container"><input type="checkbox" id="checkbox-${doc.id}"> ${doc.data().id}</p>  <button id="delete-${doc.id}">Delete</button>
    `;
    todoList.appendChild(todoOutput);
    if (doc.data().check == "False") {
      document.getElementById(`checkbox-${doc.id}`).checked = false;
    } else {
      document.getElementById(`checkbox-${doc.id}`).checked = true;
    }
    document.getElementById(`checkbox-${doc.id}`).addEventListener("change", () => updateTodo(doc.id));
    document.getElementById(`delete-${doc.id}`).addEventListener("click", () => deleteTodo(doc.id));
  });
};
