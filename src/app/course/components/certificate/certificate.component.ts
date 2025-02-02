import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  courseId: string = '';
  courseName: string = '';
  fullName: string = '';
  currentDate: string = new Date().toLocaleDateString();
  loggedInUserEmail: string = 'bhanusingh09@gmail.com'; // Get this from authentication service

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('courseId') || '';

    // Fetch logged-in user details
    this.http.get<any[]>('http://localhost:3000/candidates').subscribe(users => {
      const user = users.find(u => u.email === this.loggedInUserEmail);
      if (user) {
        this.fullName = user.fullName;
      }
    });

    // Fetch course details
    this.http.get<any[]>('http://localhost:3000/courses').subscribe(courses => {
      const course = courses.find(c => c.id === this.courseId);
      if (course) {
        this.courseName = course.name;
      }
    });
  }

  downloadPDF(): void {
    const element = document.getElementById('certificate');
    if (!element) return;

    // Hide buttons before capturing
    const buttons = document.querySelector('.button-container') as HTMLElement;
    if (buttons) buttons.style.display = 'none';

    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const doc = new jsPDF('landscape');
      doc.addImage(imgData, 'JPEG', 0, 0, 297, 210);
      doc.save(`${this.fullName}_certificate.pdf`);

      // Show buttons again
      if (buttons) buttons.style.display = 'flex';
    });
  }

  downloadJPG(): void {
    const element = document.getElementById('certificate');
    if (!element) return;

    // Hide buttons before capturing
    const buttons = document.querySelector('.button-container') as HTMLElement;
    if (buttons) buttons.style.display = 'none';

    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${this.fullName}_certificate.jpg`;
      link.click();

      // Show buttons again
      if (buttons) buttons.style.display = 'flex';
    });
  }
}
