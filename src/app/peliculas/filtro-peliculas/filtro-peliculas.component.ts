import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  form: FormGroup
  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Comedia' },
    { id: 3, nombre: 'Acción' },
    { id: 4, nombre: 'Infantil' },
  ];

  peliculas = [
    {titulo: 'Spider-Man: Far frome Home', enCines: false, proximosEstrenos: true, generos: [1,3], poster: 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UX182_CR0,0,182,268_AL_.jpg'},
    {titulo: 'Moana', enCines: true, proximosEstrenos: false, generos: [2,4], poster: 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_UX182_CR0,0,182,268_AL_.jpg'},
    {titulo: 'Coco', enCines: true, proximosEstrenos: false, generos: [2,4], poster: 'https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkMDE3ZjAxXkEyXkFqcGdeQXVyODIxMzk5NjA@._V1_UY268_CR3,0,182,268_AL_.jpg'},
    {titulo: 'Inception', enCines: false, proximosEstrenos: true, generos: [3], poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg'},
  ];

  peliculasOriginal = this.peliculas;
  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresURL();

    /**
     * this.buscarPeliculas(this.form.value) -> en caso de que la url cargada tenga
     * parametros de busqueda, se genera la busqueda automaticamente.
     */
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges
      .subscribe(valores => {
        this.peliculas = this.peliculasOriginal;
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      })
  }

  /**
   * Lee valores de la url y escribe esos valores dentro del form de filtrado
   * para peliculas.
   * http://localhost:4200/peliculas/buscar?titulo=Spider&generoId=2
   * Al compartir la url con filtros de busqueda, estos se incrustan en el form.
   */
  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe( (paramsURL) => {
      let objeto: any = {};

      if (paramsURL.titulo){
        objeto.titulo = paramsURL.titulo;
      }

      if (paramsURL.generoId){
        objeto.generoId = Number(paramsURL.generoId);
      }

      if (paramsURL.proximosEstrenos){
        objeto.proximosEstrenos = paramsURL.proximosEstrenos;
      }

      if (paramsURL.enCines){
        objeto.enCines = paramsURL.enCines;
      }

      this.form.patchValue(objeto);
    })
  }

  /**
   * Al ingresar busquedas en el formulario, este metodo escribe esa busqueda como
   * parametros de la URL
   */
  private escribirParametrosBusquedaEnURL(){
    let queryStrings = [];
    let valoresFormulario = this.form.value;

    if (valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if (valoresFormulario.generoId != '0'){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if (valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if (valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    /**
     * Reescribe la url con parametros de busqueda
     */
    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));

  }

  buscarPeliculas(valores: any){
    if (valores.titulo){
      
      //Transforma "valores.titulo" a la primjera letra en Mayus y el resto de la palabra a minuscula.
      valores.titulo = valores.titulo[0].toUpperCase() + valores.titulo.toLowerCase().slice(1);

      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(
         valores.titulo) !== -1);
    }

    if (valores.generoId !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if (valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if (valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  limpiarForm(){
    this.form.patchValue(this.formularioOriginal);
  }

}
