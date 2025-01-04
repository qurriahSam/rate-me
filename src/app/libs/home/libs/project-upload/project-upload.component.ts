import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, filter, Subject } from 'rxjs';
import { ScreenshotOneService } from '../../../../services/screenshotOne/screenshot-one.service';

@Component({
  selector: 'app-project-upload',
  standalone: true,
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

  constructor(private fb: FormBuilder, private scrot: ScreenshotOneService) {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.projectForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      addTag: '',
      tags: this.fb.array([]),
    });
    this.projectLinks = fb.group({
      demoUrl: ['', [Validators.required, Validators.pattern(reg)]],
      repoUrl: ['', [Validators.required, Validators.pattern(reg)]],
    });

    this.demoUrlWatcher = new Subject<string>();
  }

  ngOnInit(): void {
    this.demoUrlWatcher.pipe(debounceTime(3000)).subscribe((weburl: string) => {
      this.grab(weburl);
      this.loading = true;
    });
  }

  grab(url: string) {
    this.scrot.getScreenshot(url).subscribe({
      next: (blob) => {
        this.screenshot = URL.createObjectURL(blob);
        this.imageBlob = blob;
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
    console.log({
      form: this.projectForm.value,
      links: this.projectLinks.value,
      image: this.imageBlob,
    });
  }

  ondemoUrlInputChange() {
    const demoUrl = this.projectLinks.get('demoUrl');
    if (demoUrl?.valid) {
      this.demoUrlWatcher.next(demoUrl?.value);
    }
  }
}
