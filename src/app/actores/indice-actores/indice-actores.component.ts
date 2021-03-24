import { ActoresService } from './../actores.service';
import { Component, OnInit } from '@angular/core';
import { actorDTO } from '../actor';
import { HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material';
import { generoDTO } from 'src/app/generos/genero';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  actores: actorDTO[];
  columnasAmostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(private actoresService: ActoresService) { }

  ngOnInit() {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAmostrar){
    this.actoresService.obtenerTodos(pagina, cantidadElementosAmostrar)
      .subscribe( (respuesta: HttpResponse<actorDTO[]>) => {
        this.actores = respuesta.body;
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
    this.actoresService.borrar(id)
    .subscribe( () => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.log(error))
  }

}
