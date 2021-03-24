import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  @Input()
  peliculas: PeliculaDTO[];

  constructor() { }

  ngOnInit() {
  }

  removerPelicula(indicePelicula: number): void{
    this.peliculas.splice(indicePelicula, 1);
  }

}
