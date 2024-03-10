export class PlaceModel {
  constructor(
    public id: string,
    public name: string,
    public resumen: string,
    public valoracion: number,
    public images: string[]
  ) {}
}
