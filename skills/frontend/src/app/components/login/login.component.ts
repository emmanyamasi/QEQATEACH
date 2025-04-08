import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        
        if (response.access_token) {
          // ✅ Store tokens separately
          localStorage.setItem('access_token', response.access_token.accessToken);
          localStorage.setItem('refresh_token', response.access_token.refreshToken);

          // ✅ Store user details
          localStorage.setItem('user_id', response.user.id.toString());
          localStorage.setItem('role_id', response.user.role_id.toString());

          // ✅ Redirect based on role
          switch (response.user.role_id) {
            case 1:
              this.router.navigate(['/admin']);
              break;
            case 2:
              this.router.navigate(['/employer']);
              break;
            case 3:
              this.router.navigate(['/jobseeker']);
              break;
            default:
              this.router.navigate(['/']);
          }
        } else {
          console.error('No access token received.');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      }
    });
  }
}
