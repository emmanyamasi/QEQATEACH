import { Component, inject, OnInit } from '@angular/core';

import { MasterService } from '../../services/master.service';
import { IApiResponse, IParentDept } from '../../model/Employee';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'] // corrected styleUrl to styleUrls
})
export class EmployeeComponent implements OnInit {

  parentDeptList:IParentDept[]=[]

  masterService = inject(MasterService);

  ngOnInit(): void {
    console.log('EmployeeComponent initialized');
    this.getParentDeptList();
    
  }

  getParentDeptList(){
    console.log('Getting parent department list');
    this.masterService.getParentDept().subscribe((res: IApiResponse)=>{
      console.log('Parent department list received', res);
      this.parentDeptList = res.data;
      console.log('Parent department list updated', this.parentDeptList);
    }, (error) => {
      console.error('Error getting parent department list', error);
    });

  }

}