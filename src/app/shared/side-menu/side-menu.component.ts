import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})

export class SideMenuComponent {

  constructor(private router:Router){

  }
  @Input() isVisible: boolean = false;

  isActive(route: string): boolean {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return this.router.url === route;
  }
 
  logout(): void {
    if (confirm('Are you sure to logout?')) {
      localStorage.removeItem('candidateName');
      localStorage.removeItem('candidateEmail');
      localStorage.removeItem('otherUserData');
      localStorage.removeItem('loggedIn');
      this.router.navigate(['/login']);
    }
  }
}
