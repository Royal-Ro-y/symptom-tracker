import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyACzVHJ2XYmbgViLDP6AWxZS2I053Q3tro",
  authDomain: "hello-world-7ce33.firebaseapp.com",
  projectId: "hello-world-7ce33",
  storageBucket: "hello-world-7ce33.firebasestorage.app",
  messagingSenderId: "610049327506",
  appId: "1:610049327506:web:af2a9290abe0d4a683c14b",
  measurementId: "G-Q5P0JTYZH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db= getFirestore(app);

export {app, db}
