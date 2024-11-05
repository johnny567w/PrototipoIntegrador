import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { AuthService, User } from '../../../services/data-acces/auth.service';
import { toast } from 'ngx-sonner';
import { GoogleComponent } from '../../Ui/google/google.component';
import { hasEmailError } from '../../utils/validators';

export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, GoogleComponent],  // Añade RouterModule aquí
  templateUrl: './sign-in.component.html',
  styles: ``
})
export default class SignInComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required]),
  });

  isRequired(field: 'email' | 'password'): boolean {
    const control = this.form.get(field);
    return control ? control.hasError('required') && control.touched : false;
  }

  isEmailError() {
    return hasEmailError(this.form);
  }

  async submit() { 
    if (this.form.invalid) return;

    try {
      const { email, password } = this.form.value;
      if (!email || !password) return;
      
      await this._authService.signIn({ email, password });

      this._authService.getUserProfile().subscribe((user: User | null) => {
        if (user?.role === 'admin') {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/user-dashboard';
        }
      });

      toast.success('Bienvenido');
    } catch (error) {
      toast.error('Error, intente nuevamente');
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();

      this._authService.getUserProfile().subscribe((user: User | null) => {
        if (user?.role === 'admin') {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/user-dashboard';
        }
      });

      toast.success('Inicio de sesión exitoso con Google');
    } catch (error) {
      toast.error('Ocurrió un error al iniciar sesión con Google');
    }
  }

  redirectToSignUp() {
    window.location.href = '/auth/sign-up';
  }
}
