import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{
  assessmentData : any | undefined ;
  courseName : string | undefined ;

  ngOnInit(): void {
      this.assessmentData = history.state.assessmentData ;
      this.courseName =history.state.courseName ;
  }

  constructor( private router: Router){}

  completeReview(){
    this.router.navigate(['/assessmentdash'])
  }
}
