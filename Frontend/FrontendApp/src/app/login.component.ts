import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';

import{UsuariosService} from './usuarios.service';

import {Router} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
     selector: 'login-page',
     templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit{
    private username : string;
    private password : string;

    constructor(private usuariosService:UsuariosService, private cookieService:CookieService, private router:Router, private spinnerService: Ng4LoadingSpinnerService) {
        if(cookieService.get('token') != "")
        {
            console.log("Hay una sesion login");
            this.router.navigate(['/panel']);
        }
    }

    ngOnInit() {
        console.log("Login init");
    }

    login()
    {
        console.log("Do Login");
        this.spinnerService.show();
        this.usuariosService.doLogin(this.username, this.password).subscribe((response) => {
            console.log(response);
            console.log("Token Auth : " + response['id'],1, '/');
            this.cookieService.set('token', response['id'],1, '/');
            this.cookieService.set('userId', response['userId'], 1, '/');
            this.cookieService.set('ttl', response['ttl'], 1, '/');
            this.usuariosService.getUsuarioPorId(this.cookieService.get('userId'), this.cookieService.get('token')).subscribe((response) =>{
                this.cookieService.set('tipoUsuario', response['codTipousuario'], 1, '/');
                this.cookieService.set('nombre', response['nombre'],1, '/');
                this.cookieService.set('email', response['email'],1, '/');
                console.log(response);
                this.spinnerService.hide();
                this.router.navigate(['/panel']);
            }, 
            (error)=> {
                console.log(error);
                this.spinnerService.hide();
            });
        }, 
        (error)=> {
            console.log(error);
            if(error['status'] == 401)
            {
                this.spinnerService.hide();
                alert("Usuario o password incorrecto");
                this.username = '';
                this.password = '';
            }
        });
    }
    
}