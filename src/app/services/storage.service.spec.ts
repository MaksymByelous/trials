import { HitIds } from '../models/study';
import { StorageService } from './storage.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('StorageService', () => {
  let service: StorageService<HitIds>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get item correctly', () => {
    const key = 'testKey';
    const value = ['testData'] as HitIds;

    service.setItem(key, value);
    const retrievedValue = service.getItem(key);

    expect(retrievedValue).toEqual(value);
  });
});
