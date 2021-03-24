import { Coordenada } from './../../utilidades/mapa/coordenada';
import { cineCreacionDTO } from './../cine';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css']
})
export class FormularioCineComponent implements OnInit {

  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  modelo: cineCreacionDTO;

  @Output()
  guardarCambios: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  coordenadasIniciales: Coordenada[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', {
        validators: [
          Validators.required
        ]
      }],
      latitud: ['', {
        validators: [Validators.required]
      }],
      longitud: ['', {
        validators: [Validators.required]
      }]
    });

    if (this.modelo !== undefined) {
      //console.log(this.modelo)
      this.form.patchValue(this.modelo);
      this.coordenadasIniciales.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud});
    }
  }

  /**
   * Metodo que recibe desde el componente hijo mapa.componente los datos de la ubicacion de un cine
   */
  coordenadaSeleccionada(coordenada: Coordenada) {
    this.form.patchValue(coordenada);
  }

  /**
   * Metodo que envía los datos ingresados en el form
   */
  OnSubmit() {
    this.guardarCambios.emit(this.form.value);
  }

}
