import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

//Sirve como un controlador, aqui se especifican
//metodos y se inyecta a la vista en este caso la home-page
@Injectable()
export class ApiService {

  public cardItems: any[];
  datos: JSON;
  userdb: JSON;
  cf:any[];

  constructor(private http:Http) {
   //this.getTarjetas();
  }

}
