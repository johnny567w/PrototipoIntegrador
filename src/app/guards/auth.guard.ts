import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/data-acces/auth.service';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserProfile().pipe(
      map(user => !!user), // Solo verifica que haya un usuario autenticado
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['auth/sign-in']); // Redirigir si no está autenticado
        }
      }),
      catchError(() => {
        this.router.navigate(['auth/sign-in']);
        return of(false);
      })
    );
  }
}
