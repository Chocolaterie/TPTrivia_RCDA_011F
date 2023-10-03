import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'trivia',
    loadComponent: () => import('./correction/trivia/trivia.page').then( m => m.TriviaPage)
  },
  {
    path: '',
    redirectTo: 'trivia',
    pathMatch: 'full',
  },
];
