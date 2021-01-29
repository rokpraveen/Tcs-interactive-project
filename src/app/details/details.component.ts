import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {InteractiveComponent } from '../interactive/interactive.component';
import {EmployeeService} from '../employee.service';


@Component({
    selector: 'app-detail',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']

})

export class DetailsComponent implements OnInit{
     one=true;
     two=true;
     three=true;
     four=true;
     five=true;
   
    
     
   
    constructor(private router: Router, private snackbar : MatSnackBar){}
   

    onCancel(){
        this.router.navigate(["/interactive"]);

    }

    onUpdate(){
        this.snackbar.open('Details Updated', 'Done',   { duration: 2000, verticalPosition: 'top'});
        this.router.navigate(["/interactive"]);
    }
    ngOnInit(){

    }

    

}
