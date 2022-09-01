import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
    div{
      width: 100%;
      height: 150px;
      margin: 0;
    }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {

  //Como es obtiene de un input se captura antes de que aparezca
  @Input() lnglat: [number,number] = [0,0];
  @ViewChild('mapapropiedad') divMapa!: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lnglat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker().setLngLat(this.lnglat).addTo(mapa)
  }


}
