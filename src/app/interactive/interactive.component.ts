import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; 
import { EmployeeService } from '../employee.service';

interface Exp {
    value: any;
    viewValue: string;
  }

@Component({
    selector: 'tcs-root', 
    templateUrl: './interactive.component.html',
    styleUrls: ['./interactive.component.css']
  })

export class InteractiveComponent implements OnInit{
    @ViewChild('searchbar') searchbar: ElementRef;
    searchText = '';
    selected='All';
    min=0;
    max=50;
    employes;

    exp: Exp[] = [
        {value: 100 , viewValue: 'All'},
        {value: '1', viewValue: '1'},
        {value: '2', viewValue: '2'},
        {value: '3', viewValue: '3'},
        {value: '4', viewValue: 'Custom'},
      ];
    
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
        this.router.navigate(["/details"], { queryParams: { empl: emp.empid } });
    }
   
    
}