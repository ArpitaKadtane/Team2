import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private apiUrl = 'http://localhost:3000/candidates'; // JSON server API URL

  constructor(private httpClient: HttpClient) {}

  // Register a new candidate
  registerCandidate(candidate: Candidate): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl, candidate);
  }
  changePassword(email: string, currentPassword: string, newPassword: string): Observable<void> {
    return this.httpClient.get<Candidate[]>(`${this.apiUrl}?email=${email}`).pipe(
      switchMap((candidates: Candidate[]) => {
        if (candidates.length === 0) {
          throw new Error('Candidate not found');
        }
        const candidate = candidates[0];
        if (candidate.password !== currentPassword) {
          throw new Error('Current password is incorrect');
        }
        candidate.password = newPassword;
        return this.httpClient.put<void>(`${this.apiUrl}/${candidate.id}`, candidate);
      })
    );
  }
  // Change candidate password

  // Login candidate
  loginCandidate(email: string, password: string): Observable<Candidate[]> {
    const url = `${this.apiUrl}?email=${email}&password=${password}`;
    localStorage.setItem('candidateEmail', email);

    return this.httpClient.get<Candidate[]>(url); // Returns an array of matching candidates
  }

  // Get candidate by email
  getCandidateByEmail(email: string): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(`${this.apiUrl}?email=${email}`);
  }

  // Update candidate profile
  updateCandidate(candidate: Candidate): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${candidate.id}`, candidate);
  }
}
