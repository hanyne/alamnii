import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Parent } from '../model/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private parentsCollection: AngularFirestoreCollection<Parent>;

  constructor(private firestore: AngularFirestore) {
    this.parentsCollection = firestore.collection<Parent>('parent');
  }

  getAllParents(): Observable<Parent[]> {
    return this.parentsCollection.valueChanges({ idField: 'id' });
  }

  addParent(parent: Parent): Promise<any> {
    return this.parentsCollection.add(parent);
  }

  deleteParent(parentId: string): Promise<void> {
    return this.parentsCollection.doc(parentId).delete();
  }
}
