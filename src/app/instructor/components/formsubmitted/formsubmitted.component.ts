import { Component } from '@angular/core';

@Component({
  selector: 'app-formsubmitted',
  standalone: true,
  imports: [],
  templateUrl: './formsubmitted.component.html',
  styleUrl: './formsubmitted.component.css'
})
export class FormsubmittedComponent {
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
