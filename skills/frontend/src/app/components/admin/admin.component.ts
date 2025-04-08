import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showProfileDetails =false;
  userProfile:Profile|null =null;
  errorMessage ='';





  constructor(private profilesService:ProfilesService){}


  ngOnInit(): void {
    
  }

  toggleProfileDetails(){
    this.showProfileDetails = !this.showProfileDetails;
    if (this.showProfileDetails && !this.userProfile) {
      this.loadAdminProfile();

  }
}

loadAdminProfile(){

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