export interface actorDTO{
    id: number;
    nombre: string;
    fechaNacimiento: Date;
    /**
     * Campo foto aquí es de tipo string ya que será una url. Esto se debe a que este DTO será para leer a un actor
     */
    foto: string;
    biografia: string;
}


export interface actorCreacionDTO{
    nombre: string;
    fechaNacimiento: Date;
    foto: File;
    biografia: string;
}

export interface ActorPeliculaDTO {
    id: number;
    nombre: string;
    personaje: string;
    foto: string;
}