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
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent} from './login/login.component';
import { FilterPipe} from './filter.pipe';
import {MatRadioModule} from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { DetailsComponent } from './details/details.component';
import { TableViewComponent } from './table-view/table-view.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CommonPopupComponent } from './common-popup/common-popup.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddemployeeComponent,
    InteractiveComponent,
    FilterPipe,
    DetailsComponent,
    TableViewComponent,
    BreadcrumbComponent,
    ConfirmDialogComponent,
    CommonPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule,
    NgxDatatableModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }