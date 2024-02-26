export class UserModel {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public province: string,
    public gender: string,
    public email: string,
    public role: string,
    public birthdate: Date,
    public passw: string,
    public observations: string
  ) {}
}
