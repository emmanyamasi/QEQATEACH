import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = { email: '', password: '' };
  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
  
        const roleId = response.user?.role_id; // Use role_id instead of role_name
  
        if (roleId === 1) {
          this.router.navigate(['/admin']);
        } else if (roleId === 2) {
          this.router.navigate(['/librarian']);
        } else if (roleId === 3) {
          this.router.navigate(['/user-dashboard']);
        } else {
          this.router.navigate(['/']); // Redirect to home page or login
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    });
  }
  
}