import { Component} from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { User } from '../../../models/course.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-dash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assessment-dash.component.html',
  styleUrl: './assessment-dash.component.css',
  providers : [CourseService]
})


export class AssessmentDashComponent {
 
  user : any | undefined ;
  userId : number = 1231243 ;
  userName : string = "sihabutheen" ; 
  selectedCourse : any | undefined ;
  candidateAssessment : any | undefined ;
  
  constructor(private CourseService: CourseService , private router: Router) { }

  ngOnInit(): void {
    this.CourseService.getCandidate(this.userId).subscribe(data => {
      this.user = data ;
      this.selectedCourse = data.entrolledCourses[0] ; 

      this.CourseService.getAssessmentDetails(data.entrolledCourses[0].courseId).subscribe(data => {
        
        this.candidateAssessment = data.map((assessment:any)=>{

          const isActive = this.selectedCourse.assessmentStatus === false && this.selectedCourse.completionPercentage === 100 ;
          const totalQuestions = this.selectedCourse.totalQuestions ;
          const isCompleted = this.selectedCourse.assessmentStatus;
          return { ...assessment , isActive : isActive , isCompleted : isCompleted}
        })
      })
    });
    
  }

  courseSelected(course : any){
    this.selectedCourse = course ;
    const now = new Date() ;
    this.CourseService.getAssessmentDetails(course.courseId).subscribe(data => {
      this.candidateAssessment =data.map((assessment:any)=>{

        const isActive = this.selectedCourse.assessmentStatus === false && this.selectedCourse.completionPercentage === 100 ;
        const totalQuestions = this.selectedCourse.totalQuestions ;
        const isCompleted = this.selectedCourse.assessmentStatus ;
        return { ...assessment , isActive : isActive ,isCompleted : isCompleted }
      })
    })

  }

  attemptAssessment(assessmentID : string){
    this.CourseService.canAttempt( this.userId ,this.selectedCourse.courseId , assessmentID).subscribe(data =>
     {
      if(data){
        if(confirm("Are you sure ?"))
          this.router.navigate(['/insideassessment'] ,{
            state  :{
              courseId : this.selectedCourse.courseId ,
              userId : this.userId,
              assessmentID : assessmentID,
              userName : this.userName,
              courseName : this.selectedCourse.title
            }
          });
      }
      else{
        alert("You cant reattempt the assessment")
      }
     }
    )
    
  }

  reviewAssessment(assessmentID : string){
    const ad = this.user?.entrolledCourses.find((data:any) => data.courseId === this.selectedCourse.courseId)
    if(ad.assessmentData){
      const assessment = ad?.assessmentData.find((data:any) => data.assessmentID === assessmentID)
      if(!assessment){
        alert("You did not completed the assessment ")
      }else{
        // this.router.navigate(['/review'] , {
        //   state : {
        //     assessmentData : assessment.assessmentData,
        //     courseName : ad.title
        //   }
        // })
        this.router.navigate(['/report'], {
          state : {
            userName : this.userName ,
            courseName : ad.title ,
            assessmentData : ad.assessmentData[0].assessmentData ,
          }
        });
      }
      
    }else{
      alert("You did not completed the assessment ")
    }
    
  }
 
}
