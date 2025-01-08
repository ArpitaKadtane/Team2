import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss'
})
export class CandidateComponent {
  private auhtService = inject(AuthService);
  private router = inject(Router);
  logout() {
    this.auhtService.logout();
    this.router.navigate(['login']);
  }
}
