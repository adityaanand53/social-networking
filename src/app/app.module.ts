import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { SearchFreindsComponent } from './search-freinds/search-freinds.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllMaterialModule } from './common/material.module';
import { APIInterceptor } from './services/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddPostsComponent,
    ViewPostsComponent,
    SearchFreindsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AllMaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
