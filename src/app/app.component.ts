import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {SideMenuComponent} from './shared/side-menu/side-menu.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, FormsModule, SideMenuComponent, HeaderComponent, FooterComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Skillhive Learning Nexus';

  isMenuVisible: boolean = false;

  onMenuToggle() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
