import { parsearErroresAPI } from 'src/app/utilidades/helpers';
import { ActoresService } from './../actores.service';
import { actorCreacionDTO } from './../actor';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  errores: string[] = [];

  constructor(
    private actoresService: ActoresService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  guardarCambios(actor: actorCreacionDTO){
    this.actoresService.crear(actor)
    .subscribe( () => {
      this.router.navigate(['/actores']);
    }, (errores) => 
    {
      console.log(this.errores);
      this.errores = parsearErroresAPI(errores)
      
    })
  }

}
