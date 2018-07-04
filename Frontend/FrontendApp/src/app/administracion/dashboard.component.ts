import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';

import {Router} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';


@Component({
     selector: 'dashboard',
     templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit{
    constructor(private cookieService:CookieService, private router: Router) {
        if(cookieService.get('token') != "")
        {
            console.log("Hay una sesion dashboard");
            console.log(cookieService.get('token'));

        }
        else
        {
            console.log("Debe hacer login primero");
            this.router.navigate(['']);
        }
    }

    ngOnInit() {

    }
    
}