import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { BreadcrumbDataService } from './breadcrumb-data.service';


@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public breadcrumbDataService : BreadcrumbDataService){
    console.log(this.breadcrumbDataService.breadcrumbData);
  }
  name(name: any) {
    
    throw new Error('Method not implemented.');
  }
  
 


}