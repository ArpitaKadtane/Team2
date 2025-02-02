import { Component } from '@angular/core';
import { BeforApplyBannerComponent } from "../befor-apply-banner/befor-apply-banner.component";

@Component({
  selector: 'app-formsubmitted',
  standalone: true,
  imports: [BeforApplyBannerComponent],
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
