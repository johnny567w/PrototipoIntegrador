import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/data-acces/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserProfile().pipe(
      map(user => {
        if (user?.role === 'admin') {
          return true; // Acceso permitido para administradores
        } else {
          this.router.navigate(['/user-dashboard']); // Redirigir si no es administrador
          return false;
        }
      })
    );
  }
}
