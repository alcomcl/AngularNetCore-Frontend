import { actorCreacionDTO, actorDTO } from './../actor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  form: FormGroup;
  imagenCambiada = false;

  /**
   * Input para recibir data desde el componente padre. En la pantilla padre se 
   * envía este parametro a traves de [modelo]
   */
  @Input()
  modelo: actorDTO;

  @Input()
  errores: string[] = [];

  /**
   * Ouput para enviar información al componente padre
   */
  @Output()
  OnSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nombre: ['', {
        validators: [Validators.required]
      }],
      fechaNacimiento: '',
      foto: '',
      biografia: ''
    });

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo); 
    }
  }

  cambioMarkdown(texto: string){
    this.form.get('biografia').setValue(texto);
  }

  archivoSeleccionado(file: File){
    this.imagenCambiada = true;
    this.form.get('foto').setValue(file);
  }

  onSubmit(){
    /**
     * Si el usuario edito a un actor pero no la foto, entonces mandamos el actor completo menos la imagen que no fue modificada.
     * Dejamos el valor de la imagen como nulo
     */
    if (!this.imagenCambiada){
      this.form.patchValue({'foto': null})
    }
    
    this.OnSubmit.emit(this.form.value);
  }

}
