import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopySummaryComponent } from './copy/copy-summary/copy-summary.component';
import { CopyComponent } from './copy/copy.component';
import { SizeSummaryComponent } from './size/size-summary/size-summary.component';
import { SizeComponent } from './size/size.component';

const routes: Routes = [
  { path: '', redirectTo: 'copy', pathMatch: 'full' },
  { path: 'copy', component: CopyComponent },
  { path: 'copy', component: CopySummaryComponent, outlet: 'summary' },
  { path: 'size', component: SizeComponent },
  { path: 'size', component: SizeSummaryComponent, outlet: 'summary' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
