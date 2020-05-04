import { EditGradesComponent } from './components/edit-grades/edit-grades.component';
import { SecretaryComponent } from './components/secretary/secretary.component';
import { StudentFormComponent } from './components/studentForm/studentForm.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OptionsComponent } from './components/options/options.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import {InfoContainerComponent} from './components/info-container/info-container.component';
import {AddFacultyComponent} from './components/add-faculty/add-faculty.component'
import {AddSeriesComponent} from './components/add-series/add-series.component'
import {AddGroupComponent} from './components/add-group/add-group.component'


const routes: Routes = [  {path: 'login', component: LoginPageComponent},
                          {path: 'options', component: OptionsComponent},
                          {path: 'student', component: StudentInfoComponent},
                          {path: 'addInfo', component: InfoContainerComponent},
                          {path: 'addFaculty', component: AddFacultyComponent},
                          {path: 'addGroup', component: AddGroupComponent},
                          {path: 'addSeries', component: AddSeriesComponent},
                          {path: 'student-info', component: StudentFormComponent},
                          {path: 'secretar', component: SecretaryComponent},
                          {path: 'edit-grades', component: EditGradesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
