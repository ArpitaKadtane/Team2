import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, scheduled } from 'rxjs';
import { map  ,switchMap} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/test_course';
  private apiUrlCandidate = 'http://localhost:3000/test_candidates';

  constructor(private http: HttpClient) { }

  course : any[] = []

  getCourses(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((courses) => {
        this.course = courses; 
        return courses;
      })
    );
  }

  createAssessment(courseId: number, assessmentData: any): Observable<any> {

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(courses => {
        const course = courses.find(course => course.courseId === courseId);
        if (course) {
          assessmentData.assessmentID =uuidv4();
          assessmentData.createdAt = new Date().toISOString();
          assessmentData.schedule = {
            isScheduled : false ,
            scheduledDetails : ''
          }
          course.assessment.push(assessmentData);
          const courseIdInDb = course.id;
          return course;
        } else {
          throw new Error('Course not found');
        }
      }),
      switchMap((course) => {
        return this.http.patch<any>(`${this.apiUrl}/${course.id}`, course, {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
  }

  scheduleAssessment(courseId: number , assessmentID:string , scheduleDetails : any): Observable<any>{

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(courses => {
        const course = courses.find(course => course.courseId === courseId);
        if (course) {
          const selectedAssessment = course.assessment.find((assessments :any) => assessments.assessmentID === assessmentID)
          if (selectedAssessment) {
            if (!selectedAssessment.schedule) {
              selectedAssessment.schedule = {};
            }
            selectedAssessment.schedule.isScheduled = true;
            selectedAssessment.schedule.scheduledDetails = scheduleDetails;
            return course; 
          } else {
            throw new Error('Assessment not found');
          }
        } else {
          throw new Error('Course not found');
        }
      }),
      switchMap((course) => {
        return this.http.patch<any>(`${this.apiUrl}/${course.id}`, course, {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );
}

deleteAssessment(courseId: number, assessmentID:string): Observable<any> {

  return this.http.get<any[]>(this.apiUrl).pipe(
    map(courses => {
      const course = courses.find(course => course.courseId === courseId);
      if (course) {
        const assessIndex = course.assessment.findIndex(
          (assess:any) => assess.assessmentID === assessmentID
        )
        if (assessIndex !== -1) {
          course.assessment.splice(assessIndex, 1);
        }
        return course;
      } else {
        throw new Error('Course not found');
      }
    }),
    switchMap((course) => {
      return this.http.patch<any>(`${this.apiUrl}/${course.id}`, course, {
        headers: { 'Content-Type': 'application/json' }
      });
    })
  );
}

  getCandidate(userId : number): Observable<any> {
    return this.http.get<any[]>(this.apiUrlCandidate).pipe(
      map((users) => {
        const user = users.find(user => user.userId === userId)
        return user
      })
    );
  }

  getAssessmentDetails(courseId : number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((courses) => {
        const course = courses.find(course => course.courseId === courseId);
        if(course){
          const assessments = course.assessment.filter( (assessment:any) => assessment.schedule.isScheduled === true) ;
        
          const assessmentDetails =assessments.map((assessment: any) => ({
            assessmentName: assessment.assessmentName,
            assessmentID: assessment.assessmentID,
            createdAt: assessment.createdAt,
            scheduledDetails: assessment.schedule.scheduledDetails,
            totalQuestions : assessment.questions.length,
            isActive : false
          }));
          return assessmentDetails;
        }
        return false
      })
    );
  }

  getAssessmentQuestions(courseId : number , assessmentID : number): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((courses) => {
        const course = courses.find(course => course.courseId === courseId);
        if(course){
          const assessments = course.assessment.find( (assessment:any) => assessment.schedule.isScheduled === true && assessment.assessmentID === assessmentID) ;
        
          const assessmentDetails ={
            assessmentName: assessments.assessmentName,
            createdAt: assessments.createdAt,
            scheduledDetails: assessments.schedule.scheduledDetails,
            totalQuestions : assessments.questions.length,
            questions : assessments.questions
          }
          return assessmentDetails;
        }
        return false
      })
    );
  }

  completeAssessment(courseId : number , assessmentID : string , userId : number , completionDate : Date  , assessmentData : any ): Observable<any>{

    const fetchUpdateCourse = this.http.get<any[]>(this.apiUrl).pipe(
      map(courses => {
        const course = courses.find(course => course.courseId === courseId);
        if (course) {
          const selectedAssessment = course.assessment.find((assessments :any) => assessments.assessmentID === assessmentID)
          if (selectedAssessment) {
            if (!selectedAssessment.assessmentCompletions) {
              selectedAssessment.assessmentCompletions = [];
            }
            selectedAssessment.assessmentCompletions.push({
              userId : userId ,
              completionDate : completionDate ,
              assessmentData : assessmentData
            })
            return course; 
          } else {
            throw new Error('Assessment not found');
          }
        } else {
          throw new Error('Course not found');
        }
      }),
      switchMap((course) => {
        return this.http.patch<any>(`${this.apiUrl}/${course.id}`, course, {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    );

    const fetchUpdateUser=  this.http.get<any[]>(this.apiUrlCandidate).pipe(
      map(users => {
        const user = users.find(user => user.userId === userId);
        if(user){
          const course = user.entrolledCourses.find(( course :any) => course.courseId === courseId)
          if(!course.assessmentData){
            course.assessmentData = []
          }
          course.assessmentData.push({
            assessmentID : assessmentID ,
            completionDate : completionDate ,
            assessmentData : assessmentData
          })
          return user;
        }
        else{
          throw new Error("can't fetch the user details")
        }
      }),
      switchMap((user)=>{
        return this.http.patch<any>(`${this.apiUrlCandidate}/${user.id}`, user, {
          headers: { 'Content-Type': 'application/json' }
        });
      })
    )

    return forkJoin([fetchUpdateCourse , fetchUpdateUser]);
  }

  canAttempt(userId : number , courseId : number , assessmentID : string): Observable<any>{
 
    return this.http.get<any[]>(this.apiUrlCandidate).pipe(
      map(users => {
        const user = users.find(user => user.userId === userId);
        if(user){
          const course = user.entrolledCourses.find(( course :any) => course.courseId === courseId)
          if(course)
          {
            const assessment = course.assessmentData.find((assessment:any)=>assessment.assessmentID === assessmentID)
            if(assessment){
              return false ;
            }
            else
            return true ;
          }else{
            throw new Error("Cant fetch Course details")
          }
        }
        else{
          throw new Error("can't fetch the user details")
        }
      })
    )
  }

}
