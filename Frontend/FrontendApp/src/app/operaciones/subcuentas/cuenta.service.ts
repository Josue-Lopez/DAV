import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Cuenta } from './cuenta';
import { Subcuenta } from './subcuenta';

@Injectable()
export class CuentaService{

    constructor(private http: HttpClient){

    }

    //CUENTAS//

    getCuentas (token:string){
        return this.http.get('http://' + window.location.hostname + ':3000/api/Cuentas', {headers: {"Authorization" : token }}); 
    }

    postCuentas(Cuenta, token:string){
        return this.http.post('http://' + window.location.hostname +  ':3000/api/Cuentas', Cuenta, {headers: {"Authorization" : token }});
    }

    putCuentas(Cuenta: Cuenta, token:string){
        return this.http.put('http://' + window.location.hostname +  ':3000/api/Cuentas/' + Cuenta.codCuenta, Cuenta, {headers: {"Authorization" : token }});
    }

    //SUBCUENTAS//
    getSubcuentas (token:string){
        return this.http.get('http://' + window.location.hostname + ':3000/api/Subcuentas', {headers: {"Authorization" : token }}); 
    }

    postSubcuentas(Subcuenta, token:string){
        return this.http.post('http://' + window.location.hostname +  ':3000/api/Subcuentas', Subcuenta, {headers: {"Authorization" : token }});
    }

    putSubcuentas(Subcuenta: Subcuenta, token:string){
        return this.http.patch('http://' + window.location.hostname +  ':3000/api/Subcuentas/' + Subcuenta.codSubcuenta, Subcuenta, {headers: {"Authorization" : token }});
    }
}