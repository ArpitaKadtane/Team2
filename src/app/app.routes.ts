import { Routes } from '@angular/router';
import { AdminCreateCourseComponent } from './course/components/admin-create-course/admin-create-course.component';
import { AdminViewCoursesComponent } from './course/components/admin-view-courses/admin-view-courses.component';
import { CandidateViewCoursesComponent } from './course/components/candidate-view-courses/candidate-view-courses.component';
import { InstructorViewCoursesComponent } from './course/components/instructor-view-courses/instructor-view-courses.component';
import { CourseContentViewerComponent } from './course/components/course-content-viewer/course-content-viewer.component';
import {CandidateFilterCourses} from './course/components/candidate-filter-courses/candidate-filter-courses.component';
export const routes: Routes = [
  {
    path: 'course',
    children: [
      { path: '', redirectTo: 'admin-view-courses', pathMatch: 'full' },
      { path: 'admin-create-course', component: AdminCreateCourseComponent },
      { path: 'admin-view-courses', component: AdminViewCoursesComponent },
      { path: 'enroll-course', component: CandidateViewCoursesComponent },
      { path: 'instructor-view-courses', component: InstructorViewCoursesComponent },
      {path: 'candidate-filter-courses', component: CandidateFilterCourses},
      {path: 'course-content-viewer/:courseId', component: CourseContentViewerComponent},

    ],
  },
  { path: '', redirectTo: 'course', pathMatch: 'full' },
];
