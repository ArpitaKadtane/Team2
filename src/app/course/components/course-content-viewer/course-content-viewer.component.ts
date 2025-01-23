import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-content-viewer',
  templateUrl: './course-content-viewer.component.html',
  styleUrls: ['./course-content-viewer.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CourseContentViewerComponent implements OnInit {
  courseId: string = '';
  course: any;
  currentModuleIndex: number = 0;
  progress: number = 0;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.loadCourse();
  }

  loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe((data) => {
      this.course = data;
      this.updateProgress();
    });
  }

  nextModule(): void {
    if (this.currentModuleIndex < this.course.modules.length - 1) {
      this.currentModuleIndex++;
    }
  }

  previousModule(): void {
    if (this.currentModuleIndex > 0) {
      this.currentModuleIndex--;
    }
  }

  markAsCompleted(): void {
    this.course.modules[this.currentModuleIndex].completed = true;
    this.updateProgress();
    this.saveProgress();
  }

  updateProgress(): void {
    const completedModules = this.course.modules.filter(
      (module: any) => module.completed
    ).length;
    this.progress =
      (completedModules / this.course.modules.length) * 100;
  }

  saveProgress(): void {
    this.courseService.updateCourse(this.course).subscribe(() => {
      console.log('Progress saved.');
    });
  }
}
