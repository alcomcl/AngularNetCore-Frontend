import { ActorPeliculaDTO } from 'src/app/actores/actor';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from './../peliculas.service';
import { PeliculaDTO, PeliculaCreacionDTO, PeliculaPutGet } from './../pelicula';
import { Component, OnInit } from '@angular/core';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  // modelo: PeliculaDTO = {
  //   titulo: 'InterStelar',
  //   trailer: 'abc',
  //   enCines: true,
  //   resumen: 'cualquier cosa',
  //   fechaLanzamiento: new Date(),
  //   poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg'
  // }

  modelo: PeliculaDTO;
  generosSeleccionados: MultipleSelectorModel[];
  generosNoSeleccionados: MultipleSelectorModel[];
  cinesSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  actoresSeleccionados: ActorPeliculaDTO[];
  errores: string[] = [];


  constructor(
    private peliculasServices: PeliculasService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      
      const id = params.id;
      this.peliculasServices.putGet(id).subscribe(peliculaPutGet => {

          this.modelo = peliculaPutGet.pelicula;

          this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
            return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
          });

          this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
            return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
          });

          this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map( cine => {
            return <MultipleSelectorModel>{ llave: cine.id, valor: cine.nombre }
          }, error => {console.log( error )});
  
          this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map( cine => {
            return <MultipleSelectorModel>{ llave: cine.id, valor: cine.nombre }
          }, error => {console.log( error )});

          this.actoresSeleccionados = peliculaPutGet.actores;

        })
    });
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log(pelicula);
  }

}
