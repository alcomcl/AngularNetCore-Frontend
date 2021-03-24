import { cineCreacionDTO, cineDTO } from './../cine';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinesService } from '../cines.service';
import { parsearErroresAPI } from 'src/app/utilidades/helpers';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  //modelo: cineDTO = {id: 1, nombre: 'CinePlanet Alameda', latitud: -33.4526364724765, longitud: -70.68229209891257};
   
  modelo: cineDTO;
  errores: string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cinesService: CinesService
  ) { }

  ngOnInit() {
    //console.log(this.modelo)
    //console.log(this.modelo.nombre)
    this.activatedRoute.params.subscribe( (params) => {
      this.cinesService.obtenerPorId(params.id)
      .subscribe( cine => {
        this.modelo = cine
        console.log(this.modelo)
      }, error => {
        this.errores = parsearErroresAPI(error);
        
      });
    });
    
  }

  guardarCambios(cine: cineCreacionDTO) {
    //...guardar los cambios.
    this.cinesService.editar(this.modelo.id, cine)
    .subscribe( () => {
      this.router.navigate(['/cines']);
    }, error => {
      this.errores = parsearErroresAPI(error);
    })
    console.log(cine);
    
  }

}
