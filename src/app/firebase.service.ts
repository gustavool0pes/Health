import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDUPVCHGQs9GQ_xe2XWPuzCtzOV9TW6cJU",
  authDomain: "health-5119d.firebaseapp.com",
  projectId: "health-5119d",
  storageBucket: "health-5119d.firebasestorage.app",
  messagingSenderId: "596283301543",
  appId: "1:596283301543:web:220a7166e0793a8f848582",
  measurementId: "G-TD7NG8WCXQ"
  };


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {}

 
  registerUser(email: string, password: string, fullName: string) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        return setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          fullName: fullName,
          createdAt: new Date()
        });
      });
  }
}