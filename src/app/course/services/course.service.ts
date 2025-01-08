import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses'; // JSON-server API endpoint

  constructor(private http: HttpClient) {}

  // Get all courses
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single course by ID
  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new course
  createCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, course);
  }

  // Update an existing course
  updateCourse(course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${course.id}`, course);
  }

  // Delete a course
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
