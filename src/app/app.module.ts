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
import { CloudOpRxStompService } from './websocket/cloud-op-rx-stomp.service';
import { cloudOPrxStompServiceFactory } from './websocket/cloud-op-rx-stomp-service-factory';
import { ReactiveFormsModule } from '@angular/forms';

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
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [
    {
      provide: CloudOpRxStompService,
      useFactory: cloudOPrxStompServiceFactory,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
