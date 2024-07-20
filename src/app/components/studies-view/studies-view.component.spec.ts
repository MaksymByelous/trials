import {
  ComponentFixture,
  discardPeriodicTasks,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { Hit } from '../../models/study';
import { StudiesViewComponent } from './studies-view.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StudiesViewComponent', () => {
  let component: StudiesViewComponent;
  let fixture: ComponentFixture<StudiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [StudiesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudiesViewComponent);
    component = fixture.componentInstance;
    component.studies = [
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
    ] as Hit[];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('checkStudiesToUpdate should update studies', () => {
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
    expect(component.studies[0]).toEqual(newStudy);
  });

  it('should do call for studies on init', () => {
    const spy = spyOn(
      component['studyService'],
      'searchStudies'
    ).and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should do call for single study on interval every 5000ms', fakeAsync(() => {
    const spy = spyOn(
      component['studyService'],
      'searchStudies'
    ).and.callThrough();
    component.ngOnInit();
    tick(5000);
    expect(spy).toHaveBeenCalledTimes(2);
    tick(5000);
    expect(spy).toHaveBeenCalledTimes(3);
    discardPeriodicTasks();
  }));
});
