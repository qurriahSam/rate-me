import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
        projectId: 'chat-grp-ai',
        appId: '1:314830117811:web:2ac858810710fe91e4c9c6',
        storageBucket: 'chat-grp-ai.appspot.com',
        apiKey: 'AIzaSyAaQOFXT2y8f4_5Jb8TcE1S2ni-LH-DuMQ',
        authDomain: 'chat-grp-ai.firebaseapp.com',
        messagingSenderId: '314830117811',
        measurementId: 'G-GZDZ6JL4V7',
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
