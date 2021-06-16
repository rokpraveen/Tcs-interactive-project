import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { breadcrumConstants } from '../breadcrum-constants';
import { BreadcrumbData } from '../core.model';
import { EmployeeService } from '../employee.service';
import { BreadcrumbDataService } from '../breadcrumb-data.service';

@Component({
    selector: 'add-emp', 
    templateUrl: './addemployee.component.html',
    styleUrls: ['./addemployee.component.scss']
  })

  export class AddemployeeComponent implements OnInit{
    constructor(private router: Router, private employeeService: EmployeeService, private formBuilder: FormBuilder,
      private breadcrumbDataService : BreadcrumbDataService){
    this.breadcrumbManupilation();
      }


  form: FormGroup;
  ngOnInit () {
    this.initializeForms();
  }
  initializeForms = () => {
    this.form=this.formBuilder.group({
      Name : this.formBuilder.control('', [Validators.required]),
      empid : this.formBuilder.control('', [Validators.compose([
          Validators.required,Validators.pattern("[0-9]*")])]),
      experience : this.formBuilder.control('', [Validators.required]),
      content : this.formBuilder.control(''),
      url: this.formBuilder.control('')
  
      });
  }
  breadcrumbManupilation = () => {
    let breadcrumbRemittance : BreadcrumbData;
    breadcrumbRemittance= {
      url : breadcrumConstants.BREADCRUM_INTERACTIVE.links.addemployee,
      name: breadcrumConstants.BREADCRUM_INTERACTIVE.name.addemployee,
    };
    this.breadcrumbDataService.breadcrumbData.push(breadcrumbRemittance);
    console.log(this.breadcrumbDataService.breadcrumbData)
    
  }


    onSubmit = (val) => {
      

      this.employeeService.add(val);
        this.router.navigate(["/interactive"]);
    }

  
  }