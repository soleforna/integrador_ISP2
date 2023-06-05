import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  convertirFecha(dateString: string): string { //recibe un string y retorna un string
    const date = moment(dateString).tz('America/Argentina/Buenos_Aires'); //recibe un string y lo convierte a un objeto moment con el timezone de Argentina
    return date.format('DD/MM/YYYY'); //retorna el objeto moment formateado a un string con el formato que queremos que tenga la fecha (DD/MM/YYYY)
  }

}
