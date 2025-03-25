import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from './projects.service';
import { catchError, delay, map, merge, mergeMap, of, tap } from 'rxjs';
import { ProjectAction } from './project-actions';

@Injectable()
export class DeleteProjectEffect {
  constructor(
    private projectActions: Actions,
    private projectService: ProjectService
  ) {}

  deleteProject$ = createEffect(() => {
    return this.projectActions.pipe(
      ofType(ProjectAction.deleteProject),
      mergeMap(({ project }) =>
        this.projectService.deleteProject(project).pipe(
          tap(() => console.log('Project deleted')),
          map(() => ProjectAction.deleteProjectSuccess({ project })),
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
