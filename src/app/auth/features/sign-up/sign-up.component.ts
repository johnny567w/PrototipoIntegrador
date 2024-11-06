import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../../services/data-acces/auth.service';
import { GoogleComponent } from '../../Ui/google/google.component';
import { toast } from 'ngx-sonner';
import { FooterComponent } from "../../../core/footer/footer.component";

// Definición de la interfaz FormSignUp para el formulario de registro
interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  name: FormControl<string | null>;
  phone: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, GoogleComponent, FooterComponent],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required]),
    name: this._formBuilder.control('', [Validators.required]),
    phone: this._formBuilder.control('', [Validators.pattern(/^\d+$/)]),
  });

  isRequired(field: 'email' | 'password' | 'name' | 'phone'): boolean {
    const control = this.form.get(field);
    return control ? control.hasError('required') && control.touched : false;
  }

  isEmailError(): boolean {
    const control = this.form.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  async submit() {
    if (this.form.invalid) return;

    try {
      const { email, password, name, phone } = this.form.value;
      await this._authService.signUp({
        email: email || '',
        password: password || '',
        name: name || undefined,
        phone: phone || undefined
      });
      toast.success('Usuario creado correctamente');
    } catch (error) {
      toast.error('Error al crear el usuario');
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Inicio de sesión exitoso con Google');
    } catch (error) {
      toast.error('Error al iniciar sesión con Google');
    }
  }
}
