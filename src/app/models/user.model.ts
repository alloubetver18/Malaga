export class UserModel {
  constructor(
    public email: string,
    public firstName: string,
    public lastName: string,
    public telefone: number,
    public passw: string,
    public repeatpassw: string,
    public birthdate: Date,
    public gender: string,
    public community: string,
    public role: string,
    public id: number
  ) {}
}
