import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { toBase64 } from '../helpers';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  imagenBase64: string;

  @Input()
  urlImagenActual: string;

  @Output()
  archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();

  constructor() { }

  ngOnInit() {
  }

  change(event: any){
    /**
     * event.target.files.tength -> linea para ver cuantos archivos fueron 
     * seleccionados
     */
    if (event.target.files.length > 0){
      //Obtenemos el archivo seleccionado
      const file: File = event.target.files[0];

      /**
       * Convertimos la variable file a Base64, con el fin de tener una representación del mismo en una cadena 
       */ 
      toBase64(file).then((value: string) => this.imagenBase64 = value)
      .catch(error => console.log(error));

      /**
       * Eviamos la imagen al componente padre para ser procesada en el formulario
       */
      this.archivoSeleccionado.emit(file);

      /**
       * Al iniciar este componente, se carga la imagen del actor, pero si el usuario 
       * selecciona otra imagen, la imagen por defecto se reemplaza por la nueva.
       */
      this.urlImagenActual = null;
    }
  }

}
