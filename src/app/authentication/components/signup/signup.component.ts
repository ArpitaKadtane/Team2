import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RegisterPostData } from '../../../interfaces/auth';
import { confirmPasswordValidator } from '../../../shared/confirm-password.validator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule, MatIconModule, 
    MatSelectModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  constructor(private toastr: ToastrService, private registerService: AuthService, private authService: AuthService) { }
  
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: confirmPasswordValidator });
  }

  OnFormSubmit() {
    const userData = { ...this.signupForm.value };
    delete userData.confirmPassword;
    const { email} = this.signupForm.value;
    this.authService.userAlreadyPresent(email, 'candidate').subscribe({
      next: (response) => {
        if (response.length >= 1) {
          this.toastr.warning('Account with this email already exists', 'User already exists');
        } else {
          this.registerService.registerUser(userData as RegisterPostData).subscribe({
            next: (response) => {
              this.toastr.success('Registered successfully', 'Success');
            },
            error: (err) => {
              this.toastr.error('Something went wrong', 'Error');
            },
          });
        }
      },
      error: (err) => {
        this.toastr.error('Something went wrong', 'Error');
      },
    });
  }

  passwordClick(event: Event) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  confirmPasswordClick(event: Event) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }
}

