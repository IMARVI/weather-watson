export class TarjetaModel{
  constructor(
    public ciudad:string,
    public temperatura:string,
    public imagen:string,
    public precipitacion: string,
    public humedad: string,
    public viento: string,
    public forecast: any[],
    public sunrise: string,
    public sunset: string
  ){}
}
