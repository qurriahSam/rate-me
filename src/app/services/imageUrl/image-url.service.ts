import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { catchError, from, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUrlService {
  constructor(private cloudStorage: Storage) {}

  getUrl(image: Blob) {
    const randomId = Math.random().toString(36).substring(2);
    const imageRef = ref(this.cloudStorage, `projectImages/${randomId}`);
    return from(uploadBytes(imageRef, image)).pipe(
      switchMap(() => from(getDownloadURL(imageRef))),
      tap((fetchUrl) => console.log('File uploaded successfully:', fetchUrl)),
      catchError((error) => {
        console.error('Error uploading file:', error);
        throw error;
      })
    );
  }
}
