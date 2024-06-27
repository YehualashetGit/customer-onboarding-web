import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
      .then(mod => mod.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module')
      .then(mod => mod.SignupModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./pages/customer-onboarding/onboarding.module')
      .then(mod => mod.CustomerOnboardingModule)
  },

  { path: '', component: HomeComponent, },

];
