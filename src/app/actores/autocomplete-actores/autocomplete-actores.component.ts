import { ActoresService } from './../actores.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTable } from '@angular/material';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActorPeliculaDTO } from '../actor';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  control: FormControl = new FormControl();

  // actores = [
  //   {nombre: 'Tom Holland', personaje: '',foto: 'https://m.media-amazon.com/images/M/MV5BNzZiNTEyNTItYjNhMS00YjI2LWIwMWQtZmYwYTRlNjMyZTJjXkEyXkFqcGdeQXVyMTExNzQzMDE0._V1_UX214_CR0,0,214,317_AL_.jpg'},
  //   {nombre: 'Tom Hanks', personaje: '',foto: 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UY317_CR2,0,214,317_AL_.jpg'},
  //   {nombre: 'Samuel L. Jackson', personaje: '',foto: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg'},
  // ];


  /**
   * Creamos esta variable para poder filtrar el array original de actores
   */
  //actoresOriginal = this.actores;

  @Input()
  actoresSeleccionados: ActorPeliculaDTO[] = [];

  actoresAmostrar: ActorPeliculaDTO[] = [];

  /**
   * Array que define las columnas en la tabla a mostrar
   */
  columnasAmostrar = ['imagen', 'nombre', 'personaje', 'acciones', 'acciones'];

  /**
   * Actualizamos la tabla cada vez que el usuario seleccione un actor.
   * Tomamos una referencia de la tabla desde la clase del componente usando view child
   */
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  constructor(
    private actoresService: ActoresService
  ) { }

  ngOnInit() {
    // this.control.valueChanges.subscribe(valor => {

    //   this.actores = this.actoresOriginal;

    /**
     * Linea para ignorar mayusculas y minusculas al momento de buscar actores
     */
    //   if (valor[0] !== undefined) {
    //     valor = valor[0].toUpperCase()  + valor.toLowerCase().slice(1);
    //   }

    //   this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1);
    // });

    this.control.valueChanges.subscribe(nombre => {
      return this.actoresService.obtenerPorNombre(nombre).subscribe(actores => {

        // if (actores[0] !== undefined) {
        //   actores = actores[0].toUpperCase() + actores.toLowerCase().slice(1);
        // }

        this.actoresAmostrar = actores;
        console.log(this.actoresAmostrar)
      })
    });
  }

  /**
   * Se ejecuta al momento que el usuario seleccione un actor de la lista
   */
  optionSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    /**
     * Actualizamos la tabla por cada selección del usuario
     */
    if (this.table !== undefined) {
      this.table.renderRows();
    }
  }

  eliminar(actor: any) {
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  /**
   * Permite reordenar los elementos del arreglo de actores según el arrastre realizado en la plantilla
   * @param event 
   */
  finalizarArrastre(event: CdkDragDrop<any[]>) {
    //Ubicamos el indice del actor seleccionado para arrastrar
    const indicePrevio = this.actoresSeleccionados.findIndex(actor => actor === event.item.data);

    /**
     * moveItemInArray() : funcion propia de angular material que nos permite reordenar una colleción.
     * event.currentIndex : se refiere al nuevo indice que toma el actor al ser reubicado.
     */
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);

    //Actualizamos la tabla
    this.table.renderRows();
  }

}
