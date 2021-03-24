import { actorCreacionDTO, actorDTO } from './../actor';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActoresService } from '../actores.service';
import { parsearErroresAPI } from 'src/app/utilidades/helpers';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  // modelo: actorDTO = {nombre: 'Alex', fechaNacimiento: new Date(), foto: 'https://m.media-amazon.com/images/M/MV5BMTg3ODk5ODE0NV5BMl5BanBnXkFtZTcwNDkzODM1NA@@._V1_UX182_CR0,0,182,268_AL_.jpg'};

  modelo: actorDTO;
  errores: string[];

  constructor(
    //Servicio para detectar la ruta en la cual se encuentra el usuario
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private actoresService: ActoresService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.actoresService.obtenerPorId(params.id)
      .subscribe( actor => {
        this.modelo = actor
        //console.log(this.modelo)
      }, error => {
        this.errores = parsearErroresAPI(error);
        
      });
    });
  }

  guardarCambios(genero: actorCreacionDTO) {
    //...guardar los cambios.
    this.actoresService.editar(this.modelo.id, genero)
    .subscribe( () => {
      this.router.navigate(['/actores']);
    }, error => {
      this.errores = parsearErroresAPI(error);
    })
    console.log(genero);
    
  }

}
