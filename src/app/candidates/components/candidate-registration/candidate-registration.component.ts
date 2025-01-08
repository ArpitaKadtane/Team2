import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Candidate } from '../../models/candidate.model';  // Import the Candidate interface
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-registration',
  standalone: true,
  templateUrl: './candidate-registration.component.html',
  styleUrls: ['./candidate-registration.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class CandidateRegistrationComponent {
  candidate: Candidate = {  // Declare the candidate object with type Candidate
    id: 0,  // Initialize id with a default value
    username: '',
    email: '',
    phoneNumber: '',
    location: '',
    specialization: '',
    companyName: '',
    gender: '',
    status: '',
    password: ''
  };

  confirmPassword: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private candidateService: CandidateService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    this.errorMessage = '';
    if (!this.candidate.username) {
      this.errorMessage = 'Username is required.';
      return;
    }
    if (!this.candidate.email) {
      this.errorMessage = 'Email is required.';
      return;
    }
    if (!this.candidate.phoneNumber) {
      this.errorMessage = 'Phone Number is required.';
      return;
    }
    if (!this.candidate.location) {
      this.errorMessage = 'Location is required.';
      return;
    }
    if (!this.candidate.specialization) {
      this.errorMessage = 'Specialization is required.';
      return;
    }
    if (!this.candidate.companyName) {
      this.errorMessage = 'Company/College Name is required.';
      return;
    }
    if (!this.candidate.gender) {
      this.errorMessage = 'Gender is required.';
      return;
    }
    if (!this.candidate.status) {
      this.errorMessage = 'Status is required.';
      return;
    }
    if (!this.candidate.password) {
      this.errorMessage = 'Password is required.';
      return;
    }
    if (this.candidate.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }
    if (this.candidate.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.candidate.email)) {
      this.errorMessage = 'Enter a valid email address.';
      return;
    }
    const passwordStrengthPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;,.<>?/~`-]).{8,}$/;
    if (!passwordStrengthPattern.test(this.candidate.password)) {
      this.errorMessage = 'Password must contain a mix of letters, numbers, and symbols.';
      return;
    }
    this.candidateService.registerCandidate(this.candidate).subscribe({
      next: () => {
        alert('Registration successful!!!');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error during registration:', err);
        this.errorMessage = 'Failed to register. Try again.';
      }
    });
  }
}
