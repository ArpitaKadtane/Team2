import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{

  userName : string | undefined ;
  courseName : string | undefined ;
  assessmentData : any | undefined ;
  timeTaken : any | undefined ;
  answeredQuestions : number | undefined ;
  marksInPercentage : number | undefined ;

  ngOnInit():void{
    this.userName = history.state.userName ;
    this.courseName = history.state.courseName ;
    this.assessmentData = history.state.assessmentData ;
    const startAt = new Date(history.state.assessmentData.startAt) ;
    const completionAt = new Date(history.state.assessmentData.completionAt);

    const diffMs = Math.abs(startAt.getTime() - completionAt.getTime())
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
    this.timeTaken = diffHours.toString().padStart(2 ,"0")+" : " +diffMinutes.toString().padStart(2 ,"0")+" : " +diffSeconds.toString().padStart(2 ,"0")
    this.answeredQuestions = history.state.assessmentData.questions.filter((data:any) => data.userAnswer != "").length
    this.calculateMarks(history.state.assessmentData.questions);
  }

  constructor( private router: Router){}

  calculateMarks(questions : any){
    const marks = ( questions.filter((data:any)=> data.userAnswer === data.answer ).length / questions.length )*100
 
    this.marksInPercentage = marks
  }

  goToAssessmentReview(){
    this.router.navigate(['/review'] , {
      state : {
        assessmentData : this.assessmentData,
        courseName : this.courseName
      }
    })
  }
}
