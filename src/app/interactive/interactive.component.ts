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
    styleUrls: ['./interactive.component.scss']
  })

export class InteractiveComponent implements OnInit{
    @ViewChild('searchbar') searchbar: ElementRef;
    searchName = '';
    selected='All';
    min=0;
    max=50;


    exp: Exp[] = [
        {value: 100 , viewValue: 'All'},
        {value: '1', viewValue: '1'},
        {value: '2', viewValue: '2'},
        {value: '3', viewValue: '3'},
        {value: '4', viewValue: 'Custom'},
      ];
  employes;
    
    constructor(private router: Router, private employeeService: EmployeeService){
        
    }

    ngOnInit () : void {
      this.employes= this.employeeService.get();
      }


    OnBack = () => {
        this.router.navigate(["/"]);
    }
    addEmp =() => {
        this.router.navigate(["/addemployee"]);
    }
    

    onDetails =(emp) => {
        this.router.navigate(["/details"], { queryParams: { empl: emp.empid , empx : emp.experience }});
    }

    tableView = () => {
        this.router.navigate(["/table-view"]);
    }
   
    
}