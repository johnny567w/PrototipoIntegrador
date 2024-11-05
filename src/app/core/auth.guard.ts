import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/data-acces/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getUserProfile().pipe(
      map(user => {
        if (user) {
          // Redirige según el rol del usuario
          if (user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
          return true;
        } else {
          // Redirige solo si no está autenticado y evita redirección infinita
          return this.router.parseUrl('/auth/sign-in');
        }
      }),
      tap(redirected => {
        if (redirected instanceof UrlTree) {
          this.router.navigateByUrl(redirected);
        }
      })
    );
  }
}
