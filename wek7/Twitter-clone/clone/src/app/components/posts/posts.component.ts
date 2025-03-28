import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from "../comments/comments.component";

@Component({
  selector: 'app-posts',
  imports: [FormsModule, CommonModule, CommentsComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnChanges {
  @Input() userId: number = 1;
  posts: any[] = [];
  selectedPostId: number | null = null;
toggleComments: any;
  constructor(private apiService: ApiService){}

  ngOnChanges(): void {
    if (this.userId) {
      this.apiService.getPosts(this.userId).subscribe((data) => {
        this.posts = data;
        if (this.posts.length > 0) {
          this.selectedPostId = this.posts[0].id;
        }
      });
    }
  }
}

