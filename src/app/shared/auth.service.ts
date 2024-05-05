import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, User} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { Parent } from '../model/parent';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

  // Méthode de connexion
  login(email: string, password: string): void {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        // Récupérer le type de l'utilisateur à partir de la base de données
        this.getUserType(userId)
          .then((userType) => {
            // Rediriger l'utilisateur en fonction de son type
            switch (userType) {
              case 'admin':
                this.router.navigate(['dashboard']);
                break;
              case 'professeur':
                this.router.navigate(['espace-professor']);
                break;
              case 'parent':
                this.router.navigate(['espace-parent']);
                break;
              default:
                this.router.navigate(['']); 
                break;
            }
          })
          .catch(err => {
            console.error("Error getting user type:", err);
            this.router.navigate(['/login']);
          });
      })
      .catch(err => {
        alert(err.message);
        this.router.navigate(['/login']);
      });
  }

  // Méthode pour récupérer le type d'utilisateur à partir de la base de données
  async getUserType(userId: string): Promise<string> {
    const userDoc = await this.firestore.collection('user').doc(userId).get().toPromise();
    if (userDoc.exists) {
        return 'admin';
    }

    const professeurDoc = await this.firestore.collection('professeur').doc(userId).get().toPromise();
    if (professeurDoc.exists) {
        return 'professeur';
    }

    const parentDoc = await this.firestore.collection('parent').doc(userId).get().toPromise();
    if (parentDoc.exists) {
        return 'parent';
    }

    // Si aucun type n'est trouvé, retournez par défaut 'user'
    return 'parent';
  }

  // Méthode d'enregistrement
  register(email: string, password: string, firstName: string, lastName: string): void {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        const userId = res.user.uid;
        const parentData: Parent = { id: userId, email, firstName, lastName };
        // Enregistrement des données supplémentaires dans Firestore
        this.firestore.collection('user').doc(userId).set(parentData)
          .then(() => {
            alert('Inscription réussie');
            this.sendEmailForVerification(res.user);
            this.router.navigate(['/login']);
          })
          .catch(err => {
            alert(err.message);
          });
      })
      .catch(err => {
        alert(err.message);
      });
  }

  // Déconnexion
  logout(): void {
    this.fireauth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        alert(err.message);
      });
  }

  // Mot de passe oublié
  forgotPassword(email: string): void {
    this.fireauth.sendPasswordResetEmail(email)
      .then(() => {
        this.router.navigate(['/verify-email']);
      })
      .catch(err => {
        alert('Une erreur s\'est produite');
      });
  }

  // Envoi d'email de vérification
  sendEmailForVerification(user: any): void {
    user.sendEmailVerification()
      .then(() => {
        this.router.navigate(['/verify-email']);
      })
      .catch(() => {
        alert('Une erreur s\'est produite. Impossible d\'envoyer un e-mail à votre adresse.');
      });
  }

  // Connexion avec Google
  googleSignIn(): void {
    this.fireauth.signInWithPopup(new GoogleAuthProvider())
      .then(res => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
      })
      .catch(err => {
        alert(err.message);
      });
  } 
}

