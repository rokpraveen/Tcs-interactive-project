import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogInput } from '../core.model';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, AfterViewInit {
    @Input() formInput : ConfirmDialogInput;
    showCancelButton: boolean;
    overrideToggle = false;
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>
    ){}

    ngOnInit(){
        if(this.formInput.btnCancelText){
            this.showCancelButton = true;
        }
        else{
            this.showCancelButton = false;
        }
    }

    ngAfterViewInit() {
        if(this.formInput.message){
            const element: HTMLElement = document.getElementById('confirmMsg') as HTMLElement;
            element.innerHTML = this.formInput.message;
        }
    }

    okClick(){
        this.dialogRef.close(true);
    }

    cancelClick() {
        this.dialogRef.close(false);
    }

}