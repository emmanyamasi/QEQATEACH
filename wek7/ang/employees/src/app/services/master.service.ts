import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }
  getParentDept(){
     return this.http.get<IApiResponse>("https://projectapi.gerasim.in/api/EmployeeManagment/GetParentDepartment")

  }

}
