import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',

})
export class DatosgeograficosService {

  constructor(private http: HttpClient) {
    console.log("*** Servicio Datos Geograficos corriendo ***")
  }

  obtenerDatosProvincias() {
    return this.http.get('https://apis.datos.gob.ar/georef/api/provincias');
  }

  obtenerDatosMunicipio(provinciaActual:string){

    return this.http.get(
      `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaActual}&campos=id,nombre&max=100`
    );
  }
}
