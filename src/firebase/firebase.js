// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import the storage function

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASgAH8E5UAtQOsTjbAZmLs0nP1NyiqFVw",
  authDomain: "js-and-jg-database.firebaseapp.com",
  projectId: "js-and-jg-database",
  storageBucket: "js-and-jg-database.appspot.com",
  messagingSenderId: "411197912691",
  appId: "1:411197912691:web:9d6012a35ddd6e38bc1c06",
  measurementId: "G-C2C4QFQW65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export the storage instance
export { db,storage, analytics };
