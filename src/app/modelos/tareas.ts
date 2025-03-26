
export class Tarea {
    
    id:string = '';
    Titulo: string  ='';
    Descripcion: string = '';
    Estado: boolean = false;
    FechaCreacion: { _seconds: number, _nanoseconds: number }; 
    FechaCreacionFormatted: Date = new Date();
  
    // Constructor to initialize properties
    constructor(id:string,Titulo: string, Descripcion: string, Estado: boolean,
       FechaCreacion: { _seconds: number, _nanoseconds: number } ) {
      this.id = id;
      this.Titulo = Titulo;
      this.Descripcion = Descripcion;
      this.Estado = Estado;
      this.FechaCreacion = FechaCreacion;
    }  
    
  }