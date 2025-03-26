import { Component, Inject, NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatInputModule } from '@angular/material/input';          
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';  
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TareaService } from '../../../servicios/tareaService';
import { HttpClientModule } from '@angular/common/http';
import { ActualizarTareaDTO } from '../../../dtos/actualizarTareaDTO';


@Component({
  selector: 'app-tareas-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButton,
    CommonModule,
   HttpClientModule],
  templateUrl: './tareas-actualizar.component.html',
  styleUrl: './tareas-actualizar.component.scss',
  providers:[TareaService]
})
export class TareasActualizarComponent {

  form: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<TareasActualizarComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any  ,
    private tareaService: TareaService
  ){

    this.form = this.fb.group({
      titulo: [this.data.tarea.Titulo, Validators.required],
      descripcion: [this.data.tarea.Descripcion, [Validators.required]],
      estado: [this.data.tarea.Estado]  
    });

  }


  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
     
      const tareaDTO: ActualizarTareaDTO = new ActualizarTareaDTO(
        formData.titulo,
        formData.descripcion,
        formData.estado
      );   

      this.tareaService.ActualizarTarea(tareaDTO, this.data.tarea.id).subscribe({
        next: (res)=>{
          this.dialogRef.close(true); 
        },
        error: (error)=>{
          console.log(error);
        },
        complete: ()=>{
          console.log('completado');
        }
      })
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}

