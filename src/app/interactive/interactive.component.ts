import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; 
import { BreadcrumbData } from '../core.model';
import { breadcrumConstants } from '../breadcrum-constants';
import { BreadcrumbDataService } from '../breadcrumb-data.service';
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
    
    constructor(
      private router: Router, 
      private employeeService: EmployeeService,
      private breadcrumbDataService : BreadcrumbDataService){
        
    }

    ngOnInit () : void {
      this.employes= this.employeeService.get();
      this.breadcrumbDataService.backViaBreadcrumb=false;
      this.breadcrumbManupilation();

      }

      breadcrumbManupilation = () => {
        this.breadcrumbDataService.breadcrumbData = [];
        let breadcrumbRemittance : BreadcrumbData;
        breadcrumbRemittance= {
          url : breadcrumConstants.BREADCRUM_INTERACTIVE.links.interactive,
          name: breadcrumConstants.BREADCRUM_INTERACTIVE.name.interactive,
        };
        this.breadcrumbDataService.breadcrumbData.push(breadcrumbRemittance);
        
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