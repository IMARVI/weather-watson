import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleClimaPage } from './detalle-clima';

@NgModule({
  declarations: [
    DetalleClimaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleClimaPage),
  ],
})
export class DetalleClimaPageModule {}
