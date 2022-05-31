import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CopyComponent } from './copy/copy.component';
import { CopySummaryComponent } from './copy/copy-summary/copy-summary.component';
import { CopyTechnicalsComponent } from './copy/copy-technicals/copy-technicals.component';
import { CopyStatusComponent } from './copy/copy-status/copy-status.component';
import { SizeComponent } from './size/size.component';
import { SizeSummaryComponent } from './size/size-summary/size-summary.component';
import { SizeTechnicalsComponent } from './size/size-technicals/size-technicals.component';
import { SizeStatusComponent } from './size/size-status/size-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CopyComponent,
    CopySummaryComponent,
    CopyTechnicalsComponent,
    CopyStatusComponent,
    SizeComponent,
    SizeSummaryComponent,
    SizeTechnicalsComponent,
    SizeStatusComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
