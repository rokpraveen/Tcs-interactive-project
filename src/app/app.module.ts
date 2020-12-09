import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';

import { FlexLayoutModule } from "@angular/flex-layout";

import { Routes, RouterModule } from '@angular/router';
import {InteractiveComponent} from './interactive/interactive.component';
import { LoginComponent} from './login/login.component';

const appRoutes : Routes =[
  {path :'', component : LoginComponent},
  {path: 'interactive', component: InteractiveComponent },
  
];


@NgModule({
  declarations: [
    AppComponent,
    InteractiveComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }