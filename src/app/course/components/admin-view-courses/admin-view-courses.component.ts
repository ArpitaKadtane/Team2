import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admin-view-courses',
  templateUrl: './admin-view-courses.component.html',
  styleUrls: ['./admin-view-courses.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AdminViewCoursesComponent implements OnInit {
  courses: any[] = [];
  filterInstructor: string = '';
  filterTechnology: string = '';
  filterStatus: string = '';
  selectedCourse: any = null;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  // Load and update statuses dynamically
  loadCourses() {
    this.courseService.getCourses().subscribe((data: any[]) => {
      const currentDate = new Date();
      this.courses = data.map((course) => {
        const startDate = new Date(course.startDate);
        const endDate = new Date(course.endDate);

        if (currentDate < startDate) {
          course.status = 'Upcoming';
        } else if (currentDate >= startDate && currentDate <= endDate) {
          course.status = 'Ongoing';
        } else {
          course.status = 'Past';
        }

        return course;
      });
    });
  }

  // Filter courses based on user inputs
  filteredCourses() {
    return this.courses.filter((course) => {
      const matchesInstructor = this.filterInstructor
        ? course.instructor.toLowerCase().includes(this.filterInstructor.toLowerCase())
        : true;

      const matchesTechnology = this.filterTechnology
        ? course.technology.toLowerCase().includes(this.filterTechnology.toLowerCase())
        : true;

      const matchesStatus = this.filterStatus
        ? course.status === this.filterStatus
        : true;

      return matchesInstructor && matchesTechnology && matchesStatus;
    });
  }

  // Edit course
  editCourse(course: any) {
    this.selectedCourse = { ...course };
  }

  // Update course and reload
  updateCourse() {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse).subscribe(() => {
        this.loadCourses();
        this.selectedCourse = null;
      });
    }
  }

  // Cancel editing
  cancelEdit() {
    this.selectedCourse = null;
  }

  // Confirm and delete course
  confirmDelete(course: any) {
    if (confirm(`Are you sure you want to delete the course: ${course.name}?`)) {
      this.deleteCourse(course);
    }
  }

  // Delete course
  deleteCourse(course: any) {
    this.courseService.deleteCourse(course.id).subscribe(() => {
      this.loadCourses();
    });
  }
}
