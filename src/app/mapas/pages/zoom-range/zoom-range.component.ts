import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }

    .row{
      background-color: white;
      position:fixed;
      bottom: 50px;
      left: 50px;
      padding: 6px;
      border-radius: 5px;
      z-index: 999;
      width:300px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  //Conecta el #mapa del zoom-range.html
  @ViewChild('mapa') divMapa!: ElementRef
  mapa !: mapboxgl.Map;
  zoomLevel: number = 12;
  center: [number,number] = [-71.958331,-36.434009]
  constructor() { }

  //Destruir los events creados 
  ngOnDestroy(): void {
    this.mapa.off('zoom',() => {});
    this.mapa.off('zoomend',() => {});
    this.mapa.off('move',() => {});    
  }
  
  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //Listener
    this.mapa.on('zoom', (ev)=>{
      this.zoomLevel = this.mapa.getZoom(); 
    });
    this.mapa.on('zoomend', (ev) => {
      if( this.mapa.getZoom() > 18){
        this.mapa.zoomTo(18);
      }
    });
    // Movimiento del mapa
    this.mapa.on('move', (eve)=>{
      const target = eve.target;
      const {lng, lat } = target.getCenter();
      this.center = [ lng , lat];
    });
  }

  zoomIn(){
    this.mapa.zoomIn();

  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomCambio(valor: string){
    this.mapa.zoomTo(Number(valor));    
  }

}
