import { Component, OnChanges,Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent  implements OnChanges{


  @Input() postId: number = 1;
  comments: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnChanges(): void {
    if (this.postId) {
      this.apiService.getComments(this.postId).subscribe((data) => {
        this.comments = data;
      });
    }
  }
}