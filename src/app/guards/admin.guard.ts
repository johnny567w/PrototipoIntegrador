import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/data-acces/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserProfile().pipe(
      map(user => {
        if (user?.role === 'admin') {
          return true; // Permitir el acceso si el usuario es administrador
        } else {
          this.router.navigate(['/user-dashboard']); // Redirigir a user-dashboard si no es administrador
          return false;
        }
      })
    );
  }
}
