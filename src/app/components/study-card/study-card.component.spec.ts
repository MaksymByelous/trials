import { Hit } from '../../models/study';
import { StudyCardComponent } from './study-card.component';
import {
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('StudyCardComponent', () => {
  let component: StudyCardComponent;
  let fixture: ComponentFixture<StudyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [StudyCardComponent],
    }).compileComponents();

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
});
