import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { IConfig } from './config.model';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})

export class ConfigComponent implements OnInit {

  config: IConfig;
  error: any;
  headers: string[];

  constructor(public configService: ConfigService) { }

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe(
        (data: IConfig) => this.config = { ...data },
        error => this.error = error
      );
  }

  showConfigResposne() {
    this.configService.getConfigResponse()
      .subscribe(
        resp => {
          const keys = resp.headers.keys();
          this.headers = keys.map(key =>
            `${key}: ${resp.headers.get(key)}`);
          this.config = { ...resp.body };
        });
  }

  ngOnInit() {
  }

  makeError() {
    this.configService.makeIntentionalError()
      .subscribe(
        null,
        error => this.error = error);
  }
}
/*
¬
  OBSERVER ->
¬
  OBSERVABLES ->
¬
  CALLBACKK ->
¬
  RXJS -> RxJS is a library for composing asynchronous and callback-based code in a functional, reactive style.
¬
  SUBSCRIBE -> [ .subscribe() ] -> Component subscribes to method's return value.
    |-- Subscribe callback requires bracket notation-[] to extract the data values.
    |-- [ (data: IConfig) ] -> Type-checking the resposne.
      |-- Cloning the data object, using its known IConfig shape - recieving a typed data object.
    |-- [ (data: IConfig) => this.config = { ...data }, ] -> Success path.
    |-- [ error => this.error = error ] -> Error path.
¬
  SUBSCRIPTION CALLBACK -> copies data fields into the component's config object, which is data-bound in the component template for display.
¬
  [ showConfigResponse() ] -> Displays the response headers as well as the configuration.
    |-- [ const keys = ... ] -> Displays its headers.
      |-- MAP -> [ map() ] ->
      |-- KEYS -> [ keys() ] ->
    |-- [ this.config = { ...resp.body }; ] -> Access the body directly, which is typed as IConfig.
    |-- BACKTICKS -> [ `` ] -> Template literals strings-(Strings span multi-line and may use "interpolation to insert varaibles").
    |-- [ ${key} ] -> Expressions can be embedded in templater literal strings.
¬
  ERROR HANDLING: When requests fais on server, or doesn't reach server - HttpClient returns error Object.
    |-- Error inspection, interpretation, and resolution you do in the service, not in the component.
    |-- [ error = this.error = error ] -> Displays raw error object when data access fails.
    |-- ERROR DETAILS -> Interpeting error and composing user-friendly response.
    |-- HTTP STATUS CODES:
      |-- 1XX -> Informational.
      |-- 2XX -> Sucess.
      |-- 3XX -> Redirection.
      |-- ERROR RESPONSES: These serros produce JS [ ErrorEevent ] Objects.
        |-- 4XX -> Client Error.
        |-- 5XX -> Server Error.
        |-- HttpClient captures both kinds of errors in [ HTTPERRORRESPONSE ], which allows for inspection.
*/
