import { Routes } from '@angular/router';
import { RegisterComponent } from './libs/auth/register/register.component';
import { LoginComponent } from './libs/auth/login/login.component';
import { DashboardComponent } from './libs/home/dashboard/dashboard.component';
import { LandingPageComponent } from './libs/landing-page/landing-page.component';
import { MyProjectsComponent } from './libs/home/libs/my-projects/my-projects.component';
import { AllProjectsComponent } from './libs/home/libs/all-projects/all-projects.component';
import { ReviewPageComponent } from './libs/review-page/review-page.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'review/:_id',
    component: ReviewPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'my-projects', component: MyProjectsComponent },
      { path: 'all-projects', component: AllProjectsComponent },

      { path: '', redirectTo: 'all-projects', pathMatch: 'full' },
    ],
  },
];
