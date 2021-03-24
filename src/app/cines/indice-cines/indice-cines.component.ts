import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent implements OnInit {

  cines: cineDTO[];
  columnasAmostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(
    private cinesService: CinesService,
  ) { }

  ngOnInit() {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAmostrar){
    this.cinesService.obtenerTodos(pagina, cantidadElementosAmostrar)
      .subscribe( (respuesta: HttpResponse<cineDTO[]>) => {
        this.cines = respuesta.body;
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
    this.cinesService.borrar(id)
    .subscribe( () => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.log(error))
  }

}
