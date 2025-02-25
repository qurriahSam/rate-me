import { Injectable } from '@angular/core';
//import * as fs from 'fs';
import { from, map, tap } from 'rxjs';
import * as screenshotone from 'screenshotone-api-sdk';

@Injectable({
  providedIn: 'root',
})
export class ScreenshotOneService {
  private client = new screenshotone.Client(
    import.meta.env['NG_APP_SCREENSHOTONE_ACCESS_KEY'],
    import.meta.env['NG_APP_SCREENSHOTONE_SECRET_KEY']
  );
  constructor() {}

  getScreenshot(siteUrl: string) {
    const options = screenshotone.TakeOptions.url(siteUrl)
      .delay(3)
      .blockAds(true);
    return from(this.client.take(options));
  }
}
