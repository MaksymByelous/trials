import { Hit, SearchResult } from '../models/study';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface StudyQuery {
  [key: string]: string;
}

const defaultQuery = {
  fields:
    'OverallStatus,HasResults,BriefTitle,Condition,InterventionType,InterventionName,LocationFacility,LocationCity,LocationState,LocationCountry,LocationStatus,LocationZip,LocationGeoPoint,LocationContactName,LocationContactRole,LocationContactPhone,LocationContactPhoneExt,LocationContactEMail,CentralContactName,CentralContactRole,CentralContactPhone,CentralContactPhoneExt,CentralContactEMail,Gender,MinimumAge,MaximumAge,StdAge,NCTId,StudyType,LeadSponsorName,Acronym,EnrollmentCount,StartDate,PrimaryCompletionDate,CompletionDate,StudyFirstPostDate,ResultsFirstPostDate,LastUpdatePostDate,OrgStudyId,SecondaryId,Phase,LargeDocLabel,LargeDocFilename,PrimaryOutcomeMeasure,SecondaryOutcomeMeasure,DesignAllocation,DesignInterventionModel,DesignMasking,DesignWhoMasked,DesignPrimaryPurpose,DesignObservationalModel,DesignTimePerspective,LeadSponsorClass,CollaboratorClass',
};

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  private searchApiUrl = 'https://clinicaltrials.gov/api/int/studies?';

  constructor(private httpClient: HttpClient) {}

  searchStudies(query: StudyQuery = {}): Observable<Hit[]> {
    const params = new HttpParams({
      fromObject: { ...defaultQuery, ...query },
    });

    return this.httpClient
      .get<SearchResult>(this.searchApiUrl, { params })
      .pipe(
        map((searchResponse: SearchResult) => {
          return searchResponse.hits;
        })
      );
  }
}
