import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.css']
})
export class EditProfileModalComponent {
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  profileData = {
    name: '',
    title: '',
    location: '',
    about: '',
    totalCourses: 0,
    experience: 0,
    graduated: '',
    languages: '',
    gmail: '',  // ✅ Add this
    linkedin: '' // ✅ Add this
};

  handleSave() {
    this.save.emit(this.profileData);
  }

  handleClose() {
    this.close.emit();
  }
}
