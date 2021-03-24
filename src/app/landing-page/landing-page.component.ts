import { PeliculasService } from './../peliculas/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from '../peliculas/pelicula';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  peliculasEnCines: PeliculaDTO[];
  peliculasProximosEstrenos: PeliculaDTO[];
  title = 'front-end';

  constructor(
    private peliculasService: PeliculasService
  ) { }

  ngOnInit() {

    // setTimeout(() => {

    //   this.peliculasEnCines = [
    //     {
    //       titulo: 'Spider-Man',
    //       fechaLanzamiento: new Date(),
    //       precio: 2500,
    //       poster: 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UX182_CR0,0,182,268_AL_.jpg'
    //     },
    //     {
    //       titulo: 'Moana',
    //       fechaLanzamiento: new Date('2016-11-14'),
    //       precio: 2500,
    //       poster: 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_UX182_CR0,0,182,268_AL_.jpg'
    //     },
        
    //   ];

    //   this.peliculasProximosEstrenos = [
    //     {
    //       titulo: 'Rocky 4',
    //       fechaLanzamiento: new Date(),
    //       precio: 2500,
    //       poster: 'https://m.media-amazon.com/images/M/MV5BMTg3ODk5ODE0NV5BMl5BanBnXkFtZTcwNDkzODM1NA@@._V1_UX182_CR0,0,182,268_AL_.jpg'
    //     },
    //     {
    //       titulo: 'Coco',
    //       fechaLanzamiento: new Date('2016-11-14'),
    //       precio: 2500,
    //       poster: 'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_UY268_CR3,0,182,268_AL_.jpg'
    //     },
    //     {
    //       titulo: 'El conjuro',
    //       fechaLanzamiento: new Date('2016-11-14'),
    //       precio: 2500,
    //       poster: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_UX182_CR0,0,182,268_AL_.jpg'
    //     }
    //   ];

    // }, 1000);

    this.peliculasService.obtenerLandingPage().subscribe(landingPage => {
      this.peliculasEnCines = landingPage.enCines;
      this.peliculasProximosEstrenos = landingPage.proximosEstrenos;
    })

  }

  duplicarNumero(numero: number): number {
    return numero * 2;
  }

  manejarRated(voto: number): void{
    alert(voto);
  }

}
