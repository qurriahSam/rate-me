import { Injectable, OnDestroy } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Project } from '../../models/project';
import { from } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../models/appState.interface';
import { registerUserSelector } from '../auth/authSelectors';


@Injectable({
  providedIn: 'root',
})
export class ProjectUploadService implements OnDestroy {
  userId;

  constructor(
    private firestore: Firestore,
    private store: Store<AppStateInterface>
  ) {
    this.userId = store
      .pipe(select(registerUserSelector))
      .subscribe((user) => user.id);
  }

  ngOnDestroy(): void {
    this.userId.unsubscribe()
  }

  addProject(project: Project) {
    return from(addDoc(collection(this.firestore, 'projects'), {
      ...project,
      userId: this.userId,
    }))
  }
}
