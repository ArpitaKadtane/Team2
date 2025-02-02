import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModelGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../course/services/course.service';
import { FooterComponent } from "../footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { InstructorService } from '../../../instructor/services/instructor.service';

@Component({
  selector: 'app-view-all-courses',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, FooterComponent],
  templateUrl: './view-all-courses.component.html',
  styleUrl: './view-all-courses.component.css'
})
export class ViewAllCoursesComponent implements OnInit {
  courses: any[] = [];
  filteredCourses: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  searchQuery: string = '';
  difficultyFilters: string[] = [];
  durationFilters: string[] = [];
  ratingFilters: string[] = [];
  userExist: boolean = false;
  bookmark: boolean = false;
instructor: any;

  constructor(private courseService: CourseService, private router: Router,private http: HttpClient) {}

  ngOnInit() {

    const candidateEmail = localStorage.getItem('candidateEmail');
    const coursesUrl = 'http://localhost:3001/courses';
    const feedbackUrl = 'http://localhost:3001/feedback';

    this.http.get<any[]>(coursesUrl).subscribe((courses) => {
      this.http.get<any[]>(feedbackUrl).subscribe((feedback) => {
        this.courses = courses.map(course => {
          const courseFeedback = feedback.filter(f => f.courseId === course.id);
          const avgRating = this.calculateAverageRating(courseFeedback);

          return {
            ...course,
            feedback: courseFeedback,
            avgRating: avgRating
          };
        });

        this.filteredCourses = this.courses;
        console.log(this.filteredCourses)

        const uniqueCategories = Array.from(new Set(courses.map(course => course.technology)));
        this.categories = ['All', ...uniqueCategories];

        if (candidateEmail) {
          this.courses.forEach(course => {
            course.isEnrolled = course.enrolledCandidates.includes(candidateEmail);
          });
        }
      });
    });
  }

    calculateAverageRating(feedback: any[]): number {
      if (feedback.length === 0) return 0;
      const totalRating = feedback.reduce((sum, current) => sum + current.courseRating, 0);
      return totalRating / feedback.length;
    }

  enroll(course: any) {
    const candidateEmail = localStorage.getItem('candidateEmail');
    const candidateName = localStorage.getItem('candidateName');

    if (candidateEmail && candidateName) {
      if (!course.enrolledCandidates.includes(candidateEmail)) {
        course.enrolledCandidates.push(candidateEmail);
        this.courseService.updateCourse(course).subscribe((updatedCourse) => {
          const index = this.courses.findIndex((c) => c.id === updatedCourse.id);
          if (index !== -1) {
            this.courses[index] = updatedCourse;
            this.filteredCourses = [...this.courses];
          }
        });

        alert(`You have successfully enrolled in the course: ${course.name}`);
        this.navigateCourse(course.id);
      } else {
        alert('You are already enrolled in this course.');
      }
    } else {
      alert('Please log in to enroll in courses.');
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  navigateCourse(courseid:any){
    this.router.navigate([`candidate/course-view/${courseid}`])
  }

  getCourseDurationInDays(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInTime = end.getTime() - start.getTime();
    const diffInMonths = diffInTime / (1000 * 3600 * 24); // Approximate days in a month
    return Math.ceil(diffInMonths).toString();
  }

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

applyFilters() {
  let filtered = this.courses;

  // Filter by category
  if (this.selectedCategory && this.selectedCategory !== 'All') {
    filtered = filtered.filter((course) =>
      course.technology.includes(this.selectedCategory)
    );
  }

  if (this.difficultyFilters.length) {
    filtered = filtered.filter((course) =>
      this.difficultyFilters.includes(course.difficulty)
    );
  }

  // Filter by duration
  if (this.durationFilters.length) {
    filtered = filtered.filter((course) => {
      const courseDurationInDays = Number(this.getCourseDurationInDays(course.startDate, course.endDate));

      if (this.durationFilters.includes('5 days') && courseDurationInDays < 5) {
        return true;
      }
      if (this.durationFilters.includes('5-10 days') && courseDurationInDays >= 5 && courseDurationInDays <= 10) {
        return true;
      }
      if (this.durationFilters.includes('10+ days') && courseDurationInDays > 10) {
        return true;
      }
      return false;
    });
  }

  if (this.ratingFilters.length) {
    filtered = filtered.filter((course) => {
      for (const filter of this.ratingFilters) {
        if (filter === '4.5 and above' && course.avgRating >= 4.5) {
          return true;
        }
        if (filter === '4.0 - 4.5' && course.avgRating >= 4.0 && course.avgRating < 4.5) {
          return true;
        }
        if (filter === '3.5 - 4.0' && course.avgRating >= 3.5 && course.avgRating < 4.0) {
          return true;
        }
        if (filter === 'Below 3.5' && course.avgRating < 3.5) {
          return true;
        }
      }
      return false;
    });
  }

  if (this.searchQuery) {
    filtered = filtered.filter((course) =>
      course.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  this.filteredCourses = filtered;
}


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


  search() {
    this.applyFilters();
  }

  bookmark_course(course: any) {
    let bookmarkedCourses = JSON.parse(localStorage.getItem('bookmarkedCourses') || '[]');

    const isBookmarked = bookmarkedCourses.some((c: any) => c.id === course.id);

    if (!isBookmarked) {
      bookmarkedCourses.push(course);
      localStorage.setItem('bookmarkedCourses', JSON.stringify(bookmarkedCourses));
    this.bookmark = true;
      alert(`${course.name} has been bookmarked!`);

    } else {
      bookmarkedCourses = bookmarkedCourses.filter((c: any) => c.id !== course.id);
      localStorage.setItem('bookmarkedCourses', JSON.stringify(bookmarkedCourses));
    this.bookmark = false;
      alert(`${course.name} has been removed from bookmarks.`);
    }
  }

  isBookmarked(course: any): boolean {
    const bookmarkedCourses = JSON.parse(localStorage.getItem('bookmarkedCourses') || '[]');
    return bookmarkedCourses.some((c: any) => c.id === course.id);
  }

  isAlreadyEnrolled(course: any): boolean {
    const candidateEmail = localStorage.getItem('candidateEmail');
    return course.enrolledCandidates.includes(candidateEmail || '');
  }
}
