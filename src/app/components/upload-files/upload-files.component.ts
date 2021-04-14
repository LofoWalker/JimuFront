import {Component, OnInit} from '@angular/core';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {FileDetails} from '../../model/file';
import {FileService} from '../../services/FileService/file.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  loaded = 0;
  selectedFiles!: FileList;
  selectedFilesList!: File[];
  uploadedFiles: FileDetails[] = [];
  showProgress = false;
  uploadFinish = false;
  open = false;

  constructor(private http: HttpClient,
              private fileService: FileService) {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    this.selectedFilesList = Array.from(this.selectedFiles);
  }

  upload(): any {
    if (!this.selectedFiles) {
      return;
    }
    this.showProgress = true;
    this.uploadedFiles = [];

    Array.from(this.selectedFiles).forEach(file => {
      const fileDetails = new FileDetails();
      fileDetails.name = file.name;
      this.uploadedFiles.push(fileDetails);
      this.fileService.uploadSingleFile(file)
        .pipe(tap(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // @ts-ignore
            this.loaded = Math.round(100 * event.loaded / event.total);
            fileDetails.progress = this.loaded;
          }
        })).subscribe(event => {
        if (event instanceof HttpResponse) {
          if (this.selectedFiles.item(this.selectedFiles.length - 1) === file) {
            this.fileService.fetchFileNames();
            this.uploadFinish = true;
          }
        }
      });
    });
  }

  clean(): void {
    this.showProgress = false;
    this.open = false;
    this.uploadFinish = false;
    this.uploadedFiles = [];
    this.selectedFilesList = [];
  }
}
