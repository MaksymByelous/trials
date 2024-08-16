import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StudiesService } from './studies.service';
import { provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

const defaultQuery = {
  fields:
    'OverallStatus,HasResults,BriefTitle,Condition,InterventionType,InterventionName,LocationFacility,LocationCity,LocationState,LocationCountry,LocationStatus,LocationZip,LocationGeoPoint,LocationContactName,LocationContactRole,LocationContactPhone,LocationContactPhoneExt,LocationContactEMail,CentralContactName,CentralContactRole,CentralContactPhone,CentralContactPhoneExt,CentralContactEMail,Gender,MinimumAge,MaximumAge,StdAge,NCTId,StudyType,LeadSponsorName,Acronym,EnrollmentCount,StartDate,PrimaryCompletionDate,CompletionDate,StudyFirstPostDate,ResultsFirstPostDate,LastUpdatePostDate,OrgStudyId,SecondaryId,Phase,LargeDocLabel,LargeDocFilename,PrimaryOutcomeMeasure,SecondaryOutcomeMeasure,DesignAllocation,DesignInterventionModel,DesignMasking,DesignWhoMasked,DesignPrimaryPurpose,DesignObservationalModel,DesignTimePerspective,LeadSponsorClass,CollaboratorClass',
};

describe('StudiesService', () => {
  let service: StudiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StudiesService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideExperimentalZonelessChangeDetection(),
      ],
    });
    service = TestBed.inject(StudiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('searchStudies should call api with custom limit query param', () => {
    const customLimit = '5';
    service.searchStudies({ ...defaultQuery, limit: customLimit }).subscribe();

    const req = httpMock.expectOne((request) => {
      return (
        request.url === service['searchApiUrl'] &&
        request.params.get('limit') === customLimit &&
        request.params.get('fields') === defaultQuery.fields
      );
    });
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe(customLimit);
  });
});
