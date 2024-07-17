import { TestBed } from '@angular/core/testing';

import { StudiesService } from './studies.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StudiesService', () => {
  let service: StudiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(StudiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
