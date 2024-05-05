import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  addUser(user: User) {
    user.id = this.afs.createId();
    return this.afs.collection('/Users').add(user);
  }

  getAllUsers() {
    return this.afs.collection('/Users').snapshotChanges();
  }

  updateUserById(userId: string, updatedUser: User) {
    return this.afs.doc('/Users/' + userId).update(updatedUser)
      .then(() => {
        console.log('User updated successfully');
      })
      .catch(error => {
        console.error('Error updating user: ', error);
        throw error; 
      });
  }

  deleteUser(user: User) {
    this.afs.doc('/Users/' + user.id).delete();
  }

  getUserById(userId: string) {
    return this.afs.doc<User>('/Users/' + userId).valueChanges();
  }
}
