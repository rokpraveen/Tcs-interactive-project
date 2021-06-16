import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import * as _ from 'lodash';
import { breadcrumConstants } from '../breadcrum-constants';
import { BreadcrumbData } from '../core.model';
import { BreadcrumbDataService } from '../breadcrumb-data.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonPopupComponent } from '../common-popup/common-popup.component';

@Component({
    selector: 'table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit{

  @Output() checkedData = new EventEmitter<any[]>();

  inputTable= {
    rows: [],
    columns: [],
    filterRequired : true
  }
    employes;
    columnFilter=[];
    
    searchInput : boolean;
  filterClicked: boolean;
  filterOpt: any;
  filterJson: any;
  filterCount: any;
  showRecFound: boolean;
  allFieldVal: any;
  resetFlag: boolean;
  originTable: any;
  selectedRows= [];
  tableOffset: number;

    
    constructor(private router: Router, private employeeService: EmployeeService,
      private breadcrumbDataService : BreadcrumbDataService,
      private dialog: MatDialog){ 
      
    }


    ngOnInit () : void { 
      this.tableOffset=0;
      this.resetFlag= false;
      this.allFieldVal=[];
      this.filterJson=[];
      this.employes= this.employeeService.get();
      this.inputTable.rows = this.employes;
      this.originTable= this.inputTable.rows;
      console.log(this.inputTable.rows);
      this.inputTable.columns = [
        {prop: 'Name', name: 'Name', columnType: 'link' , filterType: 'text', filterDisabled: false,dataType: 'string', width: 230},
        {prop: 'experience', name: 'Experience', columnType: 'text',filterType: 'number',dataType: 'number', filterDisabled: false, width: 70},
        {prop: 'empid', name: 'ID', columnType: 'number',filterType: 'number', filterDisabled: false,dataType: 'number', width: 70}
      ]
      this.initialiseTableList();
      this.breadcrumbManupilation();
    }
    breadcrumbManupilation = () => {
      if(!this.breadcrumbDataService.backViaBreadcrumb){
        console.log('dont come');
      let breadcrumbRemittance : BreadcrumbData;
      breadcrumbRemittance= {
        url : breadcrumConstants.BREADCRUM_INTERACTIVE.links.tableView,
        name: breadcrumConstants.BREADCRUM_INTERACTIVE.name.tableView
      };
      this.breadcrumbDataService.breadcrumbData.push(breadcrumbRemittance);
      console.log(this.breadcrumbDataService.breadcrumbData);
    }
      
    }
  
  onChange(event: any): void {
      this.tableOffset = event.offset;
  }

    initialiseTableList = () => {
      this.columnFilter=[];
      this.inputTable.columns.forEach(element =>{
        let columnObj;
        if(element.filterType == 'text'){
          columnObj = {
            prop: element.prop,
            filter: [
              {value : 'Contains', selected: true},
              {value : 'Starts With', selected: false},
              {value : 'Ends With', selected : false},
              {value : 'Equals', selected : false}
            ]
          };
        }
        else if(element.filterType == 'number'){
          columnObj = {
            prop : element.prop,
            filter: [
              {value: 'Less Than', selected: true},
              {value: 'Greater Than', selected: false}
            ]
          }
        }
        this.columnFilter.push(columnObj);
        console.log(this.columnFilter)
        this.allFieldVal[element.prop]= (element.filterType === 'dropdown') ? 'all': '';
      });
    }

    filterClick = (column, filterName?: String) => {
      let colName = column.prop;
      let newFilterArray = [];
      this.columnFilter.forEach((colProp, index) => {
        if(colProp.prop === colName){
          colProp.filter.forEach(data => {
            let newObj;
            if(data.value === filterName){
              newObj = { value: data.value, selected: true}
            }
            else {
              newObj = { value : data.value, selected: false}
            }
            newFilterArray.push(newObj);
          });
          this.columnFilter[index].filter = newFilterArray;
        }
      });
    }
    filterButtonDisable = () => {
      let enableCls =false;
      const colArr = this.inputTable.columns;
      for( let i=0 ; i< colArr.length; i++){
        if((colArr[i].filterType !== 'dropdown' && this.allFieldVal[colArr[i].prop] !== '')){
          if(enableCls === false){
            enableCls = true;
          }
        }
      }
      return (enableCls) ? 'enableCls' : 'disableCls';
    }
    resetButtonDisable = () => {
      let enableCls= false;
      const colArr = this.inputTable.columns;
      for(let i=0; i< colArr.length;i++){
        if((colArr[i].filterType !== 'dropdown' && this.allFieldVal[colArr[i].prop] !== '')){
          enableCls= true;
          break;
        }
      }
      return (enableCls || this.resetFlag)? 'enableCls' : 'disableCls';
    }

    searchDataUsingFilter = (event, column) =>{
      let colName = column.prop;
      const findIndex = _.findIndex(this.columnFilter, {prop: colName});
      this.columnFilter[findIndex].filter.forEach(element => {
        if(element.selected === true){
          this.filterOpt=element.value;
        }
      });
      console.log(column.dataType);
      const colDatatype = column.dataType;
      const findFileJsonIndex = _.findIndex(this.filterJson, {field: colName});
      
      const srchVal = (event.target.value === '')? '': event.target.value;
      console.log(event.target.value);
      if(findFileJsonIndex < 0){
       this.filterJson.push({field: this.filterOpt, srchVal, colDatatype, colName});
      }
      else{
       this.filterJson[findFileJsonIndex]= {field: this.filterOpt, srchVal, colDatatype, colName};
      }
    }

    filterButtonClicked = () =>{
      const tableData = this.inputTable.rows;
      const srchJson = [];
      let matchesFilter: any;
      const matches: any = [];
      let count: number;
      const that = this;
      for (let i=0; i< this.filterJson.length; i++){
        if(this.filterJson[i].srchVal !== ''){
          srchJson.push(this.filterJson[i]);
        }
      }
      matchesFilter = (item: any) => {
        count =0;
        let srchVal= "";
        for( let i=0 ; i< srchJson.length; i++){
          const colFilName = srchJson[i].field;
          const colNewName = srchJson[i].colName;
          if(srchJson[i].colDatatype === 'string'){
            srchVal = srchJson[i]['srchVal'].toLowerCase();
          }
          else{
            srchVal = srchJson[i]['srchVal']
          }
          let dataVal : any;
          if(srchJson[i].colDatatype === 'string')
          {
            dataVal = (item[srchJson[i]['colName']] !== '')? item[srchJson[i]['colName']].toLowerCase() :'';
          }
          else if(srchJson[i].colDatatype === 'number'){
            dataVal = (item[srchJson[i]['colName']] !== '')? Number(item[srchJson[i]['colName']]) :'';
          }
          if((colFilName === 'Contains') && (dataVal.indexOf(srchVal) >= 0) && (srchVal !== '')){
            count++;
          }
          if((colFilName === 'Starts With') && (dataVal.indexOf(srchVal) === 0) && (srchVal ! == '')){
            count++;
          }
          if((colFilName === 'Ends With') && (dataVal.indexOf(srchVal, dataVal.length - srchVal.length) !== -1) && (srchVal ! == '')){
            count++;
          }
          if((colFilName === 'Equals') && (dataVal === srchVal) && (srchVal ! == '')){
            count++;
          }
          if((colFilName === 'Less Than') && (dataVal < srchVal) && (srchVal !== '') ){
            count++;
          }
          if((colFilName === 'Greater Than') && (dataVal > srchVal) && (srchVal !== '') ){
            count++;
          }
        }
        return count === srchJson.length;
      };
      for(let i=0; i< tableData.length; i++){
        if(matchesFilter(tableData[i])){
          matches.push(tableData[i]);
        }
      }
      this.inputTable.rows=[...matches];
      this.filterCount=matches.length;
      this.showRecFound= (this.filterCount === 0 )? false: true;
    }
    resetButtonClicked = () => {
      this.resetFlag=false;
      this.allFieldVal=[];
      this.filterJson=[];
      this.inputTable.rows = [...this.originTable];
      console.log(this.inputTable.rows);
      this.tableOffset=0;
    }

    navigateToPage = (row, value) => {
      this.router.navigate(["/details"], { queryParams: { empl: row.empid , empx : row.experience }});
    }

    editablePopup(event, row) {
      const dialogRef = this.dialog.open(CommonPopupComponent, {
        width: '90%',
        height: '80%',
        data: { mockData : this.editData(row)},
        panelClass: 'custom-dialog-container'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("popUp button clicked");
      })
    }
    
    editData = (event) => {
      const jsonData = {
        header: 'Display Data',
        infoMessage : 'Information ',
        action: 'editData',
        name: event.Name,
        experience: event.experience,
        id: event.empid,
        button: ['Cancel', 'Submit']
      };
      return jsonData;
    }
}
  
