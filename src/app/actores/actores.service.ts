import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { actorCreacionDTO, actorDTO, ActorPeliculaDTO } from './actor';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { formatearFecha } from '../utilidades/helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  private apiURL = environment.apiURL + 'actores';

  constructor(private http: HttpClient) { }

  public obtenerTodos(pagina: number, cantidadElementosAmostrar: number): Observable<any>{
    //return [{id: 1, nombre: 'Drama'}];
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAmostrar.toString());
    return this.http.get<actorDTO[]>(this.apiURL, {observe: 'response', params});
  }

  public obtenerPorId(id: number): Observable<actorDTO>{
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`);
  }

  public crear(actor: actorCreacionDTO){
    const formData = this.construirFormData(actor);
    return this.http.post(this.apiURL, formData);
  }

  public editar(id: number, actor: actorCreacionDTO){
    const formData = this.construirFormData(actor);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public obtenerPorNombre(nombre: string): Observable<ActorPeliculaDTO[]>{
    /* Tenemos que indicar el contentType de la petición Http, ya que enviaremos un string y por defecto cuando enviamos un string, Angular por defecto cambia el ContentType a text/plane por lo que debemos pasar ese string a un Json */
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<ActorPeliculaDTO[]>(`${this.apiURL}/buscarPorNombre`,
    JSON.stringify(nombre), {headers} );
  }

  private construirFormData(actor: actorCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia){
      formData.append('boigrafia', actor.biografia);
    }
    if (actor.fechaNacimiento){
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }
    if (actor.foto){
      formData.append('foto', actor.foto);
    }
    return formData;
  }
}
