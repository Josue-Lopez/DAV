import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuenta } from './cuenta';
import { Subcuenta } from './subcuenta';
import { CookieService } from 'ngx-cookie-service';
import { CuentaService } from './cuenta.service';
import { Usuario } from '../../usuario';
import { UsuariosService } from '../../usuarios.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'usuarios.js';
import { empty } from 'rxjs/Observer';
import { TipoUsuario } from '../../tipoUsuario';
import { error } from 'util';
import { NgForOf } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'seccion-cuenta',
  templateUrl: './cuenta.component.html'
})

export class CuentaComponent implements OnInit {
  title = 'Subcuentas';
  ct: Cuenta;
  sct: Subcuenta;
  cuenta: Cuenta[] = [];
  cuenta2: Cuenta[] = [];
  cuentaIn: any;
  subcuenta: Subcuenta[] = [];
  atras: Subcuenta[] = [];
  sbcuenta: any;
  cuentaID: any;
  cuentamayorID: any;
  nivel: any;

  private usuarios: Usuario[] = [];
  private tipoUsuarios: TipoUsuario[];
  private authLevel = 1;

  constructor(private usuariosService: UsuariosService, private SBS: CuentaService, private cookieService: CookieService, private spinnerService: Ng4LoadingSpinnerService, private router: Router) {
    console.log('Tipo : ' + this.cookieService.get('tipoUsuario'));
    if (parseInt(this.cookieService.get('tipoUsuario')) != this.authLevel)
      this.router.navigate(['panel/401']);
    this.ct = new Cuenta(0, '', 0);
    this.sct = new Subcuenta("", "", 0, 0, "", "");
  }

