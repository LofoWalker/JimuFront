import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'https://jimu-back.herokuapp.com/';

  constructor(private http: HttpClient) {
  }

  uploadSingleFile(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      this.baseUrl + 'uploadFile',
      formData,
      {
        reportProgress: true,
        observe: 'events'
      });

  }

  // Fetches the names of files to be displayed in the downloads list.
  fetchFileNames(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'getFiles');
  }
}
