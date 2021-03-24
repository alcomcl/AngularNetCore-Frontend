import { MultipleSelectorModel } from './multipleSelectorModel';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  @Input()
  seleccionados: MultipleSelectorModel[] = [];
  
  @Input()
  noSeleccionados: MultipleSelectorModel[] = [];

  constructor() { }

  ngOnInit() {
  }

  seleccionar(item: MultipleSelectorModel, index: number){
    this.seleccionados.push(item);
    this.noSeleccionados.splice(index, 1);
  }

  deSeleccionar(item: MultipleSelectorModel, index: number){
    this.noSeleccionados.push(item);
    this.seleccionados.splice(index, 1);
  }

  seleccionarTodo(){
    /**
     * Pasamos todo desde los no seleccionados hacia el cuadro de seleccionados
     * y vaciamos el cuadro de no seleccionados
     */
    this.seleccionados.push(...this.noSeleccionados);
    this.noSeleccionados = [];
  }

  deSeleccionarTodo(){
    /**
     * Pasamos todo desde los seleccionados hacia el cuadro de no seleccionados
     * y vaciamos el cuadro de seleccionados
     */
    this.noSeleccionados.push(...this.seleccionados);
    this.seleccionados = [];
  }

}
