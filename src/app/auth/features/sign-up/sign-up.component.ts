import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasEmailError } from '../../utils/validators';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/data-acces/auth.service';
import { toast } from 'ngx-sonner';
import { RouterLink } from '@angular/router';
import { GoogleComponent } from '../../Ui/google/google.component';

interface FormSignUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  name: FormControl<string | null>;
  phone: FormControl<string | null>;
}



@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, GoogleComponent],
  templateUrl: './sign-up.component.html',
})
export default class SignUpComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);

  form = this._formBuilder.group<FormSignUp>({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required]),
    name: this._formBuilder.control('', [Validators.required]),
    phone: this._formBuilder.control('', [Validators.pattern(/^\d+$/)]), // Validación de solo números
  });

  isRequired(field: 'email' | 'password' | 'name'): boolean {
    const control = this.form.get(field);
    return control ? control.hasError('required') && control.touched : false;
  }

  isEmailError() {
    return this.form.get('email')?.hasError('email') && this.form.get('email')?.touched;
  }

  async submit() {
    if (this.form.invalid) return;
  
    try {
      const { email, password, name, phone } = this.form.value;
      if (!email || !password || !name) return;
  
      // Convertir los valores a string o undefined para evitar el error
      await this._authService.signUp({
        email,
        password,
        name: name || undefined,
        phone: phone || undefined,
      });
  
      toast.success('Usuario creado correctamente');
    } catch (error) {
      toast.error('Error, intente nuevamente');
    }
  }
  

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Inicio de sesión exitoso con Google');
    } catch (error) {
      toast.error('Ocurrió un error al iniciar sesión con Google');
    }
  }
}