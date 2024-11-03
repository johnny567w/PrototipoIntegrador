import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

// Definir la interfaz User en el servicio sin un modelo separado
export interface User {
  email: string;
  password: string;
  name?: string;   // Campo opcional para el nombre
  phone?: string;  // Campo opcional para el teléfono
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);

  // Método para registrar al usuario y guardar datos en Firestore
  signUp(user: User) {
    return createUserWithEmailAndPassword(this._auth, user.email, user.password).then(async (userCredential: UserCredential) => {
      // Crear un documento en la colección 'users' con el UID del usuario como ID
      const userDocRef = doc(this._firestore, `users/${userCredential.user.uid}`);
      await setDoc(userDocRef, {
        email: user.email,
        name: user.name || '',    // Se asegura de que 'name' y 'phone' no sean null
        phone: user.phone || '',
        createdAt: new Date()
      });
    });
  }

  // Método para iniciar sesión con email y contraseña
  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  // Método para iniciar sesión con Google
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithPopup(this._auth, provider);
  }
}
