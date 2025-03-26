import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { TareaService } from '../../servicios/tareaService';
import { Tarea } from '../../modelos/tareas';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { DatePipe } from '@angular/common';      // Import DatePipe
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ActualizarTareaDTO } from '../../dtos/actualizarTareaDTO';
import { MatDialog } from '@angular/material/dialog'; 
import { DialogComponent } from '../dialog/dialog.component';
import { TareasFormComponent } from './tareas-form/tareas-form.component';
import { TareasActualizarComponent } from './tareas-actualizar/tareas-actualizar.component';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [MatTableModule,MatButtonModule, MatCheckboxModule, CommonModule, DatePipe, MatIconModule, RouterModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss',
  providers: [TareaService]
})
export class TareasComponent implements OnInit{

  dataSource : Tarea[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'estado', 'fechacreacion','acciones'];

  errorMessage :string= '';
  constructor(private tareasService: TareaService, private router: Router,private dialog: MatDialog){
    
  }
  
  ngOnInit() {
    this.getData();
  }

 confirmarBorrar(tarea: Tarea){
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '300px',  
    data: { message: 'Deseas borrar la tarea ' + tarea.Titulo + '?' }  
  });
    
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.borrarTarea(tarea.id);
    } else {
      this.getData();
      dialogRef.close();      
    }
  });
 }

 borrarTarea(id:string){
    this.tareasService.BorrarTarea(id).subscribe({
      next: (response) => {       
        this.getData();
      },
      error: (error) => {
        console.error('Error fetching data', error); 
      },
      complete: () => {
        console.log('Request completed'); 
      }
     }     
    )
  }

  actualizarTarea(tarea:Tarea){

    this.tareasService.ActualizarTarea(tarea, tarea.id).subscribe({
      next: (response) => {
          this.getData();
      },
      error: (error) => {
        console.error('Error fetching data', error); 
      },
      complete: () => {
        console.log('Request completed'); 
      }
    });

  }

  inicio(){
    this.router.navigate(['/home']);  
  }

  getData(){
   
    this.tareasService.ObtenerTareas().subscribe({     
      next: (response) => {
                this.dataSource = response;
        },
        error: (error) => {        
          console.error('Error fetching data', error); 
        },
        complete: () => {        
          console.log('Completado'); 
        }
     })
  }

  actualizarEstado(tarea:Tarea, estado: boolean){
    const tareaDTO: ActualizarTareaDTO = new ActualizarTareaDTO(
      tarea.Titulo,
      tarea.Descripcion,
      !tarea.Estado, // Cambia el estado
    );   

    this.tareasService.ActualizarTarea(tareaDTO, tarea.id).subscribe({
      next: (response) => {
        this.getData();
      },
      error: (error) => {
        console.log(error);
        console.error('Error obteniendo data', error); 
      },
      complete: () => {        
        console.log('Completado'); 
      }
    });
  }

  agregarTarea(){
    const dialogRef = this.dialog.open(TareasFormComponent, {
      width: '500px',  
      data: {}  
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      } else {
        console.log('Dialog was closed without data');
      }
    });
  }

  actualizarTareaModal(tarea: Tarea){
    const dialogRef = this.dialog.open(TareasActualizarComponent, {
      width: '500px',  
      data: {tarea}  
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      } else {
        console.log('Dialog was closed without data');
      }
    });
  }

}
