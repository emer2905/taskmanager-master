import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../modelos/user';
import { UserService } from '../../servicios/userService';
import { HttpClientModule, HttpStatusCode } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [UserService]
})
export class LoginComponent {

  user: User = new User();
  errorMessage: string  = '';
  constructor(private userService:UserService, private router: Router,private dialog: MatDialog) {
   
  }

  onLogin() {
    
   var userExists = false; 
   var result = this.userService.login(this.user).subscribe({
    next:(response) => {       
      if(response == null)
      {
        const dialogRef = this.dialog.open(DialogComponent, {
          width: '300px',  
          data: { message: 'El usuario no existe. Deseas registrarte? ' + this.user.email }  
        });
          
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.createUser();
          } else {
            dialogRef.close();
          }
        });
      }
      else 
        this.router.navigate(['/tareas']);  
      
    },
    error: (error) =>{ 
      this.errorMessage = 'Ha ocurrido un error. Intenta Nuevamente.';
    },
    complete: ()=>{
      console.log('Completado'); 
    }
    
  })
}


createUser(){
  this.userService.createUser(this.user).subscribe({
    next: (response) => {      
         this.router.navigate(['./tareas'])  
    },
    error: (error) => {
      console.error('Error fetching data', error); 
    },
    complete: () => {
      console.log('Completado'); 
    }           
      
  })
}

}


