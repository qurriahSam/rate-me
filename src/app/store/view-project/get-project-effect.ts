import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, merge, mergeMap, of } from 'rxjs';
import { viewProjectAction } from './view-project-actions';
import { ProjectService } from '../projects/projects.service';

@Injectable()
export class GetProjectEffect {
  constructor(
    private viewProjectActions: Actions,
    private projectService: ProjectService
  ) {}

  viewProject$ = createEffect(() => {
    return this.viewProjectActions.pipe(
      ofType(viewProjectAction.getProject),
      mergeMap(({ id }) =>
        this.projectService.getProjectById(id).pipe(
          map((project) => viewProjectAction.getProjectSuccess({ project })),
          catchError((error) => {
            const errorTimeout$ = of(
              viewProjectAction.getProjectError({ error: null })
            ).pipe(delay(2000));
            const postError$ = of(
              viewProjectAction.getProjectError({ error: error.code })
            );
            return merge(postError$, errorTimeout$);
          })
        )
      )
    );
  });
}
