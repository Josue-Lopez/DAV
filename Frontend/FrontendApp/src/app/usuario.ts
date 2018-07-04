export  class Usuario {
    public codUsuario: number;
    public username: string;
    public codTipousuario: number;
    public nombre: string;
    public password:string;
    public email: string;
    public realm: string;
    public emailVerified:boolean;
    public tipoRol: string;

    /**
     *
     */
    constructor(codUsuario: number, username: string, codTipousuario: number, nombre: string,
        email: string, realm: string, emailVerified:boolean, contrasenia:string) {
            this.codUsuario= codUsuario;
            this.username= username;
            this.codTipousuario=codTipousuario;
            this.nombre= nombre;
            this.email= email;
            this.realm= realm;
            this.emailVerified=emailVerified;
            this.password = contrasenia;
            this.tipoRol = "";
    }
}