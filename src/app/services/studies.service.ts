import { Hit, SearchResult } from '../interfaces/study.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  private searchApiUrl = 'https://clinicaltrials.gov/api/int/studies';

  constructor(private httpClient: HttpClient) {}

  searchStudies(query: { [key: string]: string } = {}): Observable<Hit[]> {
    const params = new HttpParams({ fromObject: query });

    return this.httpClient
      .get<SearchResult>(this.searchApiUrl, { params })
      .pipe(
        map((searchResponse: SearchResult) => {
          return searchResponse.hits;
        })
      );
  }
}
