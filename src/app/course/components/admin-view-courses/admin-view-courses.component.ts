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

  loadCourses() {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = data;
    });
  }

  filteredCourses() {
    return this.courses.filter((course) =>
      course.instructor.toLowerCase().includes(this.filterInstructor.toLowerCase()) &&
      course.technology.toLowerCase().includes(this.filterTechnology.toLowerCase()) &&
      (!this.filterStatus || course.status === this.filterStatus)
    );
  }

  editCourse(course: any) {
    this.selectedCourse = { ...course }; 
  }

  updateCourse() {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse).subscribe(() => {
        this.loadCourses(); // Reload the courses to reflect changes
        this.selectedCourse = null; 
      });
    }
  }

  cancelEdit() {
    this.selectedCourse = null;
  }

  confirmDelete(course: any) {
    if (confirm(`Are you sure you want to delete the course: ${course.name}?`)) {
      this.deleteCourse(course);
    }
  }

  deleteCourse(course: any) {
    this.courseService.deleteCourse(course.id).subscribe(() => {
      this.loadCourses(); // Reload the courses to reflect changes
    });
  }
}
