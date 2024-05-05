import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from '../../../model/parent';
import { ParentService } from '../../../shared/parent.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-liste-parent',
  templateUrl: './liste-parent.component.html',
  styleUrls: ['./liste-parent.component.css']
})
export class ListeParentComponent implements OnInit {
  parents$: Observable<Parent[]>;
  newParent: Parent = { firstName: '', lastName: '', email: '' };
  selectedParent: Parent;
  isAdding: boolean = true; // Initialize isAdding to true initially

  constructor(
    private parentService: ParentService,
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.getParents();
  }

  getParents(): void {
    this.parents$ = this.parentService.getAllParents();
  }

  async addParent(): Promise<void> {
    try {
      // Demander à l'utilisateur de fournir le mot de passe pour ajouter un parent
      const password = prompt('Please enter the password for the new parent:');
  
      if (password) {
        const { email, firstName, lastName } = this.newParent; // Récupérer les valeurs saisies dans le formulaire
  
        // Créer l'utilisateur dans Firebase Authentication
        const { user } = await this.fireauth.createUserWithEmailAndPassword(email, password);
  
        // Stocker les informations du parent dans Firestore
        const parent: Parent = {
          firstName: firstName,
          lastName: lastName,
          email: email
        };
  
        await this.firestore.collection('parent').doc(user.uid).set(parent);
  
        // Réinitialiser le formulaire
        this.newParent = { firstName: '', lastName: '', email: '' };
  
        console.log('Parent ajouté avec succès');
      } else {
        console.log('Opération annulée : mot de passe non fourni');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du parent :', error);
    }
  }
  
  async deleteParent(parentId: string): Promise<void> {
    await this.parentService.deleteParent(parentId);
  }

  updateParent(parent: Parent): void {
    // Mettre à jour un parent
    this.selectedParent = { ...parent }; // Copier le parent sélectionné pour éviter de modifier les données originales directement
    // Afficher les données du parent dans le formulaire
    this.newParent = { firstName: parent.firstName, lastName: parent.lastName, email: parent.email };
    this.isAdding = false; // Set isAdding to false when updating parent
  }

  async saveUpdatedParent(): Promise<void> {
    try {
      // Mettre à jour le parent dans Firestore
      await this.firestore.collection('parent').doc(this.selectedParent.id).update({
        firstName: this.newParent.firstName,
        lastName: this.newParent.lastName,
        email: this.newParent.email
      });

      // Réinitialiser le formulaire et la sélection du parent
      this.newParent = { firstName: '', lastName: '', email: '' };
      this.selectedParent = null;
      this.isAdding = true; // Set isAdding to true after updating parent

      console.log('Parent mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du parent :', error);
    }
  }
}
