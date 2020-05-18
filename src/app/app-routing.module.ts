import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HomeComponent } from './components/home/home.component';
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
import { StudentCoursesComponent } from './components/student-courses/student-courses.component';


const routes: Routes = [  {path: 'login', component: LoginPageComponent},
                          {path: 'options', component: OptionsComponent, canActivate: [AuthGuard]},
                          {path: 'student', component: StudentInfoComponent, canActivate: [AuthGuard]},
                          {path: 'addInfo', component: InfoContainerComponent, canActivate: [AuthGuard]},
                          {path: 'addFaculty', component: AddFacultyComponent, canActivate: [AuthGuard]},
                          {path: 'addGroup', component: AddGroupComponent, canActivate: [AuthGuard]},
                          {path: 'addSeries', component: AddSeriesComponent, canActivate: [AuthGuard]},
                          {path: 'personal-info', component: StudentFormComponent, canActivate: [AuthGuard]},
                          {path: 'secretar', component: SecretaryComponent, canActivate: [AuthGuard]},
                          {path: 'edit-grades', component: EditGradesComponent, canActivate: [AuthGuard]},
                          {path: 'view-student-courses', component: StudentCoursesComponent, canActivate: [AuthGuard]},
                          {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
                          {path: '', component: HomeComponent, canActivate: [AuthGuard]},
                          {path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
