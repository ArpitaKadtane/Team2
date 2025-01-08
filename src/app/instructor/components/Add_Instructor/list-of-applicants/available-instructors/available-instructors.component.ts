import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-instructors',
  templateUrl: './available-instructors.component.html',
  styleUrls: ['./available-instructors.component.css'],
})
export class AvailableInstructorsComponent implements OnInit {
  instructors: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchInstructors();
  }

  fetchInstructors() {
    this.http.get('http://localhost:3000/shorlistedInstructors').subscribe({
      next: (data: any) => {
        this.instructors = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching instructors:', err);
        this.loading = false;
      },
    });
  }

  addInstructor() {
    const newInstructor = {
      id: 'new-id',
      fullName: 'New Instructor',
      contactNumber: '1234567890',
      email: 'new.instructor@example.com',
      experience: 2,
      teachingDomain: 'Science',
      specialization: 'Physics',
      degree: 'BSc Physics',
      certifications: 'Teaching Certificate',
      daysAvailable: '30',
      hoursAvailable: '40',
      resume: 'C:\\fakepath\\new_instructor_resume.pdf',
    };

    this.instructors.push(newInstructor);
  }
}
