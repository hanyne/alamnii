import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../../model/professor';
import { ProfessorService } from '../../shared/professor.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit{
  professors$: Observable<Professor[]>;
  newProfessor: Professor = { firstName: '', lastName: '', email: '', category: '' };
  selectedProfessor: Professor;
  isAdding: boolean = true; // Initialize isAdding to true initially

  constructor(
    private professorService: ProfessorService,
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.getProfessors();
  }

  getProfessors(): void {
    this.professors$ = this.professorService.getAllProfessors();
  }

  async addProfessor(): Promise<void> {
    try {
      const password = prompt('Please enter the password for the new professor:');

      if (password) {
        const { email, firstName, lastName, category } = this.newProfessor;

        const { user } = await this.fireauth.createUserWithEmailAndPassword(email, password);

        const professor: Professor = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          category: category

        };

        await this.firestore.collection('professor').doc(user.uid).set(professor);

        this.newProfessor = { firstName: '', lastName: '', email: '' , category: ''};

        console.log('Professor ajouté avec succès');
      } else {
        console.log('Opération annulée : mot de passe non fourni');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du professor :', error);
    }
  }

  async deleteProfessor(professorId: string): Promise<void> {
    await this.professorService.deleteProfessor(professorId);
  }

  updateProfessor(professor: Professor): void {
    this.selectedProfessor = { ...professor };
    this.newProfessor = { firstName: professor.firstName, lastName: professor.lastName, email: professor.email , category: professor.category };
    this.isAdding = false;
  }

  async saveUpdatedProfessor(): Promise<void> {
    try {
      await this.firestore.collection('professor').doc(this.selectedProfessor.id).update({
        firstName: this.newProfessor.firstName,
        lastName: this.newProfessor.lastName,
        email: this.newProfessor.email,
        category: this.newProfessor.category
      });

      this.newProfessor = { firstName: '', lastName: '', email: '', category: '' };
      this.selectedProfessor = null;
      this.isAdding = true;

      console.log('Professor mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du professor :', error);
    }
  }
}
