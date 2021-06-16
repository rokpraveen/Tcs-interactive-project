import { Injectable } from '@angular/core';
import { BreadcrumbData, ConfirmDialogInput } from './core.model';
import { breadcrumConstants } from './breadcrum-constants';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbDataService{
    private dialogRef : MatDialogRef<ConfirmDialogComponent>;

    constructor(private dialog : MatDialog){}
    notTOCallOnInit : boolean;
    breadcrumbData : BreadcrumbData[] = [];
    tableFilterData : any =[];
    backViaBreadcrumb: boolean;
    editCount: number;

    breadcrumbHomeInteractiveManupilation = () => {
        this.breadcrumbData = [];
        let breadcrumbRemittance : BreadcrumbData;
        breadcrumbRemittance = {
            url : breadcrumConstants.BREADCRUM_INTERACTIVE.links.interactive,
            name : breadcrumConstants.BREADCRUM_INTERACTIVE.name.interactive
        };
        this.breadcrumbData.push(breadcrumbRemittance);
    }
    public matConfirmDialog(confirmDialogInput : ConfirmDialogInput): Promise<any> {
        const dialogData = {
            disableClose : true,
            panelClass : 'custom-dialog-container',
            width: confirmDialogInput.popupWidth ? confirmDialogInput.popupWidth : '45%',
            height: confirmDialogInput.popupHeight ? confirmDialogInput.popupHeight: '45%'
        };
        const promise = new Promise((resolve, reject) => {
            this.dialogRef = this.dialog.open(ConfirmDialogComponent, dialogData);
            this.dialogRef.componentInstance.formInput = confirmDialogInput;
            this.dialogRef.afterClosed().subscribe(result =>{
                if(result === undefined){
                    console.log("rejected");
                    reject('Reject');
                }
                else {
                    resolve(result);
                }
            });
        });
        return promise;
    }
    
}
