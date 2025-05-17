import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "lab4-8e154.firebaseapp.com",
  projectId: "lab4-8e154",
  storageBucket: "lab4-8e154.firebasestorage.app",
  messagingSenderId: "829918488087",
  appId: "1:829918488087:web:77c834a2d8de4310295e52",
  measurementId: "G-ET2XS1PRPK",
};

const app = initializeApp(firebaseConfig);

export default app;