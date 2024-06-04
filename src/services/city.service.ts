import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface City {
  city: string;
  country: string;
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private citiesRoot = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]> (this.citiesRoot);
  }
}
