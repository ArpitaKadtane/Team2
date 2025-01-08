import { Component , EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CanComponentDeactivate } from '../candeactivate.guard';
import { TimerComponent } from '../timer/timer.component';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inassessment',
  standalone: true,
  imports: [TimerComponent , CommonModule, FormsModule],
  templateUrl: './inassessment.component.html',
  styleUrl: './inassessment.component.css',
  providers : [CourseService] 
})
export class InassessmentComponent implements CanComponentDeactivate ,OnInit {
  
  courseId : number | undefined ;
  assessmentID : string | undefined ;
  userId : number | undefined;
  assessmentData : any | undefined ;
  duration : number | undefined ;
  isConfirmLeave : boolean = false ;
  userName : string | undefined ;
  courseName : string | undefined ;

  constructor(private CourseService: CourseService ,private route: ActivatedRoute ,  private router: Router){}

  ngOnInit(): void {
   this.courseId = history.state.courseId ;
   this.assessmentID = history.state.assessmentID ;
   this.userId = history.state.userId ;
   this.userName = history.state.userName ;
   this.courseName =history.state.courseName;
   this.CourseService.getAssessmentQuestions(history.state.courseId ,history.state.assessmentID).subscribe(data=>{
    this.assessmentData = data
    this.assessmentData.startAt = new Date();
    console.log("starting time")
    console.log(this.assessmentData.startAt)
    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();
    const [endHours , endMinutes] = data.scheduledDetails.endTime.split(':');
    const totalNowMinutes = nowHours*60 + nowMinutes;
    const totalEndMinutes = parseInt(endHours) * 60 + parseInt(endMinutes) ;
    this.duration = Math.abs(totalEndMinutes - totalNowMinutes) ;
   }

   )
  }
 
  canDeactivate(): boolean {
    if(this.isConfirmLeave){
      return true ;
    }
    const confirmDeactivation = confirm('You are attending assessment , Are you sure you want to leave this page?');
    return confirmDeactivation;
  }

  onTimerEnd(): void {
    alert('Time is up! Assessment Ends , Congrdulations on completing Assessments');
    if(this.courseId && this.assessmentID && this.userId)
    this.onSubmit(this.courseId , this.assessmentID , this.userId);  
  }

  onSubmit(courseId:number , assessmentID:string , userId : number): void{
    if(confirm( "are sure you want to submit ? ")){
      this.assessmentData.completionAt = new Date();
      
      this.CourseService.completeAssessment(courseId ,assessmentID , userId , this.assessmentData.completionAt ,this.assessmentData).subscribe(
        (response)=>{
          this.isConfirmLeave = true ;
          alert("Assessment Saved Successfully")
          this.router.navigate(['/report'], {
            state : {
              userName : this.userName ,
              courseName : this.courseName ,
              assessmentData : this.assessmentData ,
            }
          });
        },
        (error)=>{
          alert("Oops! Error in saving assessment");
        }
      )
    }

  }
  
}
