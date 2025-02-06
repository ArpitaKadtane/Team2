import { Routes } from '@angular/router';
import { authGuard } from './candidates/guards/auth.guard';
import { candeactivateGuard } from './assessmentgrading/components/candidate/candeactivate.guard';

import { CandidateLoginComponent } from './candidates/components/candidate-login/candidate-login.component';
import { CandidateRegistrationComponent } from './candidates/components/candidate-registration/candidate-registration.component';
import { CandidateDashboardComponent } from './candidates/components/candidate-dashboard/candidate-dashboard.component';
import { UpdateProfileComponent } from './candidates/components/update-profile/update-profile.component';
import { ChangePasswordComponent } from './candidates/components/change-password/change-password.component';
import { CandidateComponent } from './candidates/components/candidate/candidate.component';
import { ErrorPageComponent } from './candidates/components/error-page/error-page.component';
import { ViewAllCoursesComponent } from './candidates/components/view-all-courses/view-all-courses.component';
import { TrackMyLearningComponent } from './candidates/components/track-my-learning/track-my-learning.component';
import { UpcomingEventsComponent } from './candidates/components/upcoming-events/upcoming-events.component';
import { BookmarkedCoursesComponent } from './candidates/components/bookmarked-courses/bookmarked-courses.component';

import { AdminCreateCourseComponent } from './course/components/admin-create-course/admin-create-course.component';
import { AdminViewCoursesComponent } from './course/components/admin-view-courses/admin-view-courses.component';
import { CandidateViewCoursesComponent } from './course/components/candidate-view-courses/candidate-view-courses.component';
import { CourseContentViewerComponent } from './course/components/course-content-viewer/course-content-viewer.component';
import { FeedbackComponent } from './course/components/feedback/feedback.component';
import { CertificateComponent } from './course/components/certificate/certificate.component';

import { CourseComponent } from './assessmentgrading/components/instructor/course/course.component';
import { AssessmentComponent } from './assessmentgrading/components/instructor/assessment/assessment.component';
import { ScheduleAssessmentComponent } from './assessmentgrading/components/instructor/schedule-assessment/schedule-assessment.component';
import { AssessmentDashComponent } from './assessmentgrading/components/candidate/assessment-dash/assessment-dash.component';
import { InassessmentComponent } from './assessmentgrading/components/candidate/inassessment/inassessment.component';
import { ReviewComponent } from './assessmentgrading/components/candidate/review/review.component';
import { ReportComponent } from './assessmentgrading/components/candidate/report/report.component';
import { UpdateAssessComponent } from './assessmentgrading/components/instructor/update-assess/update-assess.component';

import { ProfileComponent } from './instructor/profile-of-instructor/profile.component';
import { ListOfApplicantsComponent } from './instructor/components/Add_Instructor/list-of-applicants/list-of-applicants.component';
import { InstructorApplyComponent } from './instructor/components/instructor-apply/instructor-apply.component';
import { FormsubmittedComponent } from './instructor/components/formsubmitted/formsubmitted.component';
import { InstructorAppliedComponent } from './instructor/components/instructor-applied/instructor-applied.component';
import { InstructorProfileComponent } from './instructor/components/instructor-profile/instructor-profile.component';
import { RegistrationFormComponent } from './instructor/components/Add_Instructor/registration-form/registration-form.component';

export const routes: Routes = [
  // Course Module Routes
  { path: 'admin-create-course', component: AdminCreateCourseComponent },
  { path: 'admin-view-courses', component: AdminViewCoursesComponent },
  { path: 'candidate-view', component: CandidateViewCoursesComponent },
  { path: 'feedback/:courseId', component: FeedbackComponent },
  { path: 'certificate/:courseId', component: CertificateComponent },

  // Assessment Module Routes
  { path: 'course', component: CourseComponent },
  { path: 'assessment/:id', component: AssessmentComponent },
  { path: 'schedule', component: ScheduleAssessmentComponent },
  { path: 'assessmentdash', component: AssessmentDashComponent, canActivate: [authGuard] },
  { path: 'insideassessment', component: InassessmentComponent, canDeactivate: [candeactivateGuard] },
  { path: 'review', component: ReviewComponent },
  { path: 'report', component: ReportComponent },
  { path: 'update_assessment', component: UpdateAssessComponent },

  // Instructor Module Routes
  { path: 'instructor', component: InstructorApplyComponent },
  { path: 'instructor/form', component: RegistrationFormComponent },
  { path: 'instructor/applicants', component: ListOfApplicantsComponent },
  { path: 'instructor/successfully-submitted', component: FormsubmittedComponent },
  { path: 'instructor/applicants-details', component: InstructorAppliedComponent },
  { path: 'instructor/available-tutors', component: ListOfApplicantsComponent },
  { path: 'instructor-profile/:instructorId', component: InstructorProfileComponent },
  { path: 'profile/:id', component: ProfileComponent },

  // Candidate Module Routes
  { path: 'login', component: CandidateLoginComponent },
  { path: 'register', component: CandidateRegistrationComponent },
  { path: 'NotFound', component: ErrorPageComponent },

  {
    path: 'candidate',
    component: CandidateComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CandidateDashboardComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'update-profile', component: UpdateProfileComponent },
      { path: 'all-courses', component: ViewAllCoursesComponent },
      { path: 'bookmarked-courses', component: BookmarkedCoursesComponent },
      { path: 'track-my-learning', component: TrackMyLearningComponent },
      { path: 'upcoming-Assessments', component: UpcomingEventsComponent },
      { path: 'course-view/:courseId', component: CourseContentViewerComponent },
    ],
  },

  // Wildcard Route for 404
  { path: '**', redirectTo: 'NotFound' },
];
