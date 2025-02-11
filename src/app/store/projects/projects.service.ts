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
import { from, map, switchMap, tap } from 'rxjs';
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
      switchMap((docRef) =>
        from(getDoc(doc(this.firestore, 'projects', docRef.id))).pipe(
          map((savedDoc) => {
            if (savedDoc.exists()) {
              return { _id: docRef.id, ...savedDoc.data() };
            } else {
              throw new Error('Document not found!');
            }
          })
        )
      ),
      tap(console.log)
    );
  }

  getAllProjects() {
    return from(getDocs(collection(this.firestore, 'projects'))).pipe(
      tap(console.log)
    );
  }
  getMyProjects() {
    const queryMyProjects = query(
      collection(this.firestore, 'projects'),
      where('capital', '==', true)
    );
    return from(getDocs(queryMyProjects));
  }
}
