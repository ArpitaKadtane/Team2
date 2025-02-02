import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule, NgIfContext } from '@angular/common';
// import { EditProfileModalComponent } from './/edit-profile-modal/edit-profile-modal.component';
// import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from './../services/instructor.service';
// import { NavigationComponent } from '../navigation/navigation.component';
import { NewsletterComponent } from '../components/newsletter/newsletter.component';
import { FooterComponent } from '../components/footer/footer.component'
// import { shortlisted_instructor } from '../../models/shortlisted_instrtuctor.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NewsletterComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  instructor: any = {}; // Initialize as an empty object
  route: any;

  constructor(private instructorService: InstructorService) {}

  ngOnInit(): void {
    this.fetchInstructorData();
  }

  fetchInstructorData(): void {
    this.instructorService.getInstructor().subscribe(
      (data) => {
        this.instructor = data[4]; // Assign the first instructor
        console.log('Instructor Data:', this.instructor); // Log the data
      },
      (error) => {
        console.error('Error fetching instructor data', error);
      }
    );
  }
}
