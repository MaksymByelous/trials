import { TestBed } from '@angular/core/testing';

import { SnackbarService } from './snackbar.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
