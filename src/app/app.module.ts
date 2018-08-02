import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { YoutubeComponent } from './youtube/youtube.component';
import { HomeComponent } from './home/home.component';
import { AmazonComponent } from './amazon/amazon.component';
import { appRoute } from './routes';
import { RouterModule } from '../../node_modules/@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    HomeComponent,
    AmazonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute), FormsModule, HttpClientModule, NgxSpinnerModule, NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
