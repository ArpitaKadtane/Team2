import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
@Component({
  selector: 'candidate-my-courses',
  templateUrl: './candidate-my-courses.component.html',
  styleUrls: ['./candidate-my-courses.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CandidateMyCoursesComponent implements OnInit {
  enrolledCourses: any[] = [];
  errorMessage: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.fetchEnrolledCourses();
  }

  fetchEnrolledCourses(): void {
    const candidateId = 'AnonymousUser'; // Simulate a static candidate ID
    this.courseService.getEnrolledCourses(candidateId).subscribe(
      (data) => {
        this.enrolledCourses = data;
      },
      () => {
        this.errorMessage = 'Failed to load enrolled courses. Please try again later.';
      }
    );
  }
}
