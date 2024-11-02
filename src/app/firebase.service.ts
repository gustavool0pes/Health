import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "Suas-Credências",
  authDomain: "Suas-Credências",
  projectId: "Suas-Credências",
  storageBucket: "Suas-Credências",
  messagingSenderId: "Suas-Credências",
  appId: "Suas-Credências",
  measurementId: "Suas-Credências"
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