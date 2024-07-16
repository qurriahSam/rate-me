import { Routes } from '@angular/router';
import { RegisterComponent } from './libs/auth/register/register.component';
import { LoginComponent } from './libs/auth/login/login.component';
import { DashboardComponent } from './libs/home/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];
