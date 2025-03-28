import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-select',
  imports: [FormsModule,CommonModule],
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {
  @Input() selectedUserId: number = 1;  // Default selected user
  @Output() ngModelChange = new EventEmitter<number>(); // Emits changes
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.users = data;
      });
  }

  onUserChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedUserId = Number(target.value); // Convert to number
    this.ngModelChange.emit(this.selectedUserId); // Emit updated value
  }
}
