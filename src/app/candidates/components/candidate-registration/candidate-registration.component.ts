import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Candidate } from '../../models/candidate.model';  // Import the Candidate interface
import { CandidateService } from '../../services/candidate.service';
import { HeaderComponent } from '../header/header.component'; // Import HeaderComponent
import { FooterComponent } from '../../../shared/footer/footer.component'; // Import FooterComponent
import { AdditionalDetails } from '../../models/candidate.model';  // Import AdditionalDetails interface

@Component({
  selector: 'app-candidate-registration',
  standalone: true,
  templateUrl: './candidate-registration.component.html',
  styleUrls: ['./candidate-registration.component.css'],
  imports: [FormsModule, CommonModule, RouterModule, HeaderComponent, FooterComponent],
})
export class CandidateRegistrationComponent implements OnInit {
  candidate: Candidate = {
    id: '', // Initialize id with a default value
    fullName: '',
    email: '',
    password: '',
  };

  additionalDetails: AdditionalDetails = {
    email: '',
    phoneNumber: '',
    location: '',
    companyName: '',
    status: '',
    specialization: '',
    gender: '',
    profilePicture: '',
  };

  selectedFile: File | null = null;
  showForm = true; // Flag to toggle between form and message
  errorMessage: string = ''; // Holds any error message for validation
  showPassword: boolean = false; // For toggling password visibility
  showConfirmPassword: boolean = false; // For toggling confirm password visibility
  alreadySubmittedMessage = ''; // Holds message when details are already submitted

  constructor(private candidateService: CandidateService, public router: Router) {}

  ngOnInit(): void {
      const storedEmail = localStorage.getItem('candidateEmail');
      
      // If email is found in localStorage, check if additional details exist
      if (storedEmail) {
        this.additionalDetails.email = storedEmail; // Assign email to additional details
        this.candidateService.getAdditionalDetailsByEmail(storedEmail).subscribe((details) => {
          if (details && details.email) {
            this.showForm = false; // Hide the form if additional details exist
            this.alreadySubmittedMessage = 'Additional details have already been submitted. Would you like to edit your profile?';
          }
        });
      } else {
        this.errorMessage = 'Email not found in localStorage. Please log in again.';
      }
    }
    

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.additionalDetails.profilePicture = reader.result as string; // Convert to Base64 string
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  

  onSubmit(): void {
    this.errorMessage = ''; // Reset error message

    // If the form is hidden, meaning details have already been submitted, don't allow resubmission
    if (!this.showForm) {
      return; // Prevent form submission if details have been submitted already
    }

    // Validation checks for the additional details
    if (!this.additionalDetails.phoneNumber) {
      this.errorMessage = 'Phone Number is required.';
      return;
    }
    if (!this.additionalDetails.location) {
      this.errorMessage = 'Location is required.';
      return;
    }
    if (!this.additionalDetails.companyName) {
      this.errorMessage = 'Company/College Name is required.';
      return;
    }
    if (!this.additionalDetails.specialization) {
      this.errorMessage = 'Specialization is required.';
      return;
    }
    if (!this.additionalDetails.gender) {
      this.errorMessage = 'Gender is required.';
      return;
    }
    if (!this.additionalDetails.status) {
      this.errorMessage = 'Status is required.';
      return;
    }

    // Call the service to register additional details
    this.candidateService.registerCandidate(this.additionalDetails).subscribe({
      next: (response) => {
        alert('Registration successful!');
        setTimeout(() => {
          this.router.navigate(['candidate/dashboard']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error during additional details registration:', err);
        this.errorMessage = 'Failed to register additional details. Try again.';
      }
    });
  }
}
