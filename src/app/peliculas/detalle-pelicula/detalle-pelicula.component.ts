import { CoordenadaConMensaje } from './../../utilidades/mapa/coordenada';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from './../peliculas.service';
import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from '../pelicula';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {

  pelicula: PeliculaDTO;
  fechaLanzamiento: Date;
  trailerURL: SafeResourceUrl;
  coordenadas: CoordenadaConMensaje[] = [];

  constructor(
    private peliculasServices: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.peliculasServices.obtenerPorId(params.id).subscribe(pelicula => {
        
        
        this.pelicula = pelicula;
        this.fechaLanzamiento = new Date(this.pelicula.fechaLanzamiento);
        //this.trailerURL = this.generarURLYoutubeEmbed(this.pelicula.trailer);
        this.coordenadas = pelicula.cines.map(cine => {
          return {
            longitud: cine.longitud,
            latitud: cine.latitud,
            mensaje: cine.nombre
          }
        })
        // console.log(pelicula);
        // console.log(this.trailerURL);
        // console.log(this.coordenadas)
      })
    })
  }

  /**
   * Metodo que permite extraer el id de la url del video de youtube para que este lo coloque en el formato adecuado
   * @param url 
   * @returns 
   */
  generarURLYoutubeEmbed(url: any): SafeResourceUrl {
    if ( !url){
      return '';
    }
    // Extraemos el id del video
    var video_id = url.split('v=')[1];
    var posicionAmpersand = video_id.indexof('&');
    if (posicionAmpersand !== -1){
      video_id = video_id.substring(0, posicionAmpersand);
    }

    // Formato de video de Youtube que nos permitirá integrar un video a la aplicacion
    return this.sanitizer.bypassSecurityTrustUrl(`https://www.youtube.com/embed/${video_id}`);

  }

}
