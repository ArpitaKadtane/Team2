import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar2',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar2.component.html',
  styleUrl: './nav-bar2.component.css'
})
export class NavBar2Component {
  subscribe() {
    throw new Error('Method not implemented.');
    }
    email: any;
      toggleMenu() {
        const navList = document.querySelector('.nav-links');
        if (navList) {
          navList.classList.toggle('active');
        }
      }
}
