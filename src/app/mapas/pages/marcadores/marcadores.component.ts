import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MarcadorColor } from 'src/app/interfaces/marcadorcolor.interfaces';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li{
      cursor:pointer;
    }
    `
  ]
})

export class MarcadoresComponent implements AfterViewInit {

  //Conecta el #mapa del zoom-range.html
  @ViewChild('mapa') divMapa!: ElementRef
  mapa !: mapboxgl.Map;
  zoomLevel: number = 14;
  punto: [number,number] = [-71.958331,-36.434009]
  marcadores: MarcadorColor[] = [];

  
  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.punto,
      zoom: this.zoomLevel
    });
    
    /*
    Coloca un texto en vez del marcador
    -----------------------------------
    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = "DonGraffth";
    // Referencia del marcador
    const marker = new mapboxgl.Marker({
      element: markerHtml
    }).*/

    /** Marcador de manera estatica 
    const marker = new mapboxgl.Marker().
    // La posicion del marcador
    setLngLat(this.center).
    //Se agrega el marcador al mapa
    addTo(this.mapa);
    */
    this.leerMarcadorLocalStorage();
  }

  // Mover la vista al marcador
  irMarcador(dir: mapboxgl.Marker){
    console.log(dir.getLngLat());
    
    this.mapa.flyTo({
      center: dir?.getLngLat(),
      zoom: 16
    });
  }

  addMarcador(){
    const colorMarcadorAleatorio = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color: colorMarcadorAleatorio
    }).setLngLat(this.punto).addTo(this.mapa);

    this.marcadores.push({
      colormarcador: colorMarcadorAleatorio,
      markermarcador: nuevoMarcador
    });
    this.guardarMarcadoresLocalStorage()
  }

  guardarMarcadoresLocalStorage(){

    const lnglatArreglo: MarcadorColor[] = [];

    this.marcadores.forEach(m=>{
      const colormar = m.colormarcador;
      const {lng, lat}= m.markermarcador!.getLngLat();

      //Poblar array
      lnglatArreglo.push({
        colormarcador: colormar,
        centro: [lng, lat]
      });
    })
    console.log(lnglatArreglo);
    
    localStorage.setItem('marcadores', JSON.stringify(lnglatArreglo))
  }

  leerMarcadorLocalStorage(){
    if( !localStorage.getItem('marcadores')){
      return;
    }

    const lnglatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    
    lnglatArr.forEach(m => {

      const newMarker = new mapboxgl.Marker({
        color: m.colormarcador,
        draggable: true
      }).setLngLat(m.centro!)
        .addTo(this.mapa);
        
        this.marcadores.push({
          markermarcador: newMarker,
          colormarcador: m.colormarcador
        });
    })
  }
}
