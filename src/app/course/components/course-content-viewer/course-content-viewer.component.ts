import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  safePdfUrl: SafeResourceUrl | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['courseId'];
    this.loadCourse();
  }

  loadCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe((data) => {
      this.course = data;
      this.updateProgress();
      this.updateContentUrls();
    });
  }

  nextModule(): void {
    if (this.currentModuleIndex < this.course.modules.length - 1) {
      this.currentModuleIndex++;
      this.updateContentUrls();
    }
  }

  previousModule(): void {
    if (this.currentModuleIndex > 0) {
      this.currentModuleIndex--;
      this.updateContentUrls();
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
    this.progress = (completedModules / this.course.modules.length) * 100;
  }

  saveProgress(): void {
    this.courseService.updateCourse(this.course).subscribe(() => {
      console.log('Progress saved.');
    });
  }

  updateContentUrls(): void {
    const module = this.course.modules[this.currentModuleIndex];

    if (module.type === 'pdf') {
      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `assets/pdfs/${module.contentUrl}`
      );
      this.safeVideoUrl = null; 
    } else if (module.type === 'video') {
      this.safePdfUrl = null; 
      this.safeVideoUrl = this.sanitizeVideoUrl(module.contentUrl);
    }
  }

  sanitizeVideoUrl(url: string): SafeResourceUrl {
    if (url.includes('youtube.com') || url.includes('youtu.be')) { 
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(`assets/videos/${url}`);
  }
}
