import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Usuario } from '../../usuario';

import { UsuariosService } from '../../usuarios.service';

import { CookieService } from 'ngx-cookie-service';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Router } from '@angular/router';


import 'usuarios.js';
import { empty } from 'rxjs/Observer';
import { TipoUsuario } from '../../tipoUsuario';
declare var usuariosScript: any;

@Component({
    selector: 'usuarios-table',
    templateUrl: './usuarios.component.html',
})

export class UsuariosComponent implements OnInit {
    private usuario: Usuario;
    private usuarios: Usuario[] = [];
    private UsuarioNuevo: Usuario;
    private tipoUsuarios: TipoUsuario[];
    private value: string;

    private usernameNuevo: string;
    private nombreNuevo: string;
    private emailNuevo: string;
    private realmNuevo: string;
    private contraseniaNueva: string;
    private tipoUsuarioNuevo: number;

    private usernameEditar: string;
    private nombreEditar: string;
    private emailEditar: string;
    private realmEditar: string;
    private contraseniaEditar: string;
    private usuarioEditado: Usuario;
    private editarId: number;
    private tipoUsuarioEditar: number;
    private codUsuarioEditar: number;

    private authLevel = 1;

    constructor(private usuariosService: UsuariosService, private cookieService: CookieService, private spinnerService: Ng4LoadingSpinnerService, private router: Router) {
        console.log('Tipo : ' + this.cookieService.get('tipoUsuario'));
        if (parseInt(this.cookieService.get('tipoUsuario')) != this.authLevel)
            this.router.navigate(['panel/401']);
    }

    ngOnInit() {
        this.spinnerService.show();
        this.usuariosService.getUsuarios(this.cookieService.get('token')).subscribe(
            (data: Usuario[]) => {
                console.log(data);
                this.usuarios = data;

                this.usuariosService.getTipoUsuarios(this.cookieService.get('token')).subscribe(
                    (tipo: TipoUsuario[]) => {
                        console.log(tipo);
                        this.tipoUsuarios = tipo;

                        this.usuarios.forEach(usuario => {
                            console.log(this.tipoUsuarios.find(x => x.codTipousuario == usuario.codTipousuario));
                            usuario.tipoRol = this.tipoUsuarios.find(x => x.codTipousuario == usuario.codTipousuario).description;
                        });
                        this.spinnerService.hide();
                    },
                    (error) => {
                        console.log("Error al recuperar del api");
                        this.spinnerService.hide();
                    }
                )
            },
            (error) => {
                console.log("Error al recuperar del api");
                this.spinnerService.hide();
            }
        )

    }

    onChange(newValue) {
        console.log(newValue);
        this.tipoUsuarioNuevo = parseInt(newValue);
        this.tipoUsuarioEditar = parseInt(newValue);
    }

    mostrarEditar(codUsuario: number) {
        var p = this.usuarios.find(x => x.codUsuario == codUsuario);
        this.nombreEditar = p.nombre;
        this.usernameEditar = p.username;
        this.emailEditar = p.email;
        this.realmEditar = p.realm;
        this.contraseniaEditar = p.password;
        this.editarId = codUsuario;
        this.codUsuarioEditar = p.codUsuario;
        this.tipoUsuarioEditar = p.codTipousuario;
        usuariosScript.mostrarEditar(codUsuario);
    }

    crearUsuario() {
        this.UsuarioNuevo = new Usuario(0, this.usernameNuevo, this.tipoUsuarioNuevo, this.nombreNuevo,
            this.emailNuevo, "0", true, this.contraseniaNueva);
        console.log(this.UsuarioNuevo);
        this.usuariosService.postUsuarios(this.UsuarioNuevo, this.cookieService.get('token')).subscribe((response) => {
            console.log(response);
            usuariosScript.ocultarCrear();
            location.reload();
        });
    }

    editarUsuario() {
        this.usuarioEditado = new Usuario(this.codUsuarioEditar, this.usernameEditar, this.tipoUsuarioEditar, this.nombreEditar, this.emailEditar,
            this.realmEditar, true, this.contraseniaEditar);
        console.log(this.codUsuarioEditar);
        console.log(this.usuarioEditado);
        this.usuariosService.putUsuarios(this.usuarioEditado, this.cookieService.get('token')).subscribe((response) => {
            console.log(response);
            usuariosScript.ocultaEditar();
            location.reload();
        });
    }

    eliminarUsuario(codUsuario: string) {
        this.usuariosService.deleteUsuarios(codUsuario, this.cookieService.get('token')).subscribe((response) => {
            console.log(response);
            console.log("Borrado");
            window.alert("Usuario eliminado");
            location.reload();
        });
    }

}