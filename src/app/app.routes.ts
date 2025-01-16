import { Routes } from '@angular/router';
import { AdminCreateCourseComponent } from './course/components/admin-create-course/admin-create-course.component';
import { AdminViewCoursesComponent } from './course/components/admin-view-courses/admin-view-courses.component';
import { CandidateViewCoursesComponent } from './course/components/candidate-view-courses/candidate-view-courses.component';
import { CandidateMyCoursesComponent } from './course/components/candidate-my-courses/candidate-my-courses.component';
import { InstructorViewCoursesComponent } from './course/components/instructor-view-courses/instructor-view-courses.component';

export const routes: Routes = [
  { path: '', redirectTo: 'admin-view-courses', pathMatch: 'full' },
  { path: 'admin-create-course', component: AdminCreateCourseComponent },
  { path: 'admin-view-courses', component: AdminViewCoursesComponent },
  { path: 'candidate-view', component: CandidateViewCoursesComponent },
  { path: 'candidate-my-courses', component: CandidateMyCoursesComponent },
  { path: 'instructor-view-courses', component: InstructorViewCoursesComponent }
];
