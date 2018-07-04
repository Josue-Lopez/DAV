import{Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Usuario } from './usuario';


@Injectable()
export class UsuariosService{

    constructor(private http:HttpClient){

    }

    getUsuarios(token:string){
        return this.http.get('http://' + window.location.hostname + ':3000/api/Usuarios', {headers: {"Authorization" : token }});   
    }

    postUsuarios(usuario:Usuario, token:string){
        return this.http.post('http://' + window.location.hostname +  ':3000/api/Usuarios', usuario, {headers: {"Authorization" : token }});
    }

    putUsuarios(usuario:Usuario, token:string){
        return this.http.put('http://' + window.location.hostname + ':3000/api/Usuarios/'+usuario.codUsuario, usuario, {headers: {"Authorization" : token }});
    }
    
    deleteUsuarios(codUsuario:string, token:string){
        const url='http://' + window.location.hostname + ':3000/api/Usuarios/'+codUsuario;
        return this.http.delete(url, {headers: {"Authorization" : token }});
    }

    doLogin(usuario:string, password:string) {
        var credenciales = {
            "username" : usuario,   
            "password" : password
        };
        console.log(credenciales);
        return this.http.post('http://' + window.location.hostname + ':3000/api/Usuarios/login', credenciales);
    }

    getUsuarioPorId(codUsuario:string, token:string)
    {
        const url='http://' + window.location.hostname + ':3000/api/Usuarios/'+codUsuario;
        return this.http.get(url, {headers: {"Authorization" : token }});
    }

    getTipoUsuarios(token:string){
        return this.http.get('http://' + window.location.hostname +  ':3000/api/Tipousuarios', {headers: {"Authorization" : token }});
    }
   
}