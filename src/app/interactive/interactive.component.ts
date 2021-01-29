import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; 
import { EmployeeService } from '../employee.service';

@Component({
    selector: 'tcs-root', 
    templateUrl: './interactive.component.html',
    styleUrls: ['./interactive.component.css']
  })

export class InteractiveComponent implements OnInit{
    @ViewChild('searchbar') searchbar: ElementRef;
    searchText = '';
    selected='2';
    min=0;
    max=50;
    employes;
    
    constructor(private router: Router, private employeeService: EmployeeService){
        
    }

    ngOnInit(){
        this.employes= this.employeeService.get();
    }


    OnBack(){
        this.router.navigate(["/"]);
    }
    addEmp(){
        this.router.navigate(["/addemployee"]);
    }
    

    onDetails(emp){
        console.log(emp);
        this.router.navigate(["/details", emp])
    }
   
    
}