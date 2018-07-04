import { Component } from '@angular/core';

import {Router} from '@angular/router';


@Component({
  template: '<h2>No autorizado</h2><br><button class="btn btn-success" (click)="regresar()">Regresar a Panel</button>'
})
export class Page401Component {

    constructor(private router: Router)
    {

    }

    regresar()
    {
      this.router.navigate(['/panel']);
    }
}
