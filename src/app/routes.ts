import { Routes } from '@angular/router';
import { YoutubeComponent } from './youtube/youtube.component';
import { AmazonComponent } from './amazon/amazon.component';
import { HomeComponent } from './home/home.component';

export const appRoute: Routes = [
  {
    path: 'youtube', component: YoutubeComponent
  },
  {
    path: 'amazon', component: AmazonComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  }
];
