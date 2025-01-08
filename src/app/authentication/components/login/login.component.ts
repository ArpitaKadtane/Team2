import { Component,signal } from '@angular/core';
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
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule, 
    MatIconModule, MatSelectModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private toastr: ToastrService, private authService:AuthService, private router:Router ){}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  hide = signal(true);
  hideClick(event: Event) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  OnFormSubmit() {
    const { email, password, user } = this.loginForm.value;
    this.authService.getUserDetails(email, password, user).subscribe({
      next: (response) => {
        if (response.length >= 1) {
          if (user == "admin") {
            this.router.navigate(['admin']);
          } else if (user == "candidate") {
            this.router.navigate(['candidate']);
          } else {
            this.router.navigate(['instructor']);
          }
        } else {
          this.toastr.error('Email or Password is wrong','Wrong Credentials');
        }
      },
      error: (err) => {
        this.toastr.error('Something went wrong','Error');
      },
    });
  }
}
