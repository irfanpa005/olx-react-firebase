import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDXAtkDwHyXwYl0DJlkYNwmgZuArsk6_9Y",
  authDomain: "olx-clone-react-54007.firebaseapp.com",
  projectId: "olx-clone-react-54007",
  storageBucket: "olx-clone-react-54007.appspot.com",
  messagingSenderId: "939418810283",
  appId: "1:939418810283:web:894d74c93d7dcc043784ee",
  measurementId: "G-2CPWNSK88E"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const analytics = getAnalytics(firebaseApp);