import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryComponent } from './summary/summary.component';
import { OperationComponent } from './operation/operation.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { OperationSummaryComponent } from './operation/operation-summary/operation-summary.component';
import { OperationTechnicalComponent } from './operation/operation-technical/operation-technical.component';
import { OperationStatusComponent } from './operation/operation-status/operation-status.component';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    OperationComponent,
    HeaderComponent,
    FooterComponent,
    OperationSummaryComponent,
    OperationTechnicalComponent,
    OperationStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
