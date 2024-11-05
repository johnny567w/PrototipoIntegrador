import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, authState, User as FirebaseUser } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc, docData } from '@angular/fire/firestore';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserCredential } from '@angular/fire/auth';

export interface User {
  email: string;
  password?: string;
  name?: string;
  phone?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);

  // Subject para emitir la ruta de redirección según el rol
  private _redirectUrl = new Subject<string>();
  redirectUrl$ = this._redirectUrl.asObservable();

  signUp(user: User) {
    return createUserWithEmailAndPassword(this._auth, user.email, user.password!).then(async (userCredential) => {
      const userDocRef = doc(this._firestore, `users/${userCredential.user.uid}`);
      await setDoc(userDocRef, {
        email: user.email,
        name: user.name || '',
        phone: user.phone || '',
        role: 'user',
        createdAt: new Date()
      });
    });
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this._auth, user.email, user.password!).then(async (userCredential) => {
      const userDocRef = doc(this._firestore, `users/${userCredential.user.uid}`);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data() as User;
        const redirectTo = userData.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
        this._redirectUrl.next(redirectTo); // Emitir la ruta para el guard
      }
    });
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential: UserCredential = await signInWithPopup(this._auth, provider);
    const userDocRef = doc(this._firestore, `users/${userCredential.user.uid}`);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        name: userCredential.user.displayName || '',
        role: 'user',  // Rol predeterminado
        createdAt: new Date()
      });
    }

    const userData = (await getDoc(userDocRef)).data() as User;
    const redirectTo = userData.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
    this._redirectUrl.next(redirectTo);
  }

  getUserProfile(): Observable<User | null> {
    return authState(this._auth).pipe(
      switchMap((user: FirebaseUser | null) => {
        if (user && user.uid) {
          const userDocRef = doc(this._firestore, `users/${user.uid}`);
          return docData(userDocRef) as Observable<User>;
        } else {
          return of(null);
        }
      })
    );
  }
}
