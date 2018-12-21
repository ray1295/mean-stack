import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IConfig } from './config/config.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'assets/config.json';
  constructor(private http: HttpClient) { }
  getConfig() {
    return this.http.get<IConfig>(this.configUrl);
  }
  getConfigResponse(): Observable<HttpResponse<IConfig>> {
    return this.http.get<IConfig>(
      this.configUrl, { observe: 'response' }
    );
  }
}

/*
SERVICE ->
HTTP -> [ (private http: HttpClient) ] -> Injecting HttpClient into application class.
GET METHOD -> [ get() ] -> Fetches file
  |-- Service method returns an observanles of configuration data.
  |-- [ get<IConfig> ] -> Specifing the interface as the HttpClient.get() call's type parameter.
    |-- Returns an observable of Config.
FULL RESPONSE -> Respoonse may not return all needed data - special header or status code inidicating condiitions.
  |-- [ getConfigResponse()... ] -> Telling HttpClient we want the full repsonse.
    |-- getConfigResponse() -> resp is of type `HttpResponse<Config>`
    |-- HttpClient.get() returns an Observable of typed HttpResponse rather than just JSON data.
      |-- HttpResponse is a HttpEvent available on the response event stream.
*/
