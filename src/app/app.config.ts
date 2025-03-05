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
import {
  provideStorage,
  getStorage,
  connectStorageEmulator,
} from '@angular/fire/storage';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { authReducer } from './store/auth/auth-reducer';
import { RegisterEffect } from './store/auth/register-effect';
import { LoginEffect } from './store/auth/login-effect';
import { LogoutEffect } from './store/auth/logout-effect';
import { ProjectUploadEffect } from './store/projects/project-upload-effect';
import { projectsReducer } from './store/projects/projects-reducer';
import { GetAllProjectsEffect } from './store/projects/get-all-projects-effect';
import { viewProjectReducer } from './store/view-project/view-project-reducer';
import { GetProjectEffect } from './store/view-project/get-project-effect';
import { UpdateProjectEffect } from './store/view-project/update-project-effect';

const localIP = import.meta.env['NG_APP_LOCAL_IP'];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => {
      const auth = getAuth();
      if (environment.useEmulators) {
        connectAuthEmulator(auth, `http://${localIP}:9099`);
      }
      return auth;
    }),
    provideFirestore(() => {
      const firestore = getFirestore();
      if (!environment.production) {
        connectFirestoreEmulator(firestore, `${localIP}`, 8080);
      }
      return firestore;
    }),
    provideDatabase(() => {
      const db = getDatabase();
      if (!environment.production) {
        connectDatabaseEmulator(db, `${localIP}`, 9000);
      }
      return db;
    }),
    provideStorage(() => {
      const cloudStorage = getStorage();
      if (!environment.production) {
        connectStorageEmulator(cloudStorage, `${localIP}`, 9199);
      }
      return cloudStorage;
    }),
    provideStore({
      auth: authReducer,
      projects: projectsReducer,
      viewProject: viewProjectReducer,
    }),
    provideEffects([
      RegisterEffect,
      LoginEffect,
      LogoutEffect,
      ProjectUploadEffect,
      GetAllProjectsEffect,
      GetProjectEffect,
      UpdateProjectEffect,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
