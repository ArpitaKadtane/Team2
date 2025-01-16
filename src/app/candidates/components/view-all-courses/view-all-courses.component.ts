import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../../course/services/course.service';
@Component({
  selector: 'app-view-all-courses',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-all-courses.component.html',
  styleUrl: './view-all-courses.component.css'
})
export class ViewAllCoursesComponent implements OnInit {
  courses: any[] = []; // All courses
  filteredCourses: any[] = []; // Filtered courses
  categories: string[] = ['Programming', 'Design', 'Business']; // Example categories
  selectedCategory: string = ''; // Selected category for filtering
  searchQuery: string = ''; // Search query for filtering courses
  difficultyFilters: string[] = []; // Difficulty filters (Beginner, Intermediate, Advanced)
  durationFilters: string[] = []; // Duration filters (5 hrs, 10 hrs, etc.)
  ratingFilters: string[] = []; // Rating filters (4.5 and above, etc.)
  router: any;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    // Fetch all courses when the component is initialized
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
      this.filteredCourses = data; // Initialize filteredCourses with all courses
    });
  }
   // Enroll the user in the course
   enroll(course: any) {
    // Get candidate information from localStorage
    const candidateEmail = localStorage.getItem('candidateEmail');
    const candidateName = localStorage.getItem('candidateName');

    if (candidateEmail && candidateName) {
      // Check if the candidate is already enrolled in this course
      if (!course.enrolledCandidates.includes(candidateEmail)) {
        // Add candidate to the enrolledCandidates array of the course
        course.enrolledCandidates.push(candidateEmail);

        // You can optionally update the course in the backend via your service
        this.courseService.updateCourse(course).subscribe((updatedCourse) => {
          // Optionally update the local course list
          const index = this.courses.findIndex(c => c.id === updatedCourse.id);
          if (index !== -1) {
            this.courses[index] = updatedCourse;
            this.filteredCourses = [...this.courses];
          }
        });

        // Redirect to a success page or show a success message
        alert(`You have successfully enrolled in the course: ${course.name}`);
        this.router.navigate(['/courses']);  // Optional navigation
      } else {
        alert('You are already enrolled in this course.');
      }
    } else {
      alert('Please log in to enroll in courses.');
    }
  }

  // Filter courses by category
  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  // Apply selected filters and search query
  applyFilters() {
    let filtered = this.courses;

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter((course) =>
        course.category.includes(this.selectedCategory)
      );
    }

    // Filter by difficulty
    if (this.difficultyFilters.length) {
      filtered = filtered.filter((course) =>
        this.difficultyFilters.includes(course.difficulty)
      );
    }

    // Filter by duration
    if (this.durationFilters.length) {
      filtered = filtered.filter((course) =>
        this.durationFilters.includes(course.duration)
      );
    }

    // Filter by rating
    if (this.ratingFilters.length) {
      filtered = filtered.filter((course) =>
        this.ratingFilters.includes(course.rating)
      );
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.filteredCourses = filtered; // Update filteredCourses after applying filters and search
  }

  // Handle difficulty filter checkbox toggle
  toggleDifficultyFilter(difficulty: string) {
    if (this.difficultyFilters.includes(difficulty)) {
      this.difficultyFilters = this.difficultyFilters.filter(
        (filter) => filter !== difficulty
      );
    } else {
      this.difficultyFilters.push(difficulty);
    }
    this.applyFilters();
  }

  // Handle duration filter checkbox toggle
  toggleDurationFilter(duration: string) {
    if (this.durationFilters.includes(duration)) {
      this.durationFilters = this.durationFilters.filter(
        (filter) => filter !== duration
      );
    } else {
      this.durationFilters.push(duration);
    }
    this.applyFilters();
  }

  // Handle rating filter checkbox toggle
  toggleRatingFilter(rating: string) {
    if (this.ratingFilters.includes(rating)) {
      this.ratingFilters = this.ratingFilters.filter(
        (filter) => filter !== rating
      );
    } else {
      this.ratingFilters.push(rating);
    }
    this.applyFilters();
  }

  // Search method to filter courses based on the search query
  search() {
    this.applyFilters();
  }
}