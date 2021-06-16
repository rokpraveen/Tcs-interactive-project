import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {InteractiveComponent } from '../interactive/interactive.component';
import {EmployeeService} from '../employee.service';
import { Button } from 'selenium-webdriver';
import { BreadcrumbData } from '../core.model';
import { breadcrumConstants } from '../breadcrum-constants';
import { BreadcrumbDataService } from '../breadcrumb-data.service';



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
    bool: boolean;
    withoutSaving : boolean;
   
    
     
   
    constructor(
        private router: Router,
        private Activatedroute:ActivatedRoute, 
        private snackbar : MatSnackBar,
        private employeeService: EmployeeService, 
        private formBuilder: FormBuilder,
        private breadcrumbDataService : BreadcrumbDataService){
            
        this.breadcrumbManupilation();
        }
   

    onCancel(){
        this.router.navigate(["/interactive"]);

    }

    onUpdate(employ){
        if(this.text === 'Edit') { 
            this.text = 'Update'
            this.form.enable();
            if(!this.form.touched){
                this.bool=true;
            }
            
          } else {
            this.text = 'Edit'
            this.breadcrumbDataService.editCount=0;
            this.snackbar.open('Details Updated', 'Done',   { duration: 2000, verticalPosition: 'top'});
            this.router.navigate(["/interactive"]);
      
          this.employeeService.set(employ, this.emp);
       
          }
        }

    

    form: FormGroup;
    ngOnInit(){
        this.breadcrumbDataService.editCount=0;
        this.withoutSaving=false;
        
        console.log("ngOnit");
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
    breadcrumbManupilation = () => {
        let breadcrumbRemittance : BreadcrumbData;
        breadcrumbRemittance= {
          url : breadcrumConstants.BREADCRUM_INTERACTIVE.links.details,
          name: breadcrumConstants.BREADCRUM_INTERACTIVE.name.details
        };
        this.breadcrumbDataService.breadcrumbData.push(breadcrumbRemittance);
        console.log(this.breadcrumbDataService.breadcrumbData);
      }
    checkButtonDisable = () => {
        if(!this.form.dirty && (this.text === 'Update')){
            this.breadcrumbDataService.editCount++;
            this.withoutSaving=false;
            return 'disableCls';
        }
        else { 
            this.withoutSaving=true;
            return 'enableCls'
        }
    }

}