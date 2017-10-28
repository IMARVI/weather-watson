import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import {TarjetaModel} from '../../models/tarjeta-model';

@IonicPage()
@Component({
  selector: 'page-add-task-modal',
  templateUrl: 'add-task-modal.html',
})
export class AddTaskModalPage {

  public info: TarjetaModel;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.info = navParams.data;
    console.log(this.info);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskModalPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
