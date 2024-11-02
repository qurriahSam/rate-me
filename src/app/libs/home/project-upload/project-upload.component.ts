import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-project-upload',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-upload.component.html',
  styleUrl: './project-upload.component.css',
})
export class ProjectUploadComponent {
  projectForm: FormGroup;
  constructor(private fb: FormBuilder) {
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.projectForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      demoUrl: ['', [Validators.required, Validators.pattern(reg)]],
      repoUrl: ['', [Validators.required, Validators.pattern(reg)]],
      addTag: '',
      tags: this.fb.array([]),
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

  onSubmit() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
    }
  }
}
