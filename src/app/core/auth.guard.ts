import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/data-acces/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserProfile().pipe(
      map(user => {
        if (user) {
          return true; // El usuario está autenticado
        } else {
          this.router.navigate(['/auth/sign-in']);
          return false; // El usuario no está autenticado
        }
      })
    );
  }
}
