import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-admin-create-course',
  templateUrl: './admin-create-course.component.html',
  styleUrls: ['./admin-create-course.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminCreateCourseComponent {
  course = {
    courseId: '',
    name: '',
    startDate: '',
    endDate: '',
    technology: '',
    status: '',
    instructor: ''
  };

  constructor(private courseService: CourseService) {}

  onSubmit() {
    this.updateStatus();
    this.courseService.createCourse(this.course).subscribe(() => {
      alert('Course created successfully!');
    });
  }

  updateStatus(): void {
    const currentDate = new Date();
    const startDate = new Date(this.course.startDate);
    const endDate = new Date(this.course.endDate);

    if (currentDate < startDate) {
      this.course.status = 'Upcoming';
    } else if (currentDate >= startDate && currentDate <= endDate) {
      this.course.status = 'Ongoing';
    } else if (currentDate > endDate) {
      this.course.status = 'Past';
    } else {
      this.course.status = '';
    }
  }
}
