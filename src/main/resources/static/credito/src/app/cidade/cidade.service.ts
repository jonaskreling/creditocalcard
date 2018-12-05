import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Cidade } from './cidade';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class CidadeService {
  cidadesUrl = 'http://localhost:8087/api/cidades';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
  	this.handleError = httpErrorHandler.createHandleError('CidadeService');
  }

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.cidadesUrl)
      .pipe(
        catchError(this.handleError('getCidades', []))
      );
  }

  searchCidades(term: string): Observable<Cidade[]> {
    term = term.trim();

    const options = term ?
     { params: new HttpParams().set('nome', term) } : {};

    return this.http.get<Cidade[]>(this.cidadesUrl, options)
      .pipe(
        catchError(this.handleError('searchCidades', []))
      );
  }

  addCidade (cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(this.cidadesUrl, cidade)
      .pipe(
        catchError(this.handleError('addCidade', cidade))
      );
  }

  deleteCidade (id: number): Observable<{}> {
    const url = `${this.cidadesUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteCidade'))
      );
  }

  updateCidade (cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(this.cidadesUrl + '/' + cidade.id, cidade)
      .pipe(
        catchError(this.handleError('updateCidade', cidade))
      );
  }
}