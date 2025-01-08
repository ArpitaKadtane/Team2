import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private http = inject(HttpClient)

  private apiurl = 'http://localhost:3000/instructors';

  //post applicant in database
  submitInstructorData(formData:any):Observable<any>{
    return this.http.post(this.apiurl, formData);
  }
  
  //get applicants form the database
  getInstructor():Observable<any[]>{
    return this.http.get<any[]>(this.apiurl)
  }

  // delete the instructor
  deleteInstructor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }

  addToShortlisted(instructor: any): Observable<any> {
    const url = 'http://localhost:3000/shorlistedInstructors'; 
    return this.http.post<any>(url, instructor);
  }
}
