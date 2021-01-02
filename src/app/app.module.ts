import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddPostsComponent } from './posts/add-posts/add-posts.component';
import { ViewPostsComponent } from './posts/view-posts/view-posts.component';
import { SearchFriendsComponent } from './manage-friends/search-friends/search-friends.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllMaterialModule } from './common/material.module';
import { APIInterceptor } from './services/interceptor';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { ListFriendsComponent } from './manage-friends/list-friends/list-friends.component';
import { ListTileComponent } from './manage-friends/list-tile/list-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddPostsComponent,
    ViewPostsComponent,
    SearchFriendsComponent,
    ProfileComponent,
    HeaderComponent,
    ListFriendsComponent,
    ListTileComponent
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
