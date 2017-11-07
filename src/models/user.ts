export class UserModel{
  constructor(
    public nombre:string,
    public apellido:string,
    public activo:boolean,
    public role: number, //0 = admin, 1 = user
    public email: string,
    public pass: string,
    public ciudadesFav :[string]
  ){}
}
