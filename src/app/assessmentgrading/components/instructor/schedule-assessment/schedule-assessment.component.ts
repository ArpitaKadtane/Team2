import { Component ,OnInit , Inject} from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-assessment',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './schedule-assessment.component.html',
  providers : [CourseService],
  styleUrl: './schedule-assessment.component.css'
})
export class ScheduleAssessmentComponent implements OnInit{

  courses: any[] = [];

  userData = { 
    duration : ''
  };

  constructor(private CourseService: CourseService , private router: Router ,
    public dialogRef: MatDialogRef<ScheduleAssessmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string ,
      assessmentName : string ,
      createdAt : string ,
      courseId : number ,
      assessmentID : string,
      totalQuestions : number,
      isScheduled : boolean,
      scheduledDetails : any
    }
  ) { }


  ngOnInit(): void {
    this.CourseService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  onSubmit(): void {
    this.CourseService.scheduleAssessment(this.data.courseId , this.data.assessmentID , this.userData).subscribe(
      (response) => {
        alert('Assessment schedules successfully:');
        this.dialogRef.close(this.data.assessmentID);
      },
      (error) => {
        alert('Error saving assessment:');
        console.log(error)
      }
    );
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  updateAssessment(): void {
  
    this.dialogRef.close();
    this.router.navigate(['/update_assessment'] , 
      {
        state : {
          courseId : this.data.courseId,
          assessmentId : this.data.assessmentID,
        }
      }
    )
  }
  
}
