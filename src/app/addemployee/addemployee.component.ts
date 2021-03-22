import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { EmployeeService } from '/Users/praveenkumar/myNewAngular/src/app/employee.service';

@Component({
    selector: 'add-emp', 
    templateUrl: './addemployee.component.html',
    styleUrls: ['./addemployee.component.scss']
  })

  export class AddemployeeComponent implements OnInit{
    constructor(private router: Router, private employeeService: EmployeeService, private formBuilder: FormBuilder){}


  form: FormGroup;
  ngOnInit () {
    this.form=this.formBuilder.group({
    Name : this.formBuilder.control('', [Validators.required]),
    empid : this.formBuilder.control('', [Validators.compose([
        Validators.required,Validators.pattern("[0-9]*")])]),
    experience : this.formBuilder.control('', [Validators.required]),
    content : this.formBuilder.control(''),
    url: this.formBuilder.control('')

    });
  }


    onSubmit = (val) => {
      

      this.employeeService.add(val);
        this.router.navigate(["/interactive"]);
    }

  
  }