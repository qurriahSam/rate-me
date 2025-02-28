import { Injectable, OnDestroy } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Project } from '../../models/project';
import {
  catchError,
  from,
  map,
  mergeMap,
  of,
  retry,
  switchMap,
  tap,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';
import { registerUserSelector } from '../auth/authSelectors';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private firestore: Firestore) {}

  addProject(project: Project) {
    return from(addDoc(collection(this.firestore, 'projects'), project)).pipe(
      retry(3),
      switchMap((docRef) =>
        from(getDoc(doc(this.firestore, 'projects', docRef.id))).pipe(
          retry(3),
          map((savedDoc) => {
            if (!savedDoc.exists()) {
              throw new Error('Document not found!');
            }
            return { _id: docRef.id, ...savedDoc.data() } as Project;
          })
        )
      ),
      catchError((error) => {
        console.error('Error adding project:', error);
        throw error;
      })
    );
  }

  getAllProjects() {
    return from(getDocs(collection(this.firestore, 'projects'))).pipe(
      tap(console.log)
    );
  }
  getUserProjects(userId: string) {
    const queryMyProjects = query(
      collection(this.firestore, 'projects'),
      where('userId', '==', userId)
    );
    return from(getDocs(queryMyProjects));
  }

  getProjectById(id: string) {
    return from(getDoc(doc(this.firestore, 'projects', id))).pipe(
      map((doc) => {
        if (!doc.exists()) {
          throw new Error('Document not found!');
        }
        return { _id: id, ...doc.data() } as Project;
      }),
      catchError((error) => {
        console.error('Error fetching project:', error);
        throw error;
      })
    );
  }
}
