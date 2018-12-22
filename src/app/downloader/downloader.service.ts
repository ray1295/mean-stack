import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
@Injectable({
  providedIn: 'root'
})

export class DownloaderService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getTextFile(filename: string) {
    return this.http.get(filename, { responseType: 'text' })
      .pipe(
        tap(
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
  }

  private log(filename: string, data: string) {
    const message = `DownloaderService download "${filename}" and got "${data}".`;
    this.messageService.add(message);
  }

  private logError(filename: string, error: any) {
    const message = `DownloaderService failed to download "${filename}"; got error "${error.message}"`;
    console.error(message);
    this.messageService.add(message);
  }
}

/*
DOWNLOADER SERVICE: Reads a text file from server & logs files content, before returning those contents to the caller as Observable<string>.
  |-- [ getTextFile() {...} ]:
    |-- [ (filename: string) ] ->
    |-- [ .get(filename, {responseType: 'text'}) ] ->
*/
