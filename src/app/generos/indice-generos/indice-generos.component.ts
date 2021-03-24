import { GenerosService } from './../generos.service';
import { Component, OnInit } from '@angular/core';
import { generoDTO } from '../genero';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator/typings/paginator';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  generos: generoDTO[];
  columnasAmostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(
    private generoService: GenerosService,
  ) { }

  ngOnInit() {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAmostrar){
    this.generoService.obtenerTodos(pagina, cantidadElementosAmostrar)
      .subscribe( (respuesta: HttpResponse<generoDTO[]>) => {
        this.generos = respuesta.body;
        this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
      }, error => {
        console.log(error) 
      });
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  borrar(id: number){
    this.generoService.borrar(id)
    .subscribe( () => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.log(error))
  }

}
