import { parsearErroresAPI } from 'src/app/utilidades/helpers';
import { MultipleSelectorModel } from './../../utilidades/selector-multiple/multipleSelectorModel';
import { PeliculasService } from './../peliculas.service';
import { PeliculaCreacionDTO } from './../pelicula';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  errores: string[] = [];

  constructor(
    private peliculasService: PeliculasService
  ) { }

  ngOnInit(): void {
    this.peliculasService.postGet()
      .subscribe(res => {

        this.generosNoSeleccionados = res.generos.map(genero => {
          return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });

        this.cinesNoSeleccionados = res.cines.map( cine => {
          return <MultipleSelectorModel>{ llave: cine.id, valor: cine.nombre }
        }, error => {console.log( error )});

      })
  }

  

  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.crear(pelicula).subscribe( () => console.log('exitoso'),
    error => this.errores = parsearErroresAPI(error));
  }

}
