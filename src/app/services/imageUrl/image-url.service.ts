import { Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageUrlService {
  constructor(private cloudStorage: Storage) {}

  async getUrl(image: Blob) {
    const randomId = Math.random().toString(36).substring(2);
    const imageRef = ref(this.cloudStorage, `projectImages/${randomId}`);
    try {
      await uploadBytes(imageRef, image);
      const fetchUrl = await getDownloadURL(imageRef);
      console.log('File uploaded successfully:', fetchUrl);
      return fetchUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return error;
    }
  }
}
