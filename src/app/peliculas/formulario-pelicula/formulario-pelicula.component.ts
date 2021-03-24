import { MultipleSelectorModel } from './../../utilidades/selector-multiple/multipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from './../pelicula';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActorPeliculaDTO } from 'src/app/actores/actor';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  public form: FormGroup;
  
  @Input()
  modelo: PeliculaDTO;

  @Input()
  errores: string[] = [];

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  /**
   * Creamos un arreglo de valores para simular que vienen de una bd
   */
  // generosNoSeleccionados: MultipleSelectorModel[] = [
  //   {llave: 1, valor: 'Drama'},
  //   {llave: 2, valor: 'Acción'},
  //   {llave: 3, valor: 'Comedia'}
  // ];
  // cinesNoSeleccionados: MultipleSelectorModel[] = [
  //   {llave: 1, valor: 'CinePlanet Plaza Oeste'},
  //   {llave: 2, valor: 'Cine Hoyts Estación Central'},
  //   {llave: 3, valor: 'CinePlanet Florida Center'}
  // ];

  @Input()
  generosNoSeleccionados: MultipleSelectorModel[];

  @Input()
  cinesNoSeleccionados: MultipleSelectorModel[];

  @Input()
  actoresSeleccionados: ActorPeliculaDTO[] = [];

  @Input()
  generosSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  cinesSeleccionados: MultipleSelectorModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router  
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      titulo: ['', {
        validator: [Validators.required]
      }],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    });

    /**
     * Aplicamos patchValue para hacer coincidir los valores de la propiedad modelo
     * con los campos del formulario
     */
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }

    console.log(this.modelo)
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
  }

  changeMarkdown(texto: string){
    this.form.get('resumen').setValue(texto);
  }

  guardarCambios(){
    //Guardamos los generos seleccionados
    const generosIds = this.generosSeleccionados.map(valor => valor.llave);
    console.log(generosIds);
    //Seteamos el campo generosId del form con la constante generosIds
    this.form.get('generosIds').setValue(generosIds);

    //Guardamos los cines seleccionados
    const cinesIds = this.cinesSeleccionados.map(valor => valor.llave);
    console.log(cinesIds);
    //Seteamos el campo cinesId del form con la constante cinesIds
    this.form.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id, personaje: val.personaje}
    });
    this.form.get('actores').setValue(actores);

    //Emitimos el valor completo del form al componente padre que lo necesite
    this.OnSubmit.emit(this.form.value);
  }

}
