import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'prototipo-integrador',
        appId: '1:631018112606:web:22f8bb226bce80d54e16cf',
        storageBucket: 'prototipo-integrador.firebasestorage.app',
        apiKey: 'AIzaSyBKPtGxvKzo2O1xHd9RfeQTL9ypPiLXUPo',
        authDomain: 'prototipo-integrador.firebaseapp.com',
        messagingSenderId: '631018112606',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
