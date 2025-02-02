import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InstructorService } from '../../services/instructor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { shortlisted_instructor } from '../../models/shortlisted_instrtuctor.model';
import { catchError, forkJoin, throwError } from 'rxjs';
import { error } from 'console';
import { FooterComponent } from "../footer/footer.component";



@Component({
    selector: 'app-instructor-profile',
    standalone: true,
    imports: [FormsModule, CommonModule, FooterComponent],
    templateUrl: './instructor-profile.component.html',
    styleUrl: './instructor-profile.component.css'
  })
  export class InstructorProfileComponent implements OnInit {
    instructorId!: string;
    allCourses: Course[] = [];
    unassignedCourses: Course[] = [];
    alreadyAssginedCourses: Course[] = [];
    selectedCourseId!: string;
    instructorProfileDetails!: shortlisted_instructor;
    isAdmin: boolean = false;

    private route = inject(ActivatedRoute);
    private instructorService = inject(InstructorService);
    private courseService = inject(CourseService);
    private router = inject(Router);

    ngOnInit(): void {
      const idparm = this.route.snapshot.paramMap.get('instructorId');  // Fetching the 'instructorId' from the route
      if (idparm) {
        this.instructorId = idparm;
        console.log(idparm);
      }
      if (!idparm) {
        console.error('No instructor id provided');
        return;
      }

      const isAdminParam = this.route.snapshot.queryParamMap.get('isAdmin');
      this.isAdmin = isAdminParam === 'true';

      this.fetchallCourses();
      this.fetchAssignedCourses();
    }

    fetchAssignedCourses(): void {
      this.instructorService.getInstructorById(this.instructorId).subscribe({
        next: (instructor) => {
          this.instructorProfileDetails = instructor;
          this.alreadyAssginedCourses = instructor.assignedCourses;
          console.log('Assigned Courses:', this.alreadyAssginedCourses); // Check the data
        },
        error: (err) => {
          console.log('Error while fetching instructor by id', err);
        }
      });
    }


    fetchallCourses(): void {
      this.courseService.getAllCourses().subscribe({
        next: (data) => {
          this.allCourses = data;
          this.unassignedCourses = this.allCourses.filter((course) => !course.instructor);
        },
        error: (err) => {
          console.log("Error while fetching the courses", err);
        }
      });
    }

    assignCourse(): void {
      if (!this.isAdmin) return;

      const courseIndex = this.unassignedCourses.findIndex((course) => course.id === this.selectedCourseId);
      if (courseIndex > -1) {
        const course = this.unassignedCourses[courseIndex];

        const updatedCourse = { ...course, instructor: this.instructorProfileDetails.fullName };

        this.alreadyAssginedCourses.push(course);
        this.unassignedCourses.splice(courseIndex, 1);

        // Updating course array in the backend
        this.courseService.updateCourse(course.id, updatedCourse).subscribe({
          error: (err) => {
            console.log("Error updating the course", err);
            return;
          }
        });

        // Updating instructor also
        const updatedInstructor: shortlisted_instructor = {
          ...this.instructorProfileDetails,
          assignedCourses: this.alreadyAssginedCourses
        };

        this.instructorService.updateInstructor(this.instructorId, updatedInstructor).subscribe({
          error: (err) => {
            console.log('Error while updating the instructor assigned course array', err);
          }
        });
        this.selectedCourseId = '';
      }
    }

    deleteCourse(courseId: string): void {
      if (!this.isAdmin) return;

      const courseToUnassign = this.alreadyAssginedCourses.find(course => course.id === courseId);

      if (!courseToUnassign) {
        return;
      }

      const updatedCourse: Course = {
        id: courseToUnassign.id,
        courseId: courseToUnassign.courseId,
        name: courseToUnassign.name,
        startDate: courseToUnassign.startDate,
        endDate: courseToUnassign.endDate,
        technology: courseToUnassign.technology,
        status: courseToUnassign.status,
        instructor: ''  // Set to empty string instead of null since instructor is of type string
      };

      this.alreadyAssginedCourses = this.alreadyAssginedCourses.filter(course => course.id !== courseId);
      this.unassignedCourses = [...this.unassignedCourses, updatedCourse];

      forkJoin({
        courseUpdate: this.courseService.updateCourse(courseId, updatedCourse),
        instructorUpdate: this.instructorService.updateInstructor(this.instructorId, { ...this.instructorProfileDetails, assignedCourses: this.alreadyAssginedCourses })
      }).pipe(catchError(error => {
        this.alreadyAssginedCourses = [...this.alreadyAssginedCourses, courseToUnassign];
        this.unassignedCourses = this.unassignedCourses.filter(course => course.id !== courseId);
        return throwError(() => error);
      })).subscribe({
        next: () => {
          console.log('Course successfully unassigned from instructor');
        },
        error: (err) => {
          console.error('Error unassigning course', err);
        }
      });
    }

    deleteInstructor(instructorId: string): void {
      if (!this.isAdmin) return;

      this.instructorService.deleteShortlistedInstructor(instructorId).subscribe({
        next: () => {
          console.log(`${instructorId} has been deleted successfully`);
          this.router.navigate(['./available-tutors']);
        },
        error: (err) => {
          console.log("Error during deleting shortlisted instructor", err);
        }
      });
    }
  }
