import { NgClass, NgFor } from '@angular/common'; ///; // Import directives for conditional classes and looping
import { Component } from '@angular/core'; //// Import Component decorator to define an Angular component
import { FormsModule } from '@angular/forms'; // Import FormsModule to enable two-way data binding with ngModel
import { RouterOutlet } from '@angular/router';// Import RouterOutlet to enable page navigation


//This defines the structure of each task item.
export interface TodoItem{
  id: number;
  task: string;
  completed :boolean

}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,NgFor,NgClass],/// Required modules for routing, forms, and loops
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  todoList : TodoItem []=[]; // Array to store the tasks
  newTask:string =''  // Variable to hold the input value


  addTask():void{
    if(this.newTask.trim() !== ''){  // Check if input is not empty
      const newTodoItem: TodoItem ={  
        // Generate a unique ID using timestamp
        id : Date.now(),
        task:this.newTask,// Store the entered task
        completed:false // Default task status as 'not completed'



      }
      this.todoList.push(newTodoItem) // Add new task to the list
      this.newTask ='' // Clear input field after adding task
     

    }
  }

toggleCompleted(index:number):void{
  console.log(index) // Log the index of the clicked task
  this.todoList[index].completed =!this.todoList[index].completed // Toggle completion status

  console.log(this.todoList); // Log updated todoList
 
}

deleteTask(id:number):void{
  this.todoList =this.todoList.filter(item =>item.id !==id) // Remove the task with matching ID
  console.log(this.todoList); 
}



}
