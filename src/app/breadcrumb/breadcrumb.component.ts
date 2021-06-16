import {Component, OnInit} from '@angular/core';
import { BreadcrumbDataService } from '../breadcrumb-data.service';
import { ActivatedRoute, Router} from '@angular/router';
import { BreadcrumbData, ConfirmDialogInput} from '../core.model';
import {Location } from '@angular/common';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})

export class BreadcrumbComponent implements OnInit{
    backViaBreadcrumb: boolean;
    
    constructor(
        public breadcrumbDataService : BreadcrumbDataService,
        private router : Router,
        public route : ActivatedRoute,
        public appPoint : Location
    ){}

    ngOnInit() {
        console.log(this.breadcrumbDataService.breadcrumbData);
    }

    breadcrumbNavigate= (breadcrumbData : BreadcrumbData, rowIndex : number) => {
        if(this.breadcrumbDataService.editCount===0){
             this.pageNavigation(breadcrumbData, rowIndex);
        }
        else{
            const confirmMsg : string = 'Your changes were not saved. Do you want to continue without saving ?';
            const confirmDialogInput : ConfirmDialogInput = {
                title: 'Confirm Dialog',
                message : confirmMsg,
                btnOkText: 'Ok',
                btnCancelText: 'Cancel',
                popupHeight: '30%'
            }
            this.breadcrumbDataService.matConfirmDialog(confirmDialogInput).then(res => {
                if(res){
                    this.breadcrumbDataService.editCount=0;
                    this.pageNavigation(breadcrumbData, rowIndex);
                }
            })
        }
    }

    pageNavigation = (breadcrumbData: BreadcrumbData, rowIndex: number) => {
        if(this.breadcrumbDataService.breadcrumbData[this.breadcrumbDataService.breadcrumbData.length-1].name.startsWith('Details') &&
        this.breadcrumbDataService.breadcrumbData[this.breadcrumbDataService.breadcrumbData.length-2].name.startsWith('Table-View')){
            this.breadcrumbDataService.backViaBreadcrumb= true;
            console.log("backvia is false");
        }
        else{
            this.breadcrumbDataService.backViaBreadcrumb= false;
            console.log("backvia is true");
        }
        this.routeToPage(breadcrumbData.url, breadcrumbData)
    }

    routeToPage = (navigateTo, breadcrumbData: BreadcrumbData) => {
        this.routerNavigation(navigateTo);
    }

    routerNavigation = (navigateTo) => {
        this.breadcrumbDataService.breadcrumbData.pop();
        this.router.navigate([navigateTo], {
            relativeTo: this.route
        });
    }
}