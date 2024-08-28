import { Hit } from '../../models/study';
import { StudiesStore } from '../../stores/studies.store';
import { StudiesViewComponent } from './studies-view.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('StudiesViewComponent', () => {
  let component: StudiesViewComponent;
  let fixture: ComponentFixture<StudiesViewComponent>;
  const mockStudyStore = {
    studies: jasmine.createSpy('studies').and.returnValue([
      {
        id: 'NCT06506786',
        study: {
          protocolSection: {
            statusModule: {
              lastUpdatePostDateStruct: { date: new Date('2024-07-17') },
            },
          },
        },
      },
      {
        id: 'NCT06506777',
        study: {
          protocolSection: {
            statusModule: {
              lastUpdatePostDateStruct: { date: new Date('2024-08-18') },
            },
          },
        },
      },
      {
        id: 'NCT06506888',
        study: {
          protocolSection: {
            statusModule: {
              lastUpdatePostDateStruct: { date: new Date('2024-08-19') },
            },
          },
        },
      },
    ]),
    loadStudies: jasmine.createSpy('loadStudies'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: StudiesStore, useValue: mockStudyStore },
      ],
      imports: [StudiesViewComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StudiesViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockStudyStore.loadStudies).toHaveBeenCalled();
  });

  it('getStudyIndex should return index by id', () => {
    expect(component['getStudyIndex']('NCT06506786')).toBe(0);
    expect(component['getStudyIndex']('NCT06506777')).toBe(1);
    expect(component['getStudyIndex']('NCT06506888')).toBe(2);
  });

  it('getOldestStudy should return oldest study', () => {
    expect(component['getOldestStudy']()).toEqual({
      id: 'NCT06506786',
      study: {
        protocolSection: {
          statusModule: {
            lastUpdatePostDateStruct: { date: new Date('2024-07-17') },
          },
        },
      },
    } as Hit);
  });

  xit('checkStudiesToUpdate should update studies', () => {
    const newStudy = {
      id: 'NCT06506999',
      study: {
        protocolSection: {
          statusModule: {
            lastUpdatePostDateStruct: { date: new Date('2024-08-20') },
          },
        },
      },
    } as Hit;
    component['checkStudiesToUpdate'](newStudy);
    expect(mockStudyStore.studies()[0]).toEqual(newStudy);
  });
});
