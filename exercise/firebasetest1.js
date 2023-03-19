const {
    initializeApp,
    getFirestore,
    doc,
    onSnapshot,
    updateDoc,
  } = window;
  
const firebaseConfig = {
    apiKey: "AIzaSyDPGDfIq5ykubrOY-ZtOcuUf51wjNzYoVM",
    authDomain: "juntestone-e6fd8.firebaseapp.com",
    projectId: "juntestone-e6fd8",
    storageBucket: "juntestone-e6fd8.appspot.com",
    messagingSenderId: "234781401442",
    appId: "1:234781401442:web:87fd50538b0b96c38f0c3b",
    measurementId: "G-Z77NWRQGXJ"
  };
  
// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore, doc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get HTML elements
const valueDisplay = document.getElementById("value-display");
const inputValue = document.getElementById("input-value");
const submitValueButton = document.getElementById("submit-value");

// Listen for changes in Firestore
const valueRef = doc(db, "values", "counter");
onSnapshot(valueRef, (snapshot) => {
  const data = snapshot.data();
  valueDisplay.textContent = data.value;
});

// Update value in Firestore based on input box
submitValueButton.addEventListener("click", async () => {
  const newValue = inputValue.value;
  if (newValue) {
    await updateDoc(valueRef, { value: newValue });
    inputValue.value = "";
  }
});
