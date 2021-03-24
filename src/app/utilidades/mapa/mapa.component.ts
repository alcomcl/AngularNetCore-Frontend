import { Coordenada, CoordenadaConMensaje } from './coordenada';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker } from 'leaflet'

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  /**
   * Parametro para este componente que un futuro permitira recibir varias coordenadas
   */
  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = [];

  @Input()
  soloLectura: boolean = false;

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  capas: Marker<any>[] = [];

  options: any;


  ngOnInit(): void {
    /**
     * Mapeamos cada una de las coordenadas a un arreglo de marcadores (marker)
     */
    this.capas = this.coordenadasIniciales.map( (valor) => {
      let marcador = marker([valor.latitud, valor.longitud]);
      
      // Si esta presente un mensaje, ejecutamos el código
      if (valor.mensaje){
        // establece un mensaje en el marcador del mapa indicando el nombre del cine
        marcador.bindPopup(valor.mensaje, {autoClose: false, autoPan: false});
      }

      return marcador;
    })

    //this.coordenadasIniciales[0].latitud === undefined ? -33.46988200572765 : this.coordenadasIniciales[0].latitud
    //this.coordenadasIniciales[0].longitud === undefined ? -70.69401263305939 : this.coordenadasIniciales[0].longitud
    //console.log(this.coordenadasIniciales[0].longitud)
    console.log(this.coordenadasIniciales)
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 14,
      center: latLng(this.establecerCoordenadasLatitudDefault(this.coordenadasIniciales),
        this.establecerCoordenadasLongitudDefault(this.coordenadasIniciales))

    };
  }

  /**
   * Establece una Latitud en el mapa por defecto, de lo contrario carga la ubicación registrada en la bd
   * @param coordenada 
   * @returns 
   */
  establecerCoordenadasLatitudDefault(coordenada: any): number {
    let latitud;
    if (coordenada.length === 0) {
      latitud = -33.46988200572765
    } else {
      latitud = this.coordenadasIniciales[0].latitud;
    }
    console.log(latitud)
    return latitud;
  }

  /**
   * Establece una Longitud en el mapa por defecto, de lo contrario carga la ubicación registrada en la bd
   * @param coordenada 
   * @returns 
   */
  establecerCoordenadasLongitudDefault(coordenada: any): number {
    let longitud;
    if (coordenada.length === 0) {
      longitud = -70.68229209891257
    } else {
      longitud = this.coordenadasIniciales[0].longitud;
    }
    //console.log(longitud)
    return longitud;
  }


  /**
   * Captura la ubicación geográfica cuando el usuario hace click en el mapa
   * @param event 
   */
  manejarClick(event: LeafletMouseEvent) {

    // Si soloLectura es true, eset componente será solo de lectura, lo que significa que no se podrá cambiar la ubicación de la chincheta en el mapa. Si soloLectura es false, quiere decir que se podrá seleccionar cualquier ubicación dentro del mapa
    if (!this.soloLectura) {
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;

      this.capas = [];

      // Cuando el usuario hace click en el mapa, se genera una chincheta
      this.capas.push(marker([latitud, longitud]));

      // Cuando el usuario hace click en el mapa, emitimos las coordenadas al componente padre
      this.coordenadaSeleccionada.emit({ latitud: latitud, longitud: longitud });
    }

  }

}
