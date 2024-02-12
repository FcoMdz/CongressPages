import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLService } from './services/sql.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ListTallerComponent } from './components/views/list-taller/list-taller.component';
import { ListConfComponent } from './components/views/list-conf/list-conf.component';
import { RegConfComponent } from './components/forms/reg-conf/reg-conf.component';
import { RegTallerComponent } from './components/forms/reg-taller/reg-taller.component';
import { RegTalleristaComponent } from './components/forms/reg-tallerista/reg-tallerista.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    ListTallerComponent,
    ListConfComponent,
    RegConfComponent,
    RegTallerComponent,
    RegTalleristaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MultiSelectModule,
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    DropdownModule,
    MultiSelectModule
  ],
  providers: [SQLService],
  bootstrap: [AppComponent],
})
export class AppModule { }
