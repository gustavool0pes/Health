import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  getUserData(userId: string): Promise<any> {
    return this.firestore.collection('users').doc(userId).get().toPromise();
  }

  updateUserData(userId: string, data: any): Promise<void> {
    return this.firestore.collection('users').doc(userId).update(data);
  }
}
