import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

//HttpClientModule
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { UsuariosComponent } from './administracion/usuarios/usuarios.component';

import { CuentaComponent } from './operaciones/subcuentas/cuenta.component';

import { PanelComponent } from './administracion/panel.component';

import { LoginComponent } from './login.component';

import {UsuariosService} from './usuarios.service';

import { CookieService } from 'ngx-cookie-service';

import { CuentaService } from './operaciones/subcuentas/cuenta.service';

import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

import { DashboardComponent } from './administracion/dashboard.component';

import { Page401Component } from './Page401.component'; 

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LogoutComponent } from './administracion/logout.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'panel/usuarios', component: PanelComponent },
  { path: 'panel/cuentas', component: PanelComponent },
  { path: 'panel/401', component: Page401Component },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, UsuariosComponent, CuentaComponent, LoginComponent, PanelComponent, PageNotFoundComponent, DashboardComponent, Page401Component, LogoutComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing : false }
    ),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [UsuariosService, CookieService, CuentaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
