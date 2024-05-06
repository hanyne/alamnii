import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }

 login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');

        if(res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['dashboard']);
        }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // Méthode d'enregistrement
  register(email: string, password: string, firstName: string, lastName: string): void {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        const userId = res.user.uid;
        const userData: User = { id: userId, email, firstName, lastName };
        // Enregistrement des données supplémentaires dans Firestore
        this.firestore.collection('user').doc(userId).set(userData)
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

