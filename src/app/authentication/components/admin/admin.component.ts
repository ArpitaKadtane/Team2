import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  private auhtService = inject(AuthService);
  private router = inject(Router);
  logout() {
    this.auhtService.logout();
    this.router.navigate(['login']);
  }
}
