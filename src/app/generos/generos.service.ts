import { generoDTO, generoCreacionDTO } from './genero';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private apiURL = environment.apiURL + 'generos';

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodos(pagina: number, cantidadElementosAmostrar: number): Observable<any>{
    //return [{id: 1, nombre: 'Drama'}];
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAmostrar.toString());
    return this.http.get<generoDTO[]>(this.apiURL, {observe: 'response', params});
  }

  // {observe: 'response'} : para recibir los datos de la cabecera

  public crear(genero: generoCreacionDTO){
    return this.http.post(this.apiURL, genero);
  }

  public editar(id: number, genero: generoCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}`, genero);
  }

  public obtenerPorId(id: number): Observable<generoDTO>{
    return this.http.get<generoDTO>(`${this.apiURL}/${id}`);
  }
  
  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
