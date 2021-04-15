import {Component, OnInit, ViewChild} from '@angular/core';
import {FileService} from '../../services/FileService/file.service';
import {FileDetails} from '../../model/file';
import {GridOptions} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {MatIconButtonComponent} from '../download-button/mat-icon-button.component';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  // @ts-ignore
  @ViewChild('lines') agGrid: AgGridAngular;

  public gridOptions: GridOptions;
  public columnDefs: any;
  public rowData: any;
  public files: FileDetails[] = [];
  public url: string;
  public isPdf: boolean;
  public isOther: boolean;
  public agGridComponents: any;

  constructor(private fileService: FileService) {
    this.url = '';
    this.isOther = false;
    this.isPdf = false;

    this.gridOptions = {
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: true,
      },
      context: {
        componentParent: this
      }
    };

    this.agGridComponents = {
      buttonRenderer: MatIconButtonComponent
    };
  }

  ngOnInit(): void {
    this.fileService.getAllFiles().subscribe(response => {
      response.forEach((file: any) => {
        this.files.push(new FileDetails(file.name, 100, file.size, file.creationDate));
      });
    });
  }

  private getFileUrl(file: FileDetails): void {
    this.url = this.fileService.downloadFile(file);
  }

  public onSelectionChanged(e: any): void {
    const selectedData = this.agGrid.api.getSelectedRows();

    if (selectedData.length > 0) {
      this.getFileUrl(selectedData[0]);
      this.setFileType(selectedData[0]);
    }
  }

  public selectAll(): void {
    if (this.agGrid.api.getSelectedRows().length === 0) {
      this.agGrid.api.selectAll();
    } else {
      this.agGrid.api.deselectAll();
    }
  }

  public initAgGrid(): void {
    this.columnDefs = [
      {headerName: 'Name', field: 'name', checkboxSelection: true, cellRendererParams: {onClick: this.onSelectionChanged.bind(this)}},
      {headerName: 'Size', field: 'size'},
      {headerName: 'Date', field: 'creationDate'},
      {
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.downloadFile.bind(this),
          label: 'cloud_download'
        },
        width: 25,
      },
      {
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.deleteFile.bind(this),
          label: 'delete'
        },
        width: 25,
      }
    ];

    this.rowData = this.files;
  }

  public downloadFile(file: any): void {
    console.log(file);

    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'http://localhost:8080/file/' + file._name);
    link.setAttribute('download', file);

    document.body.appendChild(link);
    link.click();
  }

  public deleteFiles(): void {
    this.fileService.deleteFiles(this.agGrid.api.getSelectedRows());
    this.agGrid.api.applyTransaction({remove: this.agGrid.api.getSelectedRows()});
  }

  private deleteFile(file: any): void {
    this.fileService.deleteFile(file._name).subscribe();
    const selectedData = [];
    selectedData.push(file);
    console.log(selectedData);
    this.agGrid.api.applyTransaction({remove: selectedData});
  }

  private setFileType(file: FileDetails): void {
    // @ts-ignore
    const type = file.name.split('.')[1];
    if (type === 'pdf') {
      this.isPdf = true;
      this.isOther = false;
    } else {
      this.isPdf = false;
      this.isOther = true;
    }
  }
}
