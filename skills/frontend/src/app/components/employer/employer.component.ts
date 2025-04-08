import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../models/profile';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-employer',
  imports: [FormsModule, CommonModule],
  templateUrl: './employer.component.html',
  styleUrl: './employer.component.css'
})
export class EmployerComponent implements OnInit {

  showProfileDetails = false;
  userProfile: Profile | null = null;
  errorMessage = '';

  constructor(private profilesService: ProfilesService) { }


  ngOnInit(): void {

  }


  toggleProfileDetails() {
    this.showProfileDetails = !this.showProfileDetails;
    if (this.showProfileDetails && !this.userProfile) {
      this.loadEmployerProfile();

    }
  }

  loadEmployerProfile() {

    this.profilesService.getUserProfile().subscribe({
      next: (response) => {
        this.userProfile = response.user;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error fetching admin profile', error);
        this.errorMessage = 'Failed to load admin profile.';
        this.userProfile = null;
      }
    });
  }
}






