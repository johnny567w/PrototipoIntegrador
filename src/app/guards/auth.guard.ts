import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/data-acces/auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.getUserProfile().pipe(
      map(user => {
        if (user) {
          if (user.role === 'admin') {
            return this.router.createUrlTree(['/admin-dashboard']);
          } else {
            return this.router.createUrlTree(['/user-dashboard']);
          }
        } else {
          return this.router.createUrlTree(['/auth/sign-in']);
        }
      })
    );
  }
}
