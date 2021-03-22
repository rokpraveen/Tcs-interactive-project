import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
    selector: 'table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit{

  @ViewChild('searchbar') searchbar: ElementRef;
    searchName = '';
    selected = '';
    criteria = '';
    employes;
  rows = [];
    
    constructor(private router: Router, private employeeService: EmployeeService){ 
      
    }


    ngOnInit () : void {
      this.employes= this.employeeService.get();
      this.rows=this.employes;
      
      }
    filterData = () => {
         this.rows=this.employes;
         const val = this.searchName.toLowerCase();
        if(this.selected == 'Name')
           {
            // filter our data
            const temp = this.rows.filter(d => {
            return d.Name.toLowerCase().includes(val);
                         });
            this.rows=temp;
             } 
        if(this.selected == 'ID')
        {
          const temp = this.rows.filter(d => {
            return d.empid.toString().includes(val);
             });
          this.rows=temp;
        }
        if(this.selected == 'Experience')
        {
          
          if(this.criteria == '>')
          {
             const temp = this.rows.filter(d => {
              return d.experience > this.searchName;
            });
            this.rows= temp;
          }
          if(this.criteria == '<')
          {
            const temp = this.rows.filter(d =>{
              return d.experience < this.searchName;
            });
            this.rows = temp;
          }
          if(this.criteria == '=')
          {
            const temp = this.rows.filter(d =>{
              return d.experience == this.searchName;
            });
            this.rows = temp;
          }
        }

      
}
  }