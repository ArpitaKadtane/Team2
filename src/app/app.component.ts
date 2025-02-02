import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { HeaderComponent } from "./candidates/components/header/header.component";
import { CandidateComponent } from "./candidates/components/candidate/candidate.component";
import { NewsletterComponent } from "./instructor/components/newsletter/newsletter.component";
import { NavigationComponent } from "./instructor/components/navigation/navigation.component";
import { FooterComponent } from "./candidates/components/footer/footer.component";
import { AssessmentComponent } from "./assessmentgrading/components/instructor/assessment/assessment.component";
import { AssessmentDashComponent } from "./assessmentgrading/components/candidate/assessment-dash/assessment-dash.component";  // <-- Import FormsModule here

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, SideMenuComponent, HeaderComponent, CandidateComponent, NewsletterComponent, NavigationComponent, FooterComponent, AssessmentComponent, AssessmentDashComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Skillhive Learning Nexus';
}

