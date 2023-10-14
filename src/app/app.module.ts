import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";

import {AppRoutingModule} from "./app-routing.module";

import {AppComponent} from './app.component';
import {AlertComponent} from './alert/alert.component';

import {AuthService} from "./pages/auth/auth.service";
import {AuthInterceptorService} from "./pages/auth/auth-interceptor.service";
import {AlertService} from "./alert/alert.service";


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    HttpClientModule,
    RouterOutlet
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthService,
    AlertService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
