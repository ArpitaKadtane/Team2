import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { Router } from '@angular/router';


@Component({
  selector: 'app-track-my-learning',
  templateUrl: './track-my-learning.component.html',
  styleUrls: ['./track-my-learning.component.css'],
  standalone:true,
  imports: [CommonModule] 

})
export class TrackMyLearningComponent implements OnInit {
  private apiUrl = 'http://localhost:3000/courses';
  totalEnrolledCourses: number;
  completedCourses: number ;
  hoursSpent: number;
  overallPerformance: number;
  candidateEmail: string | null = '';
  courses: any[] = [];
  filteredCourses: any[] = [];

  constructor(private http: HttpClient,private router:Router ) {}

  ngOnInit(): void {
    this.candidateEmail = localStorage.getItem('candidateEmail');
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.filteredCourses = data.filter((course) =>
          course.enrolledCandidates.includes(this.candidateEmail),
        );
        console.log('Filtered Courses:', this.filteredCourses);
  
        this.totalEnrolledCourses = this.filteredCourses.length;
        
        // Calculate completed courses
        this.completedCourses = this.filteredCourses.filter(course =>
          this.getProgress(course) === 100
        ).length;
  
        this.overallPerformance = this.totalEnrolledCourses > 0 
          ? Math.round((this.completedCourses / this.totalEnrolledCourses) * 100) 
          : 0;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  


  
  navigateCourse(courseid:any){
    this.router.navigate([`candidate/course-view/${courseid}`])
  }

  calculateDuration(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return `${daysDiff} Days`;
  }

  getProgress(course: any): number {
    if (!course.modules || course.modules.length === 0) return 0;
  
    const completedModules = course.modules.filter((module: any) => module.completed).length;
    const totalModules = course.modules.length;
  
    return Math.round((completedModules / totalModules) * 100);
  }
  
}
