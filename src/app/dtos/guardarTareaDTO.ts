export class GuardarTareaDTO {
   
    Titulo: string  ='';
    Descripcion: string = '';
    Estado: boolean = false;
 
    // Constructor to initialize properties
    constructor(Titulo: string, Descripcion: string, Estado: boolean,) {
      this.Titulo = Titulo;
      this.Descripcion = Descripcion;
      this.Estado = Estado;
    }  
    
  }