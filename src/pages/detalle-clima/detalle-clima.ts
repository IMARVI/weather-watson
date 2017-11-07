import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClimaService } from '../../providers/clima-service/clima-service';


@IonicPage()
@Component({
  selector: 'page-detalle-clima',
  templateUrl: 'detalle-clima.html',
})
export class DetalleClimaPage {
  detalle: any[];
  datosClima: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public climaService: ClimaService
  ) {
     this.detalle = navParams.get('datos');
     console.log(this.detalle);
  }

  ionViewDidLoad() {
    console.log(this.detalle);
  }

  callWeatherApi(ciudad : string){
    if(ciudad.length>0){
      this.climaService.buscarClima(ciudad).subscribe(
        (response) => {
          this.datosClima = response;
          },
        (error) => console.log(error),
          );
        }
      }

}
