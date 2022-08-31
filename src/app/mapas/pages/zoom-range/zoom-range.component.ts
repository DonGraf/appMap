import { Component, OnInit } from '@angular/core';
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
    }
    `
  ]
})
export class ZoomRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'mapazoom',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.958331,-36.434009],
      zoom: 18
    });
  }

}
