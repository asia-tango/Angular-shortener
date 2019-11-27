import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShorteningResponse } from './models/shortening-response.interface';

const BASE_URL = 'https://api.shrtco.de/v2';

@Injectable({
  providedIn: 'root'
})
export class ShortenerApiService {
  constructor(
    private http: HttpClient,
  ) {}

  shortenUrl(url: string): Observable<ShorteningResponse> {
    return this.http.get<ShorteningResponse>(`${BASE_URL}/shorten?url=${url}`);
  }
}
