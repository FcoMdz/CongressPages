import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';

import { LoginComponent } from './components/login/login.component';
import { RegTallerComponent } from './components/forms/reg-taller/reg-taller.component';
import { RegConfComponent } from './components/forms/reg-conf/reg-conf.component';
import { RegTalleristaComponent } from './components/forms/reg-tallerista/reg-tallerista.component';
import { ListTallerComponent } from './components/views/list-taller/list-taller.component';
import { ListConfComponent } from './components/views/list-conf/list-conf.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'regTaller', component: RegTallerComponent},
  { path: 'regConf', component: RegConfComponent},
  { path: 'regTallerista', component: RegTalleristaComponent},
  { path: 'viewTaller', component: ListTallerComponent},
  { path: 'viewConf', component: ListConfComponent},
  { path: '', component: InicioComponent },
  { path: '**', component: InicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
