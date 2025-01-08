import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate.model';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule here
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  imports: [FormsModule, CommonModule],
})
export class UpdateProfileComponent implements OnInit {
  candidate: Candidate | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private candidateService: CandidateService, private router: Router) {}

  ngOnInit() {
    const email = localStorage.getItem('candidateEmail');
    if (email) {
      this.candidateService.getCandidateByEmail(email).subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.candidate = response[0]; // Assuming the email is unique
          } else {
            this.errorMessage = 'No candidate data found.';
          }
        },
        error: (error) => {
          console.error('Error fetching candidate data:', error);
          this.errorMessage = 'Failed to load profile data. Try again later.';
        },
      });
    } else {
      this.errorMessage = 'No email found. Please log in again.';
      this.router.navigate(['/login']);
    }
  }

  onUpdate() {
    if (!this.candidate) return;
  
    // Reset error message before validating
    this.errorMessage = '';
  
    // Validate inputs
    if (!this.candidate.username) {
      this.errorMessage = 'Username is required.';
    } else if (!this.candidate.email) {
      this.errorMessage = 'Email is required.';
    } else if (!this.candidate.phoneNumber) {
      this.errorMessage = 'Phone number is required.';
    } else if (!this.candidate.password) {
      this.errorMessage = 'Password is required.';
    } else if (!this.candidate.location) {
      this.errorMessage = 'Location is required.';
    } else if (!this.candidate.specialization) {
      this.errorMessage = 'Specialization is required.';
    } else if (!this.candidate.companyName) {
      this.errorMessage = 'Company/College name is required.';
    } else if (!this.candidate.gender) {
      this.errorMessage = 'Gender is required.';
    } else if (!this.candidate.status) {
      this.errorMessage = 'Status is required.';
    }
  
    // If there's any error, don't proceed with the update
    if (this.errorMessage) return;
  
    // Send updated data to the server
    this.candidateService.updateCandidate(this.candidate).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully!';
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (error) => {
        console.error('Error updating candidate:', error);
        this.errorMessage = 'Failed to update profile. Please try again.';
      },
    });
  }

  // Navigate to the Change Password page
  navigateToChangePassword() {
    this.successMessage = ''; // Clear any success message before navigation
    this.errorMessage = ''; // Clear any error message before navigation
    this.router.navigate(['/change-password']);
  }
}
