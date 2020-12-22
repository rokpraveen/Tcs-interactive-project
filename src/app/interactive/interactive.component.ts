import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import employeeData from '..//employee.json';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
  
interface Employee {
    Name: String;
    empid: String;
    content: String;
    url: String;
}

@Component({
    selector: 'tcs-root', 
    templateUrl: './interactive.component.html',
    styleUrls: ['./interactive.component.css']
  })

export class InteractiveComponent{
    
    constructor(private router: Router){}


    OnBack(){
        this.router.navigate(["/"]);
    }
    employes: Employee[] = employeeData;

    onDetails(emp){
        console.log(emp);
        this.router.navigate(["/details", emp])
    }
}