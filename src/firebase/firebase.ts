import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBysz_4uX9jzsUC66t317xw62sSPfw2HQw",
  authDomain: "coldwesttodo.firebaseapp.com",
  projectId: "coldwesttodo",
  storageBucket: "coldwesttodo.firebasestorage.app",
  messagingSenderId: "775499470141",
  appId: "1:775499470141:web:df7fc7ad320140baaaa154",
});
const db = getFirestore(firebaseApp);

export default db;
