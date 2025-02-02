import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shortlisted_instructor } from '../models/shortlisted_instrtuctor.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  private http = inject(HttpClient);

  private apiurl = 'http://localhost:3002/applicantDetails'; // API URL for applicants
  private shortlistedUrl = 'http://localhost:3002/instructorDetails'; // API URL for shortlisted instructors
  private courseApiUrl = 'http://localhost:3000/courses'; // Replace with your actual API endpoint for courses

  // Post applicant in database
  submitInstructorData(formData: any): Observable<any> {
    return this.http.post(this.apiurl, formData);
  }

  // Get applicants from the database
  getInstructor(): Observable<any[]> {
    return this.http.get<any[]>(this.shortlistedUrl);  // Make sure shortlistedUrl is correctly defined
  }


  // Delete the instructor
  deleteInstructor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }

  // Get shortlisted instructors to check for duplicates
  getShortlistedInstructors(): Observable<any[]> {
    return this.http.get<any[]>(this.shortlistedUrl);
  }

  // Add to Shortlisted
  addToShortlisted(instructor: any): Observable<any> {
    return this.http.post<any>(this.shortlistedUrl, instructor);
  }

  // Delete the shortlisted instructor
  deleteShortlistedInstructor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.shortlistedUrl}/${id}`);
  }

  // Update Instructor Status (New Method)
  updateInstructorStatus(id: number, status: string): Observable<any> {
    const url = `${this.shortlistedUrl}/${id}`;
    return this.http.patch(url, { status }); // Update only the status field
  }

  getInstructorById(id: string): Observable<any> {
    return this.http.get<any>(`${this.shortlistedUrl}/${id}`);
  }

  updateInstructor(id: string, instructorData: any): Observable<any> {
    return this.http.put<any>(`${this.shortlistedUrl}/${id}`, instructorData);
  }

  // Get Course Data (Method to Fetch Course Information)
  getCourseData(): Observable<any> {
    return this.http.get<any>(this.courseApiUrl);
  }
}
