import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {IAfterGuiAttachedParams, ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-button-ignore-renderer',
  template: `
    <button type="button" (click)="btnClickedHandler()" class="m-0 p-0" style="border:none">
      <mat-icon>{{label}}</mat-icon>
    </button>
  `
})
export class MatIconButtonComponent implements ICellRendererAngularComp {

  // @ts-ignore
  public params: any;
  // @ts-ignore
  public label: string;

  constructor() {
  }

  agInit(params: any): void {
    this.params = params;
    this.label = this.params.label;
  }
  btnClickedHandler(): any {
    this.params.onClick(this.params.data);
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  refresh(params: any): boolean {
    return true;
  }
}
