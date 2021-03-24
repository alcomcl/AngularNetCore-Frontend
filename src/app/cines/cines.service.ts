import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO, cineDTO } from './cine';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  private apiURL = environment.apiURL + 'cines';

  constructor(
    private http: HttpClient
  ) { }

  public obtenerTodos(pagina: number, cantidadElementosAmostrar: number): Observable<any>{
    //return [{id: 1, nombre: 'Drama'}];
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadElementosAmostrar.toString());
    return this.http.get<cineDTO[]>(this.apiURL, {observe: 'response', params});
  }

  public crear(cine: cineCreacionDTO){
    console.log(cine)
    return this.http.post(this.apiURL, cine);
  }

  public editar(id: number, cine: cineCreacionDTO){
    return this.http.put(`${this.apiURL}/${id}`, cine);
  }

  public obtenerPorId(id: number): Observable<cineDTO>{
    return this.http.get<cineDTO>(`${this.apiURL}/${id}`);
  }

  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

}
