import { SecretaryComponent } from './components/secretary/secretary.component';
import { StudentFormComponent } from './components/studentForm/studentForm.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { LoginServiceService} from './services/login-service.service';
import { OptionsComponent } from './components/options/options.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule} from '@angular/cdk/table';
import { InfoContainerComponent } from './components/info-container/info-container.component';
import { AddFacultyComponent } from './components/add-faculty/add-faculty.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AddSeriesComponent } from './components/add-series/add-series.component';
import {AddNewFacultyService} from './services/add-new-faculty.service';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    OptionsComponent,
    StudentInfoComponent,
    InfoContainerComponent,
    AddFacultyComponent,
    AddGroupComponent,
    AddSeriesComponent,
    StudentFormComponent,
    SecretaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    CdkTableModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatListModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [LoginServiceService, AddNewFacultyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
