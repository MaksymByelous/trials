import { Hit, HitIds } from '../../models/study';
import { FavouritesService } from '../../services/favourites.service';
import { StudyCardComponent } from './study-card.component';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('StudyCardComponent', () => {
  let component: StudyCardComponent;
  let fixture: ComponentFixture<StudyCardComponent>;
  let favouritesService: FavouritesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyCardComponent],
    }).compileComponents();

    favouritesService = TestBed.inject(FavouritesService);
    fixture = TestBed.createComponent(StudyCardComponent);
    component = fixture.componentInstance;

    const study = signal({
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
    } as Hit);
    fixture.componentInstance.study =
      study as unknown as typeof fixture.componentInstance.study;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get favourites ids and mark study as favourite', () => {
    const mockFavourites = ['NCT06506786'] as HitIds;

    favouritesService['favoriteStudies'].set(mockFavourites);
    component.ngOnInit();
    fixture.detectChanges();

    favouritesService.favourites$.subscribe((favs) => {
      expect(favs.length).toBe(1);
      expect(component.isFavourite()).toBe(true);
    });
  });
});