  ngOnInit() {
    this.spinnerService.show();

    this.SBS.getCuentas(this.cookieService.get('token')).subscribe(
      (datos: Cuenta[]) => {
        this.cuenta2 = datos;
        this.cuenta = datos.filter(x => x.estado === 1);

        this.usuariosService.getTipoUsuarios(this.cookieService.get('token')).subscribe(
          (tipo: TipoUsuario[]) => {
            console.log(tipo);
            this.tipoUsuarios = tipo;

            this.usuarios.forEach(usuario => {
              console.log(this.tipoUsuarios.find(x => x.codTipousuario == usuario.codTipousuario));
              usuario.tipoRol = this.tipoUsuarios.find(x => x.codTipousuario == usuario.codTipousuario).description;
            });

            this.getSubcuentas();
            this.getCuentasInactivas();
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
    );
  }

  getSubcuentas() {
    this.SBS.getSubcuentas(this.cookieService.get('token')).subscribe(
      (data: Subcuenta[]) => {
        this.subcuenta = data;
      }
    );
  }

  getCuentas() {
    this.SBS.getCuentas(this.cookieService.get('token')).subscribe(
      (datos: Cuenta[]) => {
        this.cuenta = datos.filter(x => x.estado === 1);
        this.cuenta2 = datos.filter(x => x.estado === 0);
      }
    );
  }

  Guardar(cnt) {

    let tabla: any;
    let filas: number;
    let row: any;
    let row2: any;

    row = this.cuenta.filter(x => x.codCuenta === cnt.codCuenta).length;
    row2 = this.cuenta2.filter(x => x.codCuenta === cnt.codCuenta).length;

    if (row === 0){
      filas = row2;
    }
    else if(row2 === 0){
      filas = row;
    }

    if (filas === 0) {

      if (cnt.estado === undefined || cnt.nombreCuenta === undefined || cnt.estado === undefined) {
        return;
      }
      else {
        if (cnt.estado === "Activo") {
          cnt.estado = 1;
          this.cuenta.push(new Cuenta(parseInt(cnt.codCuenta), cnt.nombreCuenta, parseInt(cnt.estado)));
        }
        else if (cnt.estado === "Inactivo") {
          cnt.estado = 0;
        }

        tabla = new Cuenta(parseInt(cnt.codCuenta), cnt.nombreCuenta, parseInt(cnt.estado));
        this.SBS.postCuentas(tabla, this.cookieService.get('token')).subscribe(
          (res) => {
            this.getCuentas();
            window.alert('Guardado exitosamente');
            ct => this.cuenta.push(ct)
            ct => this.cuenta2.push(ct)
            this.ct = new Cuenta(0, '', 0);
          },
          (error) => {
            window.alert('Error al guardar ' + error);
          }
        );
      }
    } else {
      let est: any;
      if (cnt.codCuenta === undefined || cnt.nombreCuenta === undefined || cnt.estado === undefined) {
        return;
      }
      else {
        if (cnt.estado === "Activo") {
          est = 1;
        }
        else if (cnt.estado === "Inactivo") {
          est = 0;
        }
        tabla = new Cuenta(cnt.codCuenta, cnt.nombreCuenta, est);
        this.SBS.putCuentas(tabla, this.cookieService.get('token')).subscribe(
          (res) => {
            this.getCuentas();
            window.alert("Modificado exitosamente");
          },
          (error) => {
            window.alert("Error al modificar: " + error);
            console.log(error);
          }
        );
      }
    }

  }

  ObtenerNivelCuenta(level: string) {
    this.nivel = level;
  }

  ObtenerCuentaID(item) {
    this.cuentaID = item.codCuenta;
  }

  ObtenerSubCuentaID(item) {
    this.cuentaID = item.codSubcuenta;
    this.cuentamayorID = item.codCuenta;
  }

  GuardarSubCuenta(sct) {
    let tabla: any;
    let filas: number;
    let cod: any;

    filas = this.subcuenta.filter(x => x.codSubcuenta === sct.codSubcuenta).length;
    cod = sct.codSubcuenta;
    if (sct.nombreSubcuenta === undefined || sct.codSubcuenta === undefined || sct.estado === undefined) {
      return;
    }
    else {
      sct.codSubcuenta = this.cuentaID + sct.codSubcuenta;
      if (filas === 0) {
        if (sct.estado === 'Activo') {
          sct.estado = 1;

          if (this.nivel === "primero") {
            this.subcuenta.push(new Subcuenta(sct.codSubcuenta, sct.nombreSubcuenta, this.cuentaID, parseInt(sct.estado), 'N/A', this.nivel));
          }
          else {
            this.subcuenta.push(new Subcuenta(sct.codSubcuenta, sct.nombreSubcuenta, this.cuentamayorID, parseInt(sct.estado), this.cuentaID, this.nivel));
          }
        }
        else if (sct.estado === 'Inactivo') {
          sct.estado = 0;
        }

        if (this.nivel === "primero") {

          tabla = new Subcuenta(sct.codSubcuenta, sct.nombreSubcuenta, parseInt(this.cuentaID), parseInt(sct.estado), 'N/A', this.nivel);

          this.SBS.postSubcuentas(tabla, this.cookieService.get('token')).subscribe(
            (res) => {
              if (sct.estado === 1) {
                sct => this.subcuenta.push(sct)
              }
              window.alert('Guardado exitosamente');
            },
            (error) => {
              window.alert('Error al guardar ' + error);
            }
          );
        }
        else if (this.nivel === "otro") {

          tabla = new Subcuenta(sct.codSubcuenta, sct.nombreSubcuenta, parseInt(this.cuentamayorID), parseInt(sct.estado), this.cuentaID, this.nivel);        

          this.SBS.postSubcuentas(tabla, this.cookieService.get('token')).subscribe(
            (res) => {
              if (sct.estado === 1) {
                sct => this.subcuenta.push(sct)
              }
              window.alert('Guardado exitosamente');
            },
            (error) => {
              window.alert('Error al guardar ' + error);
            }
          );
        }

      }
      else {
        let est: number;

        if (sct.estado === "Activo") {
          est = 1;
        }
        else if (sct.estado === "Inactivo") {
          est = 0;
        }

        tabla = new Subcuenta(cod, sct.nombreSubcuenta, parseInt(sct.codCuenta), est, sct.subcodSubcuenta, sct.nivel);

        this.SBS.putSubcuentas(tabla, this.cookieService.get('token')).subscribe(
          (res) => {
            this.getSubcuentas();
            window.alert('Modificado exitosamente');
          },
          (error) => {
            window.alert('Error al modificar ' + error);
          }
        );
      }
    }
    this.sct = new Subcuenta("", "", 0, 0, "", "");
    this.getSubcuentas();
  }

  CargarTablaSubCuenta(item): Subcuenta {
    this.sbcuenta = this.subcuenta.filter(x => x.codCuenta === item.codCuenta);
    this.sbcuenta = this.sbcuenta.filter(x => x.nivel === 'primero');
    this.sbcuenta = this.sbcuenta.filter(x => x.estado === 1);
    return this.sbcuenta;
  }

  SubCuentas(item): Subcuenta {
    this.sbcuenta = this.subcuenta.filter(x => x.subcodSubcuenta === item.codSubcuenta);
    this.sbcuenta = this.sbcuenta.filter(x => x.nivel === 'otro');
    this.sbcuenta = this.sbcuenta.filter(x => x.estado === 1);
    return this.sbcuenta;
  }

  Limpiar() {
    this.ct = new Cuenta(0, '', 0);
  }

  AtrasAdd(item) {
    this.atras.push(new Subcuenta("", "", item.codCuenta, 0, item.subcodSubcuenta, item.nivel));
  }

  AtrasDelete(): Subcuenta {

    let codigo: string;
    let cod: number;
    let nivel: string;
    let cont: number = 0;

    for (let item of this.atras) {
      cont = cont + 1;

      if (this.atras.length === 1) {
        cod = item.codCuenta;
        nivel = item.nivel;
        this.atras.splice(cont - 1, 1);
      }
      else {
        if (cont === this.atras.length) {
          codigo = item.subcodSubcuenta;
          nivel = item.nivel;
          this.atras.splice(cont - 1, 1);
        }
      }
    }

    if (nivel === 'primero') {
      this.sbcuenta = this.subcuenta.filter(x => x.codCuenta === cod);
      this.sbcuenta = this.sbcuenta.filter(x => x.nivel === nivel);
      this.sbcuenta = this.sbcuenta.filter(x => x.estado === 1);
    }
    else if (nivel === 'otro') {
      this.sbcuenta = this.subcuenta.filter(x => x.subcodSubcuenta === codigo);
      this.sbcuenta = this.sbcuenta.filter(x => x.nivel === nivel);
      this.sbcuenta = this.sbcuenta.filter(x => x.estado === 1);
    }
    return this.sbcuenta;
  }
  //MODIFICAR
  Binding(item) {
    this.ct = new Cuenta(item.codCuenta, item.nombreCuenta, item.estado);
  }

  Binding2(item) {
    this.sct = new Subcuenta(item.codSubcuenta, item.nombreSubcuenta, item.codCuenta, item.estado, item.subcodSubcuenta, item.nivel);
  }

  BorrarHistorial() {
    for (let item of this.atras) {
      this.atras.splice(this.atras.length - this.atras.length, this.atras.length);
    }
  }

  SubCuentasInactivas() {
    this.sbcuenta = this.subcuenta.filter(x => x.estado === 0);
    return this.sbcuenta;
  }

  getCuentasInactivas(): Cuenta {
    this.cuentaIn = this.cuenta2.filter(x => x.estado === 0);
    return this.cuentaIn;
  }

  Buscar(codigo, nombre): Subcuenta {

    if (codigo === "" && nombre === "") {
      return;
    } else {
      if (codigo != "" && nombre === "") {
        this.sbcuenta = this.subcuenta.filter(x => x.codSubcuenta === codigo);
      } else if (nombre != "" && codigo === "") {
        this.sbcuenta = this.subcuenta.filter(x => x.nombreSubcuenta === nombre);
      }else if (codigo != "" && nombre != ""){
        window.alert("Solo es un campo para la busqueda");
        return;
      }
    }
    return this.sbcuenta;
  }
}