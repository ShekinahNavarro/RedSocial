  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  import { getFirestore, collection, doc, addDoc, getDoc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB5b9_29Ksw5jP4y1-Jj9G-9kN-yvrEM34",
    authDomain: "red-social-9ec43.firebaseapp.com",
    projectId: "red-social-9ec43",
    storageBucket: "red-social-9ec43.appspot.com",
    messagingSenderId: "188549787785",
    appId: "1:188549787785:web:94ac6c019dec61743f9658",
    measurementId: "G-JP01QL2KZF"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(); 

  // Funciones del CRUD
  export const createTask = (title, description, userName, date, hours,userPhotoURL)=> addDoc(collection(db,"tasks"),{title, description, userName, date, hours,userPhotoURL});

  export const getTask = id => getDoc(doc(db,"tasks",id));
//callback funcion que se pasa como parametro de otra funcion  //snapshot = cada que hay un cambio en la base de datos
  export const onGetTask = callback => onSnapshot(collection(db,"tasks"), callback); 
  
  export const updateTask = (id, newFields) => updateDoc(doc(db,"tasks",id), newFields);

  export const deleteTask = id => deleteDoc(doc(db,"tasks",id));
