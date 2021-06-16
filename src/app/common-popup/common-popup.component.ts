import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableViewComponent } from '../table-view/table-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component ({
    selector: 'app-common-popup',
    templateUrl: 'common-popup.component.html',
    styleUrls: ['common-popup.component.scss']
})
export class CommonPopupComponent implements OnInit {
    mockData : any;
    submitIsTrue: boolean;
    userForm: FormGroup;
    refreshFlag: boolean;
    formErrorMsgArr: any[];
    addEnabled: boolean;
    users: FormArray;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, private fb : FormBuilder, 
        private snackbar : MatSnackBar, public dialogRef: MatDialogRef<TableViewComponent>
    ){}

    ngOnInit() {
        this.submitIsTrue= false;
        this.addEnabled= false;
        this.refreshFlag=false;
        this.mockData = this.data.mockData;
        this.userForm = this.fb.group({
            users: this.fb.array([]),
            street: this.fb.control('',
                Validators.required),
            city: this.fb.control('',
                Validators.required),
            state: this.fb.control('',
                Validators.required)
          })
        }
      
        createUserForm(){
          return this.fb.group({
            street: '',
            city: '',
            state: ''
          })
        }
      
        adduser(){
            this.addEnabled=true;
          this.users = this.userForm.get('users') as FormArray;
          this.users.push(this.createUserForm());
          this.submitIsTrue=true;
        }
    //     this.viewFormData();
    // }
    // viewFormData = () => {
    //     this.refreshFlag= false;
    //     this.createFormGroupArray();
    //     this.formValueChanges();
    // }

    // createFormGroupArray() {
    //     this.newForm = this.fb.group({
    //         rows: this.fb.array([])
    //     });
    // }
    // get rowsArray(): FormArray {
    //     return this.newForm.get('rows') as FormArray;
    // }
    //  formValueChanges() {
    //      this.newForm= this.fb.group({
    //         street : this.fb.control('', [Validators.compose([
    //             Validators.required,Validators.pattern("/^-?[0-9]{0,9}[a-zA-Z](\.[0-9]{1,2})?$/")])]),
    //         city : this.fb.control('', [Validators.compose([
    //                 Validators.required,Validators.pattern("/^-?[0-9]{0,9}[a-zA-Z](\.[0-9]{1,2})?$/")])]),
    //         state : this.fb.control('', [Validators.compose([
    //                     Validators.required,Validators.pattern("/^-?[0-9]{0,9}[a-zA-Z](\.[0-9]{1,2})?$/")])])
    //      })

    //     //  this.newForm.valueChanges.subscribe(val => {
    //     //      for(const control of this.rowsArray.controls){
    //     //          const street = control.get('street').value;
    //     //          const city = control.get('city').value;
    //     //          const state = control.get('state').value;
    //     //          if(street && !street.match(/^-?[0-9]{0,9}[a-zA-Z](\.[0-9]{1,2})?$/)){
    //     //              control.get('street').setErrors({error : true});
    //     //          }
    //     //          else if(city && !city.match(/^-?[0-9]{0,9}[a-zA-Z](\.[0-9]{1,2})?$/)){
    //     //              control.get('city').setErrors({error: true});
    //     //          }
    //     //          else if(state && !state.match(/^-?[0-9]{0,9}[a-zA-Z](\.[0-9]{1,2})?$/)){
    //     //             control.get('state').setErrors({error: true});
    //     //         }
    //     //      }
    //     //  });
    //  }
    //  addRow(){
    //      this.addEnabled= true;
    //      this.rowsArray.push(this.createRowGroup('new'));
    //      console.log(this.rowsArray);
         
    //  }
     
    //  createRowGroup = (callingType) => {
    //      if(callingType === 'new'){
    //          return this.fb.group({
    //              street: '',
    //              city: '',
    //              state: ''
    //          });
    //      }
    //  }
    closePopup(){
        this.dialogRef.close();
    }
    submitPopup(){
        this.snackbar.open('Data Saved Successfully.....', 'Done',   { duration: 2000, verticalPosition: 'top', panelClass: ['snackbarCls']});
        this.dialogRef.close();
    }
}