import { Component, inject, OnInit } from '@angular/core';
import { InstructorService } from '../../services/instructor.service';
import { error } from 'console';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructor-applied',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructor-applied.component.html',
  styleUrl: './instructor-applied.component.css'
})
export class InstructorAppliedComponent implements OnInit{
  
  private instructorService= inject(InstructorService);


  instructors:any[]=[];
  
  ngOnInit(): void {
    this.instructorService.getInstructor().subscribe({
      next:(data) =>{ 
        this.instructors =data;
        console.log('instructors fetched', this.instructors)
      },
      error:(error)=>{
        console.log('error fetching instructors',error)
      }
    })
  }


rejectInstructor(id:number){
  this.instructors= this.instructors.filter(instructor => instructor.id !==id);

  this.instructorService.deleteInstructor(id).subscribe({
    next: () => {
      console.log(`Instructor with ID ${id} removed successfully`);
    },
    error: (error) => {
      console.log('Error removing instructor:', error);
    }
  })
}

shortlistInstructor(instructor: any): void {
  this.instructorService.addToShortlisted(instructor).subscribe({
    next: () => {
      console.log(`Instructor with ID ${instructor.id} shortlisted successfully`);
    },
    error: (error) => {
      console.log('Error shortlisting instructor:', error);
    }
  });
}

}
