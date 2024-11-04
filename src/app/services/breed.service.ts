import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breed } from '../models/breed.model';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  private apiUrl = 'http://localhost:8080/breeds';

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir les races par ID d'espèce
  getBreedsBySpeciesId(speciesId: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}/species/${speciesId}`); // Assure-toi que cette route retourne les races de l'espèce spécifiée
  }

  addBreed(breed: Breed): Observable<Breed> {
    return this.http.post<Breed>(this.apiUrl, breed);
  }
}
