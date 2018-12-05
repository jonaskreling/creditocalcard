import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Credito } from './credito';
import { Cliente } from '../cliente/cliente';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class CreditoService {
  creditosUrl = 'http://localhost:8087/api/creditos';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
  	this.handleError = httpErrorHandler.createHandleError('CreditoService');
  }

  getCreditos(): Observable<Credito[]> {
    return this.http.get<Credito[]>(this.creditosUrl)
      .pipe(
        catchError(this.handleError('getCreditos', []))
      );
  }

  searchCreditos(cliente: Cliente): Observable<Credito[]> {
    const options = cliente ?
     { params: new HttpParams().set('filter', JSON.stringify(cliente)) } : {};

    return this.http.get<Credito[]>(this.creditosUrl)
      .pipe(
        catchError(this.handleError('searchCreditos', []))
      );
  }

  addCredito (credito: Credito): Observable<Credito> {
    return this.http.post<Credito>(this.creditosUrl, credito)
      .pipe(
        catchError(this.handleError('addCredito', credito))
      );
  }

  deleteCredito (id: number): Observable<{}> {
    const url = `${this.creditosUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteCredito'))
      );
  }

  updateCredito (credito: Credito): Observable<Credito> {
    return this.http.put<Credito>(this.creditosUrl + '/' + credito.id, credito)
      .pipe(
        catchError(this.handleError('updateCredito', credito))
      );
  }
}