import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { Course , Assessment ,Question } from '../../../models/course.model';
import { ScheduleAssessmentComponent } from '../schedule-assessment/schedule-assessment.component';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './course.component.html',
  providers : [ CourseService],
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit{
  courses: Course[] = [];
  selectedCourse : Course | undefined ;
  checking : null = null ;

  constructor(private CourseService: CourseService , private router: Router , private dialog: MatDialog) { }

  isScheduled(assessment : any):string{
    console.log("button clicked")
    if(assessment?.schedule?.isScheduled){
      return 'update'
    }
    else
    return 'schedule'
  }

  openDialog(assessmentName : string , createdAt : string ,assessmentID : string ,length : number , isScheduled : boolean , scheduledDetails : any): void {
    const dialogRef = this.dialog.open(ScheduleAssessmentComponent, {
      width: '600px',
      data: { title: this.selectedCourse?.title ,
          assessmentName : assessmentName,
          createdAt : createdAt,
          courseId : this.selectedCourse?.courseId,
          assessmentID : assessmentID,
          totalQuestions : length,
          isScheduled : isScheduled,
          scheduledDetails : scheduledDetails
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User Input:', result);
      }
    });
  }


  ngOnInit(): void {
    this.CourseService.getCourses().subscribe(data => {
      this.courses = data;
      this.selectedCourse = this.courses[0]
    });
  }

  goToAssessment( ){
    this.router.navigate(['/assessment', this.selectedCourse?.courseId]);
  }

  courseSelected(course : Course){
    this.selectedCourse = course ;
  }

  delAssessment( assessmentID : string){
    const validCourseId = this.selectedCourse?.courseId ?? 0;
    this.CourseService.deleteAssessment(validCourseId , assessmentID).subscribe(
      (response) => {
        alert('Assessment deleted successfully:');
        location.reload();
      },
      (error) => {
        alert('Error saving assessment:');
      }
    );
  }
}
