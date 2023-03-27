import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gisfService : GifsService){};

  buscar(){
    const buscar = this.txtBuscar.nativeElement.value;
    this.gisfService.buscarGifs(buscar);
    this.txtBuscar.nativeElement.value="";
  }

}
