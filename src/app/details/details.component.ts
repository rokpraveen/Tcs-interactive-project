import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {InteractiveComponent } from '../interactive/interactive.component';
import {EmployeeService} from '../employee.service';


@Component({
    selector: 'app-detail',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']

})

export class DetailsComponent implements OnInit{
     editz=true;
     text: string = 'Edit';
    emp=0;
    employes;
    empex: number;
   
    
     
   
    constructor(private router: Router,private Activatedroute:ActivatedRoute, private snackbar : MatSnackBar,private employeeService: EmployeeService, private formBuilder: FormBuilder){}
   

    onCancel(){
        this.router.navigate(["/interactive"]);

    }

    onUpdate(employ){
        if(this.text === 'Edit') { 
            this.text = 'Update'
            this.form.enable();
            
          } else {
            this.text = 'Edit'
            this.snackbar.open('Details Updated', 'Done',   { duration: 2000, verticalPosition: 'top'});
            this.router.navigate(["/interactive"]);
      
          this.employeeService.set(employ, this.emp);
       
          }
        }

    

    form: FormGroup;
    ngOnInit(){

        this.Activatedroute.queryParamMap
        .subscribe(params => { 
          this.emp = +params.get('empl')||0;
          this.empex= + params.get('empx')||0;
           
      });

      let employe = this.employeeService.find(this.emp, this.empex);
      console.log(employe);
     
      this.form=this.formBuilder.group({
        Name : this.formBuilder.control({value: employe.Name, disabled : true}, [Validators.required]),
        empid : this.formBuilder.control({value: employe.empid, disabled : true}, [Validators.compose([
            Validators.required,Validators.pattern("[0-9]*")])]),
        experience : this.formBuilder.control({value: employe.experience, disabled: true}, [Validators.required]),
        content : this.formBuilder.control({value : employe.content, disabled: true}, [Validators.required]),
        address: this.formBuilder.control({value : employe.address, disabled: true}),
        url: this.formBuilder.control({value : employe.url, disabled: true})
    
        });

  

    }

    

}