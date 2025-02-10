import { Injectable } from '@angular/core';
import { ProjectAction } from './project-actions';
import { ProjectService } from './projects.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, merge, mergeMap, of, tap } from 'rxjs';
import { Project } from '../../models/project';

@Injectable()
export class ProjectUploadEffect {
  constructor(
    private projectAction: Actions,
    private projectService: ProjectService
  ) {}

  project$ = createEffect(() => {
    return this.projectAction.pipe(
      ofType('[Projects] Upload Project'),
      mergeMap((project: Project) =>
        this.projectService.addProject(project).pipe(
          map((project) =>
            ProjectAction.uploadProjectSuccess({
              _id: project.id,
              title: project.title,
              description: project.description,
              tags: project.tags,
              demoUrl: project.demoUrl,
              repoUrl: project.repoUrl,
              image: project.imageUrl,
              userId: project.userId,
            })
          ),
          catchError((error) => {
            const errorTimeout$ = of(
              ProjectAction.uploadProjectError({ error: null })
            ).pipe(delay(2000));
            const postError$ = of(
              ProjectAction.uploadProjectError({ error: error.code })
            );
            return merge(postError$, errorTimeout$);
          })
        )
      )
    );
  });
}
