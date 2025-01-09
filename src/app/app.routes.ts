import { Routes } from '@angular/router';
import { AdminCreateCourseComponent } from './course/components/admin-create-course/admin-create-course.component';
import { AdminViewCoursesComponent } from './course/components/admin-view-courses/admin-view-courses.component';
import { CandidateViewCoursesComponent } from './course/components/candidate-view-courses/candidate-view-courses.component';

export const routes: Routes = [
  { path: '', redirectTo: 'view-courses', pathMatch: 'full' },
  { path: 'create-course', component: AdminCreateCourseComponent },
  { path: 'view-courses', component: AdminViewCoursesComponent },
  { path: 'candidate-view', component: CandidateViewCoursesComponent }
];
