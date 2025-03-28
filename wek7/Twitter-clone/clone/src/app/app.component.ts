import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsComponent } from "./components/posts/posts.component";
import { UserSelectComponent } from "./components/user-select/user-select.component";

@Component({
  selector: 'app-root',
  imports: [ PostsComponent, UserSelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedUserId: number = 1; // Initialize with user ID 1
}
