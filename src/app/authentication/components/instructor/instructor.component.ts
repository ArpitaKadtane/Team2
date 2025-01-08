import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.scss'
})
export class InstructorComponent {
  private auhtService = inject(AuthService);
  private router = inject(Router);
  logout() {
    this.auhtService.logout();
    this.router.navigate(['login']);
  }
}
