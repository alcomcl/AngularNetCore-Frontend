import { GenerosService } from './../generos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDTO } from '../genero';
import { parsearErroresAPI } from 'src/app/utilidades/helpers';

@Component({
  selector: 'app-crer-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent implements OnInit {

  public errores: string[] = [];

  constructor(
    private router: Router,
    private generosService: GenerosService
  ) { }

  ngOnInit(): void {

  }


  guardarCambios(genero: generoCreacionDTO) {
    //...guardar los cambios.
    this.generosService.crear(genero).subscribe(() => {
      this.router.navigate(['/generos']);
    }, (error) => {
      this.errores = parsearErroresAPI(error);
      
    })
    
  }

}
