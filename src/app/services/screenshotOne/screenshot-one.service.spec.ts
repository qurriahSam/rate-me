import { TestBed } from '@angular/core/testing';

import { ScreenshotOneService } from './screenshot-one.service';

describe('ScreenshotOneService', () => {
  let service: ScreenshotOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenshotOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
