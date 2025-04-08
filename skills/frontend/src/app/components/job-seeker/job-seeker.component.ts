import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile';
import { ProfilesService } from '../../services/profiles.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-seeker',
  imports: [FormsModule, CommonModule],
  templateUrl: './job-seeker.component.html',
  styleUrl: './job-seeker.component.css'
})
export class JobSeekerComponent implements OnInit {


  showProfileDetails = false;
    userProfile: Profile | null = null;
    errorMessage = '';
  
    constructor(private profilesService: ProfilesService) { }
  
  
    ngOnInit(): void {
  
    }



    toggleProfileDetails() {
      this.showProfileDetails = !this.showProfileDetails;
      if (this.showProfileDetails && !this.userProfile) {
        this.loadJobSeekerProfile();
  
      }
    }
  
    loadJobSeekerProfile() {
  
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
  
  
  
  
  
  
  
