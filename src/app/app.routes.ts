import { Routes } from '@angular/router';
import { RegisterComponent } from './libs/auth/register/register.component';
import { LoginComponent } from './libs/auth/login/login.component';
import { DashboardComponent } from './libs/home/dashboard/dashboard.component';
import { LandingPageComponent } from './libs/landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];
