import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-login',
  standalone: true,
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class CandidateLoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private candidateService: CandidateService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.email.trim() && !this.password.trim()) {
      this.errorMessage = 'Both email and password are required.';
      return;
    }
    if (!this.email.trim()) {
      this.errorMessage = 'Email field is required.';
      return;
    }
    if (!this.password.trim()) {
      this.errorMessage = 'Password field is required.';
      return;
    }

    // Call the loginCandidate service and then proceed with the AuthService login
    this.candidateService.loginCandidate(this.email.trim(), this.password.trim()).subscribe({
      next: (response) => {
        if (response.length > 0) {
          // Assuming response contains user data (like username)
          const user = response[0]; // Adjust according to the actual response structure
          
          this.successMessage = '200 (OK) Login successful!!!';
          alert(this.successMessage);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = '401 (Unauthorized) Invalid username or password.';
        }
      },
      error: (error) => {
        console.error('API Error:', error);
        this.errorMessage = 'Server error. Please try again later.';
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
