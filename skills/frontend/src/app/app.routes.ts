import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

import { JobSeekerComponent } from './components/job-seeker/job-seeker.component';
import { EmployerComponent } from './components/employer/employer.component';
import { JobseekerProfileComponent } from './components/jobseeker-profile/jobseeker-profile.component';


export const routes: Routes = [

    { path: '', component: HomeComponent },

    { path: 'register', component: RegisterComponent },

    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'employer', component: EmployerComponent },
    { path: 'jobseeker', component: JobSeekerComponent },
    { path: 'jobseeker-profile', component: JobseekerProfileComponent },
    


    
   
];


console.log('Routes Configured:', routes);