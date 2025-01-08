import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './candidate-dashboard.component.html',
  styleUrl: './candidate-dashboard.component.css'
})
export class CandidateDashboardComponent {
  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      console.log('Selected file:', this.selectedFile.name);
    }
  }

  onUpload(): void {
    if (this.selectedFile) {
      console.log('Uploading file:', this.selectedFile.name);
    } else {
      console.log('No file selected!');
    }
  }
}
