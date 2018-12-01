import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente.component';
import { ClientesComponent } from './clientes.component';
import { CreditoComponent } from './credito.component';
import { CreditosComponent } from './creditos.component';
import { PagenotfoundComponent } from './pagenotfound.component';

import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClientesComponent,
    CreditoComponent,
    CreditosComponent,
    PagenotfoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
  	AppComponent,
  	HeaderComponent,
  	FooterComponent
  ]
})
export class AppModule {

}
