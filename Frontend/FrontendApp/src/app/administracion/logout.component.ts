import { Component } from '@angular/core';

import {Router} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';


@Component({
  template: '<div><p>Login out...</p></div>'
})
export class LogoutComponent {

    constructor(private router: Router, private cookieService:CookieService)
    {
        this.cookieService.deleteAll('/');
        this.cookieService.deleteAll('/panel');
        this.router.navigate(['']);

    }

}
