import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  url: string = environment.Video_Link;
  key: string = environment.Youtube_API_KEY;
  youtubeUrl: string = environment.youTube_link;

  constructor(private http: HttpClient) { }

  getVideoTitle(id: string) {
    return this.http.get(this.url + 'videos?part=snippet&id=' + id + '&key=' + this.key);
  }

  getComments(id: string) {
    const vid = 'commentThreads?part=snippet&maxResults=100&videoId=';
    const url = this.url + vid + id + '&key=' + this.key;
    return this.http.get(url);
  }

  getCommentNetPage(VideoId: string, pageToken: string) {
    const page = 'maxResults=100&pageToken=';
    const url = this.url + 'commentThreads?part=snippet&videoId=' + VideoId + '&key=' + this.key + page + pageToken;
    return this.http.get(url);
  }

  getCommnetLink(videoId: string, commentId: string) {
    return this.youtubeUrl + videoId + '&lc=' + commentId;
  }

  getVideoStas(videoid: string) {
    return this.http.get(this.url + 'videos?part=statistics&id=' + videoid + '&key=' + this.key);
  }
}
