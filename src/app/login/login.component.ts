import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators} from '@angular/forms';

import { Router } from '@angular/router';

@Component({
    selector: 'login-root', 
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })

  export class LoginComponent implements OnInit{
    constructor(private router: Router){}


  form: FormGroup;
  ngOnInit(){
    this.form=new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.compose([
      Validators.required, Validators.minLength(8),Validators.pattern("^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$")])])
    });
  }
  
    hide = true;
  

  
    onSubmit(val){
      console.log(val);

      this.router.navigate(["/interactive"]);
  
    }
  
  }