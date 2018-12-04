import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Dependente } from './dependente';
import { Cliente } from '../cliente/cliente';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class DependenteService {
  dependentesUrl = 'http://localhost:8080/api/dependentes';
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
  	this.handleError = httpErrorHandler.createHandleError('DependenteService');
  }

  getDependentes(): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(this.dependentesUrl)
      .pipe(
        catchError(this.handleError('getDependentes', []))
      );
  }

  searchDependentes(cliente: Cliente): Observable<Dependente[]> {
    const options = cliente ?
     { params: new HttpParams().set('filter', JSON.stringify(cliente)) } : {};

    return this.http.get<Dependente[]>(this.dependentesUrl)
      .pipe(
        catchError(this.handleError('searchDependentes', []))
      );
  }

  addDependente (dependente: Dependente): Observable<Dependente> {
    return this.http.post<Dependente>(this.dependentesUrl, dependente)
      .pipe(
        catchError(this.handleError('addDependente', dependente))
      );
  }

  deleteDependente (id: number): Observable<{}> {
    const url = `${this.dependentesUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError('deleteDependente'))
      );
  }

  updateDependente (dependente: Dependente): Observable<Dependente> {
    return this.http.put<Dependente>(this.dependentesUrl + '/' + dependente.id, dependente)
      .pipe(
        catchError(this.handleError('updateDependente', dependente))
      );
  }
}