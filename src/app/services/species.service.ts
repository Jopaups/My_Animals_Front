import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Species } from '../models/species.model';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  private apiUrl = 'http://localhost:8080/species';

  constructor(private http: HttpClient) {}

  getAllSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(this.apiUrl);
  }

  addSpecies(species: { name: string }): Observable<Species> {
    return this.http.post<Species>(this.apiUrl, species);
  }
}
