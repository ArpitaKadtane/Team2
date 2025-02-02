import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  email: string = '';

  subscribe(): void {
    if (!this.email || this.email.indexOf('@') === -1) {
      alert('Please enter a valid email address.');
    } else {
      alert('Thank you for subscribing!');
    }
  }
}
