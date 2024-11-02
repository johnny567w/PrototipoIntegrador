import { Routes } from '@angular/router';
//import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes')
  },
  {
    path: '**',
    redirectTo: '/auth', // o la ruta que prefieras
  },
];

  //{
   // canActivateChild: [publicGuard()],
    //path: 'auth',
   // loadChildren: () => import('./auth/features/auth.routes'),
 // },
 //{
//  canActivateChild: [privateGuard()],
  
  // path: 'tasks',
 //   loadComponent: () => import('./shared/ui/layout.component'),
  //  loadChildren: () => import('./task/features/task.routes'),
 //},
//  {
 //   path: '**',
   //  redirectTo: '/tasks',
 // },
