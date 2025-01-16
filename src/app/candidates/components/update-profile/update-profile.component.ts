import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate, AdditionalDetails } from '../../models/candidate.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component'; 
import { FooterComponent } from '../footer/footer.component'; 

@Component({
  selector: 'app-update-profile',
  standalone: true,
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent],
})
export class UpdateProfileComponent implements OnInit {
  candidate: Candidate = { fullName: '', email: '', password: '', id: '' };
  additionalDetails: AdditionalDetails = { email: '', phoneNumber: '', location: '', specialization: '', companyName: '', gender: '', status: '',profilePicture: '' }; // Initialize as empty object
  errorMessage: string = '';
  successMessage: string = '';
  newProfile: any;

  constructor(private candidateService: CandidateService, private router: Router) {}

  ngOnInit() {
    const email = localStorage.getItem('candidateEmail');
    console.log('Email from localStorage:', email); // Debugging line

    if (email) {
      this.candidateService.getCandidateByEmail(email).subscribe({
        next: (response) => {
          if (response) {
            this.candidate = response; // Assign the candidate details
            this.fetchAdditionalDetails(response.email); // Fetch additional details
          } else {
            this.errorMessage = 'Candidate not found.';
          }
        },
        error: (error) => {
          console.error('Error fetching candidate:', error);
          this.errorMessage = 'Failed to load candidate data. Try again later.';
        },
      });
    } else {
      this.errorMessage = 'No email found. Please log in again.';
      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.newProfile = fileInput.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        this.additionalDetails.profilePicture = reader.result as string; // Convert to Base64 string
      };
      reader.readAsDataURL(this.newProfile);
    }
  }

  fetchAdditionalDetails(email: string): void {
    this.candidateService.getAdditionalDetailsByEmail(email).subscribe({
      next: (details) => {
        if (details) {
          this.additionalDetails = details;
        } else {
          this.errorMessage = 'No additional details found.';
        }
      },
      error: (error) => {
        console.error('Error fetching additional details:', error);
        this.errorMessage = 'Failed to load additional details. Try again later.';
      }
    });
  }

  // Method to update the profile
  onUpdate() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validations
    if (!this.candidate.fullName) {
      this.errorMessage = 'Full Name is required.';
    } else if (!this.isValidEmail(this.candidate.email)) {
      this.errorMessage = 'Provide a valid email format.';
    } else if (!this.additionalDetails.phoneNumber) {
      this.errorMessage = 'Phone Number is required.';
    } else if (!this.additionalDetails.location) {
      this.errorMessage = 'Location is required.';
    } else if (!this.additionalDetails.specialization) {
      this.errorMessage = 'Specialization is required.';
    } else if (!this.additionalDetails.companyName) {
      this.errorMessage = 'Company/College Name is required.';
    } else if (!this.additionalDetails.gender) {
      this.errorMessage = 'Gender is required.';
    } else if (!this.additionalDetails.status) {
      this.errorMessage = 'Status is required.';
    }

    if (this.errorMessage) return; // If there's an error message, stop the update

    // Proceed with profile update
    const { phoneNumber, location, companyName, status, specialization, gender,profilePicture } = this.additionalDetails;

    // Include email as part of the update (it remains unchanged)
    const detailsToUpdate: AdditionalDetails = {
      email: this.additionalDetails.email,  // Include email
      phoneNumber, 
      location, 
      companyName, 
      status, 
      specialization, 
      gender,
      profilePicture
    };

    this.updateProfile(detailsToUpdate);
  }

  // Method to update profile in the database
  updateProfile(detailsToUpdate: AdditionalDetails) {
    const email = this.candidate.email; // Ensure email is not changed
    
    this.candidateService.updateAdditionalDetails(email, detailsToUpdate).subscribe({
      next: () => {
        alert('Profile updated successfully!')
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Failed to update profile. Please try again.';
      },
    });
  }

  
  cancel() {
    this.router.navigate(['candidate/dashboard']);
  }

  // Email validation method
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
