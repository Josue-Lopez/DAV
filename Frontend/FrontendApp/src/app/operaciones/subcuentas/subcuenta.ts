export class Subcuenta{
    codSubcuenta: string;
    nombreSubcuenta: string;
    codCuenta: number;
    estado: number;
    subcodSubcuenta: string;
    nivel: string;

    constructor(
        codSubcuenta: string,
        nombreSubcuenta: string,
        codCuenta: number,
        estado: number,
        subcodSubcuenta: string,
        nivel: string
    ){
        this.codSubcuenta = codSubcuenta;
        this.nombreSubcuenta = nombreSubcuenta;
        this.codCuenta = codCuenta;
        this.estado = estado;
        this.subcodSubcuenta = subcodSubcuenta;
        this.nivel = nivel;
    }
}