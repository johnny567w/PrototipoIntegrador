import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/data-acces/auth.service';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserProfile().pipe(
      map(user => user?.role === 'admin'), // Verifica si el rol es admin
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['user-dashboard']); // Redirigir si no es admin
        }
      }),
      catchError(() => {
        this.router.navigate(['auth/sign-in']);
        return of(false);
      })
    );
  }
}
