import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hit, HitIds } from '../../models/study';
import { FavouritesService } from '../../services/favourites.service';
import { StudiesService } from '../../services/studies.service';
import { FavouritesViewComponent } from './favourites-view.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';

describe('FavouritesViewComponent', () => {
  let component: FavouritesViewComponent;
  let fixture: ComponentFixture<FavouritesViewComponent>;
  let studyService: StudiesService;
  let favouritesService: FavouritesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection(),
      ],
      imports: [FavouritesViewComponent],
    }).compileComponents();

    studyService = TestBed.inject(StudiesService);
    favouritesService = TestBed.inject(FavouritesService);
    fixture = TestBed.createComponent(FavouritesViewComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get favourites ids for studies and get the study', () => {
    const mockFavourites = ['NCT06506786'] as HitIds;
    const mockStudies = [
      {
        id: 'NCT06506786',
        isNew: true,
        study: {
          protocolSection: {
            statusModule: {
              overallStatus: 'ACTIVE_NOT_RECRUITING',
              lastUpdatePostDateStruct: { date: new Date('2024-07-17') },
            },
            identificationModule: { briefTitle: 'Test Study' },
            conditionsModule: { conditions: ['Test Condition'] },
            contactsLocationsModule: {
              locations: [{ country: 'NL', city: 'Amsterdam' }],
            },
          },
        },
      },
    ] as Hit[];

    spyOn(studyService, 'searchStudies').and.returnValue(of(mockStudies));
    favouritesService['favouriteIds'].set(mockFavourites);

    component.ngOnInit();
    fixture.detectChanges();
    favouritesService.favourites$.subscribe((favs) => {
      expect(favs.length).toBe(1);
      studyService
        .searchStudies({ id: mockFavourites.toString() })
        .subscribe((studies) => {
          expect(studies).toEqual(mockStudies);
        });
    });
  });
});
