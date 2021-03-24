import { BrowserModule } from '@angular/platform-browser';
import { generoDTO } from './../genero';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generoCreacionDTO } from '../genero';
import { GenerosService } from '../generos.service';
import { parsearErroresAPI } from 'src/app/utilidades/helpers';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  // modelo: generoCreacionDTO = {nombre: 'Alex'};
  modelo: generoDTO;
  errores: string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private generosService: GenerosService
  ) { }

  ngOnInit() {
    //console.log(this.modelo)
    //console.log(this.modelo.nombre)
    this.activatedRoute.params.subscribe( (params) => {
      this.generosService.obtenerPorId(params.id)
      .subscribe( genero => {
        this.modelo = genero
      }, error => {
        this.errores = parsearErroresAPI(error);
        
      });
    });
    
    
  }

  guardarCambios(genero: generoCreacionDTO) {
    //...guardar los cambios.
    this.generosService.editar(this.modelo.id, genero)
    .subscribe( () => {
      this.router.navigate(['/generos']);
    }, error => {
      this.errores = parsearErroresAPI(error);
    })
    console.log(genero);
    
  }

}
