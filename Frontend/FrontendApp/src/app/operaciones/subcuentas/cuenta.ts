export class Cuenta{
    codCuenta: number;
    nombreCuenta: string;
    estado: number;

    constructor(
        codCuenta: number,
        nombreCuenta: string,
        estado: number,
    ){
        this.codCuenta = codCuenta;
        this.nombreCuenta = nombreCuenta;
        this.estado = estado;
    }
}