import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { DetailsComponent } from './details/details.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { LoginComponent } from './login/login.component';
import { TableViewComponent } from './table-view/table-view.component';


const routes: Routes =[
  {
    path :'', 
    component : LoginComponent
  },
  {
    path: 'interactive', 
    component : InteractiveComponent
  },
  {
    path : 'details',
    component : DetailsComponent

  },
  {
    path: 'addemployee' , 
    component : AddemployeeComponent
  },
  {
    path : 'table-view',
    component : TableViewComponent 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
