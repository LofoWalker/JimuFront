import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UploadFilesComponent} from './components/upload-files/upload-files.component';
import {PageNotFoundComponentComponent} from './components/page-not-found-component/page-not-found-component.component';

const routes: Routes = [
  { path: '', component: UploadFilesComponent },
  { path: 'uploadFiles', component: UploadFilesComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
