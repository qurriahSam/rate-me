import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth, connectAuthEmulator } from '@angular/fire/auth';
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  getDatabase,
  provideDatabase,
  connectDatabaseEmulator,
} from '@angular/fire/database';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { registerReducer } from './store/auth/register-reducer';
import { RegisterEffect } from './store/auth/register-effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'chat-grp-ai',
        appId: '1:314830117811:web:2ac858810710fe91e4c9c6',
        storageBucket: 'chat-grp-ai.appspot.com',
        apiKey: 'AIzaSyAaQOFXT2y8f4_5Jb8TcE1S2ni-LH-DuMQ',
        authDomain: 'chat-grp-ai.firebaseapp.com',
        messagingSenderId: '314830117811',
        measurementId: 'G-GZDZ6JL4V7',
      })
    ),
    provideAuth(() => {
      const auth = getAuth();
      if (!environment.production) {
        connectAuthEmulator(auth, 'http://127.0.0.1:9099');
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (!environment.production) {
        connectFirestoreEmulator(firestore, 'localhost', 8080);
      }
      return firestore;
    }),
    provideDatabase(() => {
      const db = getDatabase();
      if (!environment.production) {
        connectDatabaseEmulator(db, '127.0.0.1', 9000);
      }
      return db;
    }),
    provideStore({ register: registerReducer }),
    provideEffects([RegisterEffect]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
