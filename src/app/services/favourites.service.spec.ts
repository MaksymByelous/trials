import { TestBed } from '@angular/core/testing';

import { FavouritesService } from './favourites.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FavouritesService', () => {
  let service: FavouritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(FavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and remove favourites', () => {
    service['favouriteIds'].set([]);
    service.toggleFavourite('1');
    expect(service['favouriteIds']()).toEqual(['1']);
    service.toggleFavourite('1');
    expect(service['favouriteIds']()).toEqual([]);
  });

  it('should not add favourites if there is 10 item', () => {
    const mock10Items = Array.from({ length: 10 }, (_, i) => i.toString());
    service['favouriteIds'].set(mock10Items);
    service.toggleFavourite('11');
    expect(service['favouriteIds']()).toEqual(mock10Items);
  });
});
