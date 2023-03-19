// Replace with your Firebase configuration object
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
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);
  
  // Get HTML elements
  const valueDisplay = document.getElementById("value-display");
  const inputValue = document.getElementById("input-value");
  const submitValueButton = document.getElementById("submit-value");
  
  // Listen for changes in Firestore
  const valueRef = db.collection("values").doc("counter");
  valueRef.onSnapshot((snapshot) => {
    const data = snapshot.data();
    valueDisplay.textContent = data.value;
  });
  
  // Update value in Firestore based on input box
  submitValueButton.addEventListener("click", async () => {
    const newValue = inputValue.value;
    if (newValue) {
      await valueRef.update({ value: newValue });
      inputValue.value = "";
    }
  });
