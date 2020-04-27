import { StudentFormComponent } from './components/studentForm/studentForm.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OptionsComponent } from './components/options/options.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';


const routes: Routes = [{path: 'login', component: LoginPageComponent},
                        {path: 'options', component: OptionsComponent},
                        {path: 'student', component: StudentInfoComponent},
                        {path: 'student-info', component: StudentFormComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
