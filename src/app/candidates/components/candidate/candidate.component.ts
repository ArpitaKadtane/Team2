import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../shared/footer/footer.component";
import { SideMenuComponent } from "../../../shared/side-menu/side-menu.component";
import { HeaderComponent } from "../header/header.component";
import { CandidateService } from '../../services/candidate.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { CandidateDashboardComponent } from "../candidate-dashboard/candidate-dashboard.component";
import { UpdateProfileComponent } from "../update-profile/update-profile.component";
import { ChangePasswordComponent } from "../change-password/change-password.component";

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [FooterComponent, SideMenuComponent, HeaderComponent, RouterModule, NgIf, CandidateDashboardComponent, UpdateProfileComponent, ChangePasswordComponent],
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.css'
})
export class CandidateComponent implements OnInit{

    
  constructor(private router: Router,private candidateservice:CandidateService) {}
  ngOnInit() {

  }
  isMenuVisible: boolean = false;

  onMenuToggle() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
