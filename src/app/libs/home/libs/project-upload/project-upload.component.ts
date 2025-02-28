import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, filter, Subject, switchMap } from 'rxjs';
import { ScreenshotOneService } from '../../../../services/screenshotOne/screenshot-one.service';
import { ImageUrlService } from '../../../../services/imageUrl/image-url.service';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../../models/appState.interface';
import { ProjectAction } from '../../../../store/projects/project-actions';
import { registerUserSelector } from '../../../../store/auth/authSelectors';

@Component({
  selector: 'app-project-upload',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-upload.component.html',
  styleUrl: './project-upload.component.css',
})
export class ProjectUploadComponent implements OnInit {
  projectForm: FormGroup;
  projectLinks: FormGroup;
  screenshot?: string;
  imageBlob?: Blob;
  demoUrlWatcher: Subject<string>;
  page: 'form' | 'links' | 'preview' = 'form';
  loading = false;
  userId?: string | null;

  constructor(
    private fb: FormBuilder,
    private scrot: ScreenshotOneService,
    private imageUrl: ImageUrlService,
    private store: Store<AppStateInterface>
  ) {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.projectForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      addTag: ['', [Validators.minLength(3)]],
      tags: this.fb.array([]),
    });
    this.projectLinks = fb.group({
      demoUrl: ['', [Validators.required, Validators.pattern(reg)]],
      repoUrl: ['', [Validators.required, Validators.pattern(reg)]],
    });

    this.demoUrlWatcher = new Subject<string>();
    this.store
      .select(registerUserSelector)
      .subscribe((user) => (this.userId = user.id));
  }

  ngOnInit(): void {
    this.demoUrlWatcher.pipe(debounceTime(3000)).subscribe((weburl: string) => {
      this.grab(weburl);
      this.loading = true;
    });
  }

  grab(url: string) {
    this.scrot
      .getScreenshot(url)
      .pipe(switchMap((blob) => this.imageUrl.getUrl(blob)))
      .subscribe({
        next: (imageUrl) => {
          this.screenshot = imageUrl;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.projectLinks
            .get('demoUrl')
            ?.setErrors({ invalid: true, pattern: true });
        },
      });
  }

  get tags() {
    return this.projectForm.get('tags') as FormArray;
  }

  addTag(event: any) {
    this.tags.push(this.fb.control(event.target.value));
    this.projectForm.get('addTag')?.reset();
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  changePage(newPage: 'form' | 'links' | 'preview') {
    this.page = newPage;
  }

  onSubmit() {
    if (this.projectForm.valid && this.projectLinks.valid) {
      // const imageUrl = await this.imageUrl.getUrl(this.imageBlob);
      if (this.userId && this.screenshot) {
        this.store.dispatch(
          ProjectAction.uploadProject({
            title: this.projectForm.value.title,
            description: this.projectForm.value.description,
            tags: this.projectForm.value.tags,
            demoUrl: this.projectLinks.value.demoUrl,
            repoUrl: this.projectLinks.value.repoUrl,
            image: this.screenshot,
            userId: this.userId,
          })
        );
        this.projectForm.reset();
        this.projectLinks.reset();
        this.tags.clear();
        this.changePage('form');
      } else {
        throw new Error('invalid user id');
      }
    }
  }

  ondemoUrlInputChange() {
    const demoUrl = this.projectLinks.get('demoUrl');
    if (demoUrl?.valid) {
      this.demoUrlWatcher.next(demoUrl?.value);
    }
  }
}
