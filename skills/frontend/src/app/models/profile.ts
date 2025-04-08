// src/app/models/profile.model.ts

export interface Profile {
    id: number;
    name: string;
    email: string;
    role_id: number;
    role_name: string;
  }
  
  export interface ProfileResponse {
    user: Profile;
  }