export function toBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
}

// Funcion para recibir errores del webapi
export function parsearErroresAPI(response: any): string[] {

    const resultado: string[] = [];

    if (response.error) { // Si solo llega un error de tipo string
        if (typeof response.error === 'string') {
            resultado.push(response.error);
            console.log(resultado);
        } else { // Si llegan mas errores en un mismo modelo, incluido si vienen errores del campo asociado al mapa(ubicacion)
            const mapaErrores = response.error.errors;

            const entradas = Object.entries(mapaErrores); // Para convertir el objeto en un array
            entradas.forEach((arreglo: any[]) => { // Recorremos el arreglo creado
                const campo = arreglo[0]; // Accedemos al campo que esta arrojando el error
                arreglo[1].forEach((mensajeError) => {
                    resultado.push(`${campo}: ${mensajeError}`);
                });
                console.log(resultado);
                
            });
        }
    }

    return resultado;
} 

export function formatearFecha(date: Date) {
    /**
     * En caso de tener una fecha en un formato distinto al esperado, como el caso de la fecha que viene del web api, lo formateamos con
     * date = new Date(date);
     */
    date = new Date(date);

    const formato = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date);

    return `${year}-${month}-${day}`;
}