export class RatingModel {
  constructor(
    public id: string,
    public id_user: string,
    public id_place: string,
    public rate: number,
    public comment: string
  ) {}
}
