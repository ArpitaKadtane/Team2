import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // Ensure Router and RouterModule are imported
import { HeaderComponent } from '../header/header.component'; // Import HeaderComponent
import { FooterComponent } from '../../../shared/footer/footer.component'; // Import FooterComponent
import { CandidateService } from '../../services/candidate.service';
import { response } from 'express';
import { error } from 'console';
import { SideMenuComponent } from "../../../shared/side-menu/side-menu.component";
import { UpdateProfileComponent } from "../update-profile/update-profile.component";
import { ChangePasswordComponent } from "../change-password/change-password.component";

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.css'] // Corrected here
})
export class CandidateDashboardComponent implements OnInit {
  candidateName: string | null = '';
  activeTab: string = 'enrollCourse'; // Default tab
  userProfile: any;
  // List of courses for each section
  enrollCourses = [
    { name: 'Introduction to Angular', description: 'Learn the basics of Angular framework.' },
    { name: 'Advanced JavaScript', description: 'Master advanced JavaScript concepts.' },
    { name: 'Data Structures & Algorithms', description: 'Improve your problem-solving skills.' },
    { name: 'Web Development with React', description: 'Learn how to build modern web apps with React.' },
    { name: 'Python for Data Science', description: 'Introduction to Python for data science applications.' },
    { name: 'Machine Learning Fundamentals', description: 'Learn the basics of machine learning algorithms.' },
    { name: 'Frontend Web Development', description: 'Build responsive and interactive websites.' },
    { name: 'Back-end Development with Node.js', description: 'Learn server-side development with Node.js.' },
    { name: 'Introduction to DevOps', description: 'Understand the basics of DevOps culture and practices.' },
    { name: 'Cybersecurity Essentials', description: 'Learn the fundamentals of cybersecurity.' }
  ];

  recommendedCourses = [
    { name: 'Deep Learning with TensorFlow', description: 'An introduction to deep learning using TensorFlow.' },
    { name: 'Blockchain Basics', description: 'Learn the fundamentals of blockchain technology.' },
    { name: 'Game Development with Unity', description: 'Develop interactive games with Unity engine.' },
    { name: 'AWS Cloud Practitioner', description: 'Get started with cloud services using AWS.' },
    { name: 'Google Cloud Platform Essentials', description: 'Learn how to use GCP services.' },
    { name: 'Vue.js for Beginners', description: 'Learn the Vue.js framework for frontend development.' },
    { name: 'Ruby on Rails for Web Development', description: 'Build web apps using Ruby on Rails.' },
    { name: 'Big Data Technologies', description: 'An introduction to big data tools like Hadoop and Spark.' },
    { name: 'Mobile App Development with Swift', description: 'Build iOS apps using Swift programming language.' },
    { name: 'React Native for Mobile Development', description: 'Learn how to build cross-platform mobile apps.' }
  ];

  availableCourses = [
    { name: 'PHP for Beginners', description: 'Learn the PHP programming language.' },
    { name: 'Java Programming', description: 'Get started with Java programming language.' },
    { name: 'Data Science with R', description: 'Learn data science concepts using R.' },
    { name: 'UI/UX Design Fundamentals', description: 'Learn how to design user-friendly interfaces.' },
    { name: 'Vue.js Advanced Topics', description: 'Deep dive into advanced Vue.js topics.' },
    { name: 'GraphQL for Beginners', description: 'Learn how to use GraphQL for efficient data fetching.' },
    { name: 'iOS Development with SwiftUI', description: 'Develop modern iOS apps using SwiftUI.' },
    { name: 'Cloud Computing with Azure', description: 'Get started with Microsoft Azure cloud services.' },
    { name: 'Agile Project Management', description: 'Learn Agile project management methodology.' },
    { name: 'Artificial Intelligence Basics', description: 'Understand the basics of AI concepts and applications.' }
  ];

  enrolledCourses = [
    { name: 'Introduction to Web Development', description: 'Start your web development journey.' },
    { name: 'Database Management with MySQL', description: 'Learn how to manage databases with MySQL.' },
    { name: 'React.js for Beginners', description: 'Introduction to the React.js framework.' },
    { name: 'Cloud Security', description: 'Learn how to secure cloud infrastructure.' },
    { name: 'JavaScript Algorithms', description: 'Learn key algorithms and data structures in JavaScript.' },
    { name: 'CSS and HTML for Web Design', description: 'Master CSS and HTML for web design.' },
    { name: 'Data Visualization with D3.js', description: 'Learn to visualize data with D3.js.' },
    { name: 'Node.js Backend Development', description: 'Backend development with Node.js.' },
    { name: 'Docker for Beginners', description: 'Learn containerization with Docker.' },
    { name: 'Automation Testing with Selenium', description: 'Learn to automate testing using Selenium.' }
  ];

  constructor(private router: Router,private candidateservice:CandidateService) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const loggedIn = localStorage.getItem('loggedIn');
      if (loggedIn !== 'true') {
        this.router.navigate(['/login']);
      } else {
        this.candidateservice.getAdditionalDetailsByEmail(localStorage.getItem('candidateEmail')).subscribe(
          (response)=>{
            this.userProfile = response?.profilePicture
          },
          (error)=>{
            console.log(error)
          }
        )
        this.candidateName = localStorage.getItem('candidateName');
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
          this.activeTab = savedTab;  // Set the active tab from localStorage
        }
      }
    } else {
      // Handle the case where localStorage is not available
      console.warn('localStorage is not available.');
    }
  }
  
  
  scrollCourses(direction:any) {
    const container = document.getElementById('coursesContainer');
    const scrollAmount = 300 + 20; // Card width (500px) + gap (20px)
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
  
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
    localStorage.setItem('activeTab', tabName);  // Save the active tab to localStorage
  }
}
