import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Endereco } from './endereco';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class EnderecoService {
  enderecosUrl = 'http://localhost:8080/api/enderecos';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
  	this.handleError = httpErrorHandler.createHandleError('EnderecoService');
  }

  getEnderecos(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.enderecosUrl)
      .pipe(
        catchError(this.handleError('getEnderecos', []))
      );
  }

  searchEnderecos(term: string): Observable<Endereco[]> {
    term = term.trim();

    const options = term ?
     { params: new HttpParams().set('nome', term) } : {};

    return this.http.get<Endereco[]>(this.enderecosUrl)
      .pipe(
        catchError(this.handleError('searchEnderecos', []))
      );
  }

  addEndereco (endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.enderecosUrl, endereco)
      .pipe(
        catchError(this.handleError('addEndereco', endereco))
      );
  }

  deleteEndereco (id: number): Observable<{}> {
    const url = `${this.enderecosUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteEndereco'))
      );
  }

  updateEndereco (endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(this.enderecosUrl + '/' + endereco.id, endereco)
      .pipe(
        catchError(this.handleError('updateEndereco', endereco))
      );
  }
}