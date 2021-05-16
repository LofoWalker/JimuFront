import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileDetails} from '../../model/file';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      this.baseUrl + 'file',
      formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  // Fetches the names of files to be displayed in the downloads list.
  fetchFileNames(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + 'files');
  }

  getAllFiles(): Observable<any> {
    return this.http.get(this.baseUrl + 'files');
  }

  downloadFile(file: FileDetails): string {
    return this.baseUrl + 'file/' + file.name;
  }

  deleteFile(file: FileDetails): Observable<any> {
    return this.http.delete(this.baseUrl + 'file/' + file);
  }

  deleteFiles(files: FileDetails[]): void {
    files.forEach((file: FileDetails) => {
      this.http.delete(this.baseUrl + 'file/' + file.name).subscribe();
    });
  }
}
