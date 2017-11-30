import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController } from 'ionic-angular';
import {TarjetaModel} from '../../models/tarjeta-model';
import { Http, Headers} from '@angular/http';
import { Chart } from 'chart.js';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {
  @ViewChild('lineCanvas') lineCanvas;
  public agregar: boolean;
  public info: TarjetaModel;
  private ciudades:string[];
  private cf: string[];
  private id: string;
  private data: any;

  lineChart: any;
  constructor(
    private http:Http,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private navCtrl: NavController
  ) {
    this.info = navParams.get('item');
    this.agregar = navParams.get('agregar');
    this.ciudades = navParams.get('ciudades');
    this.id = navParams.get('id');
    this.data = navParams.get('data');
    console.log(this.ciudades);

  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  agregarCiudad(ciudad:string){
    //console.log(this.ciudades[0]["location"]["city"]);
    var aux = this.convertirArreglo();
    aux.push(ciudad);

    var js = {
      'ciudadesFav' : aux
    }
    var data = JSON.stringify(js);
    var header = new Headers({"Content-Type":"application/json"})
    this.http.patch('http://localhost:3000/api/Usuarios/'+this.id, data, {headers: header}).subscribe();
    this.dismiss();
    //this.navCtrl.pop();
  }

  eliminarCiudad(ciudad:string){
    var aux = this.convertirArreglo();
    var nuevo= [];

    for(var x = 0; x < aux.length; x++){
      //console.log(aux[x]);
      //console.log(ciudad);
      if (aux[x]!= ciudad){
        nuevo.push(this.ciudades[x]["location"]["city"]+", "+this.ciudades[x]["location"]["region"]);
      }
    }

    var js = {
      'ciudadesFav' : nuevo
    }

    var data = JSON.stringify(js);
    //console.log(data);
    var header = new Headers({"Content-Type":"application/json"})
    this.http.patch('http://localhost:3000/api/Usuarios/'+this.id, data, {headers: header}).subscribe();
    this.dismiss();
    //this.navCtrl.pop();
  }

  convertirArreglo(){
    var aux = [];
    if(this.ciudades!= undefined){
      for(var x = 0; x < this.ciudades.length;x++){
        //console.log(this.ciudades[x]["location"]["city"]);
        aux.push(this.ciudades[x]["location"]["city"]+", "+this.ciudades[x]["location"]["region"]);
        //console.log(aux[x]);
      }
    }
    return aux;
  }

  ionViewDidLoad() {
    var dayLabel = [];
    var dayForecastHigh = [];
    var dayForecastLow = [];
    this.info.forecast.forEach(function(element) {
      dayLabel.push(element.day);
      dayForecastHigh.push(element.high);
      dayForecastLow.push(element.low);
    });
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: 'line',
            data: {
                labels: dayLabel,
                datasets: [
                    {
                        label: "Max.",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: dayForecastHigh,
                        spanGaps: false,
                    },
                    {
                        label: "Min.",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(196,88,80,0.4)",
                        borderColor: "rgba(196, 88, 80, 1)",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: dayForecastLow,
                        spanGaps: false,
                    }
                ]
            },
            options: {
              legend: {
                  labels: {
                      fontColor: "white",
                  }
              },
              scales: {
              xAxes: [{
                          gridLines: {
                              color: "rgba(0, 0, 0, 0)",
                          },
                          ticks: {
                            fontColor: "white"
                          }
                      }],
              yAxes: [{
                          gridLines: {
                              color: "rgba(0, 0, 0, 0)",
                          },
                          display: false
                      }]
              }
            }
        });
  }

}
