import { Injectable } from '@angular/core';
import { ProjectAction } from './project-actions';
import { ProjectService } from './projects.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, merge, mergeMap, of, tap } from 'rxjs';
import { Project } from '../../models/project';
import { QuerySnapshot } from '@angular/fire/firestore';

@Injectable()
export class GetUserProjectsEffect {
  constructor(
    private projectAction: Actions,
    private projectService: ProjectService
  ) {}

  project$ = createEffect(() => {
    return this.projectAction.pipe(
      ofType('[Projects] Get User Projects'),
      mergeMap(({ userId }) =>
        this.projectService.getUserProjects(userId).pipe(
          tap(console.log),
          map((projectSnapshot: QuerySnapshot) => {
            const projectArr = projectSnapshot.docs.map((doc) => doc.data());
            const projectIds = projectSnapshot.docs.map((doc) => doc.id);
            //console.log({ projectArr: projectArr, ids: projectIds });
            let projectsWithIds = [];
            for (let index = 0; index < projectArr.length; index++) {
              projectsWithIds.push({
                ...projectArr[index],
                _id: projectIds[index],
              });
            }
            console.log(projectsWithIds);
            return ProjectAction.getUserProjectsSuccess({
              projects: projectsWithIds as Project[],
            });
          }),
          catchError((error) => {
            const errorTimeout$ = of(
              ProjectAction.projectError({ error: null })
            ).pipe(delay(2000));
            const postError$ = of(
              ProjectAction.projectError({ error: error.code })
            );
            return merge(postError$, errorTimeout$);
          })
        )
      )
    );
  });
}
