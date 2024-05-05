import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { VarifyEmailComponent } from './components/varify-email/varify-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ListeParentComponent } from './components/parent/liste-parent/liste-parent.component';
import { ProfessorComponent } from './components/professor/professor.component';
import { EspaceParentComponent } from './components/espace-parent/espace-parent.component';
import { EspaceProfessorComponent } from './components/espace-professor/espace-professor.component';







const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component : LoginComponent },
  {path: 'dashboard', component : DashboardComponent },
  {path: 'register', component : RegisterComponent },
  {path: 'varify-email', component : VarifyEmailComponent },
  {path: 'forgot-password', component : ForgetPasswordComponent },
  {path: 'parent', component : ListeParentComponent },
  {path: 'professor', component : ProfessorComponent },
  {path: 'espace-parent', component : EspaceParentComponent },
  {path: 'espace-professor', component : EspaceProfessorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
