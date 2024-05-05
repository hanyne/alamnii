import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Professor } from '../model/professor'

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private professorsCollection: AngularFirestoreCollection<Professor>;

  constructor(private firestore: AngularFirestore) {
    this.professorsCollection = firestore.collection<Professor>('professor');
  }

  getAllProfessors(): Observable<Professor[]> {
    return this.professorsCollection.valueChanges({ idField: 'id' });
  }

  addProfessor(professor: Professor): Promise<any> {
    return this.professorsCollection.add(professor);
  }

  deleteProfessor(professorId: string): Promise<void> {
    return this.professorsCollection.doc(professorId).delete();
  }
}
