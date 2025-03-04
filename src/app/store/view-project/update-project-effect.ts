import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../projects/projects.service';
import { viewProjectAction } from './view-project-actions';
import { catchError, delay, map, merge, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UpdateProjectEffect {
  constructor(
    private viewProjectActions: Actions,
    private projectService: ProjectService
  ) {}

  updateProject$ = createEffect(() => {
    return this.viewProjectActions.pipe(
      ofType(viewProjectAction.updateProject),
      mergeMap(({ project }) =>
        this.projectService.updateProject(project).pipe(
          map((project) => viewProjectAction.updateProjectSuccess({ project })),
          catchError((error) => {
            const errorTimeout$ = of(
              viewProjectAction.updateProjectError({ error: null })
            ).pipe(delay(2000));
            const postError$ = of(
              viewProjectAction.updateProjectError({ error: error.code })
            );
            return merge(postError$, errorTimeout$);
          })
        )
      )
    );
  });
}
