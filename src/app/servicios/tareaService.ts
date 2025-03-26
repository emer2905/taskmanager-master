import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tarea } from '../modelos/tareas';
import { ActualizarTareaDTO } from '../dtos/actualizarTareaDTO';
import { GuardarTareaDTO } from '../dtos/guardarTareaDTO';


const API_URL = 'https://app-nvc5nplm7q-uc.a.run.app/api/tasks';

@Injectable({
  providedIn: 'root',
})
export class TareaService {

  constructor(private http: HttpClient) {}

  ObtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(API_URL); 
  }
  
  ObtenerTarea(tarea: Tarea): Observable<any> {
    return this.http.get<Tarea>(API_URL + "/"+ tarea.id); 
  }

  CrearTarea(tarea: GuardarTareaDTO): Observable<any> {
    return this.http.post<any>(API_URL, tarea);
  }

  BorrarTarea(id:string): Observable<any> {

    return this.http.delete<any>(API_URL + "/"+ id);
  }

  ActualizarTarea(tarea: ActualizarTareaDTO, id: string): Observable<any> {
    return this.http.put<any>(API_URL+ "/"+ id, tarea);
  }




  
}