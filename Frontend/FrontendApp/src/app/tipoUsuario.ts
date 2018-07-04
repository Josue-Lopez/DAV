export class TipoUsuario{
    public codTipousuario: number;
    public name:string;
    public description:string;

    /**
     *
     */
    constructor(codTipoUsuario, name, description) {
        this.codTipousuario=codTipoUsuario;
        this.name=name;
        this.description=description;
    }
}