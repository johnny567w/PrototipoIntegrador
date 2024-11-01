import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pages/auth',
        loadChildren:() => import('./auth/features/auth.routes')
      },
    ];

