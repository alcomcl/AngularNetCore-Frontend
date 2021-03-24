import { PeliculaCreacionDTO, PeliculaPostGet, PeliculaDTO, LandingPageDTO, PeliculaPutGet } from './pelicula';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatearFecha } from '../utilidades/helpers';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  apiURL = environment.apiURL + 'peliculas';

  constructor(
    private http: HttpClient
  ) { }

  public postGet(): Observable<PeliculaPostGet>{
    // get<PeliculaPostGet> = deserializamos a PeliculaPostGet
    return this.http.get<PeliculaPostGet>(`${this.apiURL}/postget`);
  }

  public putGet(id: number): Observable<PeliculaPutGet> {
    return this.http.get<PeliculaPutGet>(`${this.apiURL}/putget/${id}`);
  }

  public obtenerPorId(id: number): Observable<PeliculaDTO>{
    return this.http.get<PeliculaDTO>(`${this.apiURL}/${id}`);
  }

  public crear(pelicula: PeliculaCreacionDTO){
    const formData = this.ConstruirFormData(pelicula);
    return this.http.post(this.apiURL, formData);
  }

  public obtenerLandingPage(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(`${this.apiURL}`);
  }

  public ConstruirFormData(pelicula: PeliculaCreacionDTO): FormData{
    const formData = new FormData();

    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));
    if (pelicula.fechaLanzamiento){
      formData.append('fechaLanzamiento', formatearFecha(pelicula.fechaLanzamiento));
    }
    if (pelicula.poster){
      formData.append('poster', pelicula.poster);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  
  }
}
