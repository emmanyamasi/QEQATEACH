import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { LibrarianComponent } from './components/librarian/librarian.component';
import {  BorrowersComponent } from './components/borrower/borrower.component';


export const routes: Routes = [

    { path: '', component: HomeComponent },

    { path: 'register', component: RegisterComponent },

    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'librarian', component:  LibrarianComponent },
    { path: 'borrower', component:  BorrowersComponent }
   
];


console.log('Routes Configured:', routes);