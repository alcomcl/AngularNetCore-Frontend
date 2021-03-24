import { cineCreacionDTO} from './../cine';
import { Component, OnInit } from '@angular/core';
import { parsearErroresAPI } from 'src/app/utilidades/helpers';
import { Router } from '@angular/router';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent implements OnInit {

  public errores: string[] = [];

  constructor(
    private router: Router,
    private cinesService: CinesService
  ) { }

  ngOnInit(): void {

  }


  guardarCambios(cine: cineCreacionDTO) {
    //...guardar los cambios.
    this.cinesService.crear(cine).subscribe(() => {
      this.router.navigate(['/cines']);
    }, (error) => {
      this.errores = parsearErroresAPI(error);
      
    })
    
  }

}
