// Replace with your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDSdmGGlMTx5XN3lWK6tDZMmWgsq2lORis",
    authDomain: "fbt2-c417b.firebaseapp.com",
    projectId: "fbt2-c417b",
    storageBucket: "fbt2-c417b.appspot.com",
    messagingSenderId: "152500425726",
    appId: "1:152500425726:web:c278c616a691e8838566af",
    measurementId: "G-K9T8WJYYST"
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
