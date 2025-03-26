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
import { GuardarTareaDTO } from '../../../dtos/guardarTareaDTO';
import { TareaService } from '../../../servicios/tareaService';
import { HttpClientModule } from '@angular/common/http';


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
  templateUrl: './tareas-form.component.html',
  styleUrl: './tareas-form.component.scss',
  providers:[TareaService]
})
export class TareasFormComponent {

  form: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<TareasFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any  ,
    private tareaService: TareaService
  ){
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', [Validators.required]],
      estado: [false]  
    });
  }


  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
     
      const tareaDTO: GuardarTareaDTO = new GuardarTareaDTO(
        formData.titulo,
        formData.descripcion,
        formData.estado
      );   

      this.tareaService.CrearTarea(tareaDTO).subscribe({
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
