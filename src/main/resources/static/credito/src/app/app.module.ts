import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './cliente/clientes.component';
import { CidadeComponent } from './cidade/cidade.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    PagenotfoundComponent,
    HeaderComponent,
    FooterComponent,
    CidadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
  	HttpErrorHandler,
  	MessageService,
  	DatePipe
  ],
  bootstrap: [
  	AppComponent,
  	HeaderComponent,
  	FooterComponent
  ]
})
export class AppModule {

}
