import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OptionsComponent } from './components/options/options.component';


const routes: Routes = [{path: 'login', component: LoginPageComponent},
                         {path: 'options', component: OptionsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
