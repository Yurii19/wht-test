import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFilter } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  private API_KEY =
    'live_cnlTmK2t9iMi864zh29DVkXA8FoY3CIE0l2gDfEn5nXCvoYIL0ah7Sbon5FJAPW3';
  private BASE_URL = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) {}

  fetchCats(): Observable<any> {
    return this.http.get(
      this.BASE_URL + '/images/search?limit=10' + '&api_key=' + this.API_KEY
    );
  }
  fetchCatsWithFilter(payload: IFilter): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/images/search?limit=${payload.limit}&api_key= ${this.API_KEY}`
    );
  }

  fetchBreeds(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/breeds`);
  }
}
