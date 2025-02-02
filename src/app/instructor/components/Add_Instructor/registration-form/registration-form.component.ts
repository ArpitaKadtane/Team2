import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InstructorService } from '../../../services/instructor.service';
import { BeforApplyBannerComponent } from '../../befor-apply-banner/befor-apply-banner.component';


@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule,BeforApplyBannerComponent],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent {
  instructorForm = new FormGroup({
    fullName: new FormControl(''),
    contactNumber: new FormControl(''),
    email: new FormControl(''),
    experience: new FormControl(''),
    teachingDomain: new FormControl(''),
    specialization: new FormControl(''),
    degree: new FormControl(''),
    certifications: new FormControl(''),
    daysAvailable: new FormControl(''),
    hoursAvailable: new FormControl(''),
    resume: new FormControl(null),
  });

  private instructorservice = inject(InstructorService);
  private http = inject(HttpClient);
  private router = inject(Router);

  validateFormData(formData: any): string[] {
    const { fullName, contactNumber, experience, daysAvailable, hoursAvailable, email } = formData;
    const errors: string[] = [];

    if (!fullName) errors.push('Full name is required.');
    if (!contactNumber) errors.push('Contact number is required.');
    if (experience === null || experience === undefined) errors.push('Experience is required.');
    if (daysAvailable === null || daysAvailable === undefined) errors.push('Days available is required.');
    if (hoursAvailable === null || hoursAvailable === undefined) errors.push('Hours available is required.');
    if (!email) errors.push('Email is required.');

    if (/\d/.test(fullName)) errors.push('Full name should not contain numbers.');
    if (/[a-zA-Z]/.test(contactNumber)) errors.push('Contact number should not contain alphabets.');
    if (contactNumber.length < 10) errors.push('Contact number should be at least 10 digits long.');
    if (experience < 0) errors.push('Experience should be non-negative.');
    if (daysAvailable < 0) errors.push('Days available should be non-negative.');
    if (hoursAvailable < 0) errors.push('Hours available should be non-negative.');
    if (/[a-zA-Z]/.test(daysAvailable)) errors.push('Days available should not contain alphabets.');
    if (/[a-zA-Z]/.test(hoursAvailable)) errors.push('Hours available should not contain alphabets.');

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) errors.push('Email is not in a valid format.');

    return errors;
  }

  onCancel() {
    const confirmation = confirm('Are you sure you want to cancel? Your changes will not be saved.');
    if (confirmation) {
      this.router.navigate(['/']); // Navigates to the home page
    }
  }
  

  onSubmit() {
    const formData = this.instructorForm.value;
    const errors = this.validateFormData(formData);

    if (errors.length > 0) {
      alert('Form validation failed:\n' + errors.join('\n'));
      errors.forEach((error) => console.error(error));
      return;
    }

    console.log('Validated form data:', formData);

    // Submit using InstructorService
    this.instructorservice.submitInstructorData(formData).subscribe({
      next: (response) => {
        console.log('Instructor application submitted via InstructorService:', response);
        alert('Form submitted successfully.');
        this.router.navigate(['/successfully-submitted']);
      },
      error: (error) => {
        console.error('Error submitting via InstructorService:', error);

        // Fallback to HttpClient submission if InstructorService fails
        this.http.post('http://localhost:3000/instructors', formData).subscribe({
          next: (response) => {
            console.log('Instructor application submitted via HttpClient fallback:', response);
            alert('Form submitted successfully via fallback.');
          },
          error: (httpError) => {
            console.error('Error submitting via HttpClient fallback:', httpError);
          },
        });
      },
    });
  }
}

