import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IConfig } from './config/config.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json';
  constructor(
    private http: HttpClient
  ) { }
  getConfig() {
    return this.http.get<IConfig>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  getConfigResponse(): Observable<HttpResponse<IConfig>> {
    return this.http.get<IConfig>(
      this.configUrl, { observe: 'response' }
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occured:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }
}

/*
¬
  SERVICE ->
¬
  HTTP -> [ (private http: HttpClient) ] -> Injecting HttpClient into application class.
¬
  GET METHOD -> [ get() ] -> Fetches file
    |-- Service method returns an observanles of configuration data.
    |-- [ get<IConfig> ] -> Specifing the interface as the HttpClient.get() call's type parameter.
      |-- Returns an observable of Config.
¬
  FULL RESPONSE -> Respoonse may not return all needed data - special header or status code inidicating condiitions.
    |-- [ getConfigResponse()... ] -> Telling HttpClient we want the full repsonse.
      |-- getConfigResponse() -> resp is of type `HttpResponse<Config>`
      |-- HttpClient.get() returns an Observable of typed HttpResponse rather than just JSON data.
        |-- HttpResponse is a HttpEvent available on the response event stream.
¬
  ERROR HANDLER: Handler returns an RXJS [ ERROROBSERVABLE ].
    |-- HTTPERRORRESPONSE -> Error that represents an error or failure.
    |-- [ if ( ... instanceof ... ) { ... } ] -> Client side or Network error occured - handle accordingly.
      |-- [ if ( object instanceof constructor ) ] -> Operator tests the presence of constructor.prototype in object's prototype chain.
        |-- OBJECT -> The object to test.
        |-- CONSTRUTOR -> Function to test against.
    |-- [ } else { ... } ] -> Backend returned unsuccesful - return response body.
    |-- [ return throwError(...) ] -> Creates an Observable that emits no items to the Observer and immediately emits an error notification.
    |-- [ getConfig() { ... .pipe(catchError(this.handleError)) } ]:
      |-- Take Observable returned by HttpClient method and pipe them through the error handler.
        |-- [ .pipe() ] -> Takes in data as input and transforms it to a desired output.
        |-- [ catchError() ] -> Catches errors on the observable to be handled by returning a new observable or throwing an error.
¬
  RETRY(): Sometimes errors go away automatically if you try again.
    |-- [ retry(#) ] -> simpliest RXJS retry operator -> automatically re-subscribes to a failed Observable a specified number of times.
      |-- [ .pipe( retry(3), catchError(...)); ] -> Retires failed request up to 3 times, then handles error.
¬

*/
