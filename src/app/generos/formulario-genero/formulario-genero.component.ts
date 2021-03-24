import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Utilidades
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  form: FormGroup;

  @Input()
  errores: string[] = [];
  
  @Input()
  modelo: generoCreacionDTO;

  @Output()
  onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();


  constructor(
    private router: Router,
    private formBuilder: FormBuilder
    ) { }


  ngOnInit() {
    
    this.form = this.formBuilder.group({
      nombre: ['', {
        validators: [
          Validators.required, 
          Validators.minLength(3),
          primeraLetraMayuscula()
        ]
      }]
    });

    // Carga el nombre del genero en el formulario de edición
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }

    // this.form.get('nombre').valueChanges.subscribe( valor => {
    //   if (valor[0] !== undefined) {
    //     console.log('sin trimstar',valor)
    //     valor = valor.trimStart();
    //     console.log('trimstar',valor)
    //   }
    // })
  }

  guardarCambios(){
    /**
     * Cuando el usuario haga click, se emitirá un eventEmitter
     */
    this.onSubmit.emit(this.form.value);
    console.log(this.form.value);
    
  }


  obtenerErrorCampoNombre(){
    const campo = this.form.get('nombre');
    if (campo.hasError('required')){
      return 'El campo nombre es obligatorio';
    }

    if (campo.hasError('minlength')){
      return 'Ingrese al menos 3 caracteres';
    }

    if (campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }

}
