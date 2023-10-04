import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { PrimengModule } from './core/primeng/primeng.module';
import { Page404Component } from './core/page404/page404.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './core/shared/shared.module';
import { LayoutsModule } from './layouts/layouts.module';
import { HttpAuthorizationService } from './core/interceptor/http-authorization.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

export const httpInterceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthorizationService,
    multi: true,
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy },
];

@NgModule({
  declarations: [AppComponent, Page404Component],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PrimengModule,
    SharedModule,
    LayoutsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
  ],
  providers: [httpInterceptors, MessageService],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
