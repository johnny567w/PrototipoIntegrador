import { Routes } from "@angular/router";

export default [
    {
        path: 'pages/sign-in',
        loadComponent: () => import('./sign-in/sign-in.component')
      },
      {
        path: 'pages/sign-up',
        loadComponent: () => import('./sign-up/sign-up.component')
      },

] as Routes