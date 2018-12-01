import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cliente } from './cliente';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ClienteService {
  clientesUrl = 'http://localhost:8080/api/clientes';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
  	this.handleError = httpErrorHandler.createHandleError('ClienteService');
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clientesUrl)
      .pipe(
        catchError(this.handleError('getClientes', []))
      );
  }

  searchClientes(term: string): Observable<Cliente[]> {
    term = term.trim();

    const options = term ?
     { params: new HttpParams().set('nome', term) } : {};

    return this.http.get<Cliente[]>(this.clientesUrl)
      .pipe(
        catchError(this.handleError('searchClientes', []))
      );
  }

  addCliente (cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.clientesUrl, cliente)
      .pipe(
        catchError(this.handleError('addCliente', cliente))
      );
  }

  deleteCliente (id: number): Observable<{}> {
    const url = `${this.clientesUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteCliente'))
      );
  }

  updateCliente (cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.clientesUrl + '/' + cliente.id, cliente)
      .pipe(
        catchError(this.handleError('updateCliente', cliente))
      );
  }
}