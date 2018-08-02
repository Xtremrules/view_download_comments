import { Component, OnInit } from '@angular/core';
import { MainService } from '../shared/main.service';
import { Comment } from '../shared/comment.model';
import { Router } from '../../../node_modules/@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  comments: Comment[] = [];

  constructor(private mainService: MainService, private route: Router, private spinner: NgxSpinnerService) { }
  link;
  YoutubeName: string;
  private pageToken: string;
  ngOnInit() {
    this.link = localStorage.getItem('link');
    if (this.link === null) {
      this.route.navigate(['/home']);
    }

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    const data = this.mainService.getVideoTitle(this.link);
    data.subscribe(
      (result: any) => {
        this.YoutubeName = result.items[0].snippet.title;
      });

    const test = this.mainService.getComments(this.link).subscribe((res: any) => {

      this.comments = this.convertToComment(res);
      // const items = res.items;
      // for (let i = 0; i < items.length; i++) {
      //   const c = new Comment();
      //   c.username = items[i].snippet.topLevelComment.snippet.authorDisplayName;
      //   c.review = items[i].snippet.topLevelComment.snippet.textDisplay;
      //   c.link = this.mainService.getCommnetLink(this.link, items[i].snippet.topLevelComment.id);
      //   c.date = items[i].snippet.topLevelComment.snippet.updatedAt;

      //   this.comments.push(c);
      // }
    });

    console.log(this.comments);
  }

  private convertToComment(data): Comment[] {
    const comments = [];
    if (!data.nextPageToken) {
      this.pageToken = '';
    } else {
      this.pageToken = data.nextPageToken;
    }

    const items = data.items;
    for (let i = 0; i < items.length; i++) {
      const c = new Comment();
      c.username = items[i].snippet.topLevelComment.snippet.authorDisplayName;
      c.review = items[i].snippet.topLevelComment.snippet.textDisplay;
      c.link = this.mainService.getCommnetLink(this.link, items[i].snippet.topLevelComment.id);
      c.date = items[i].snippet.topLevelComment.snippet.updatedAt;

      comments.push(c);
    }

    return comments;
  }

  Download() {
    // let i = 0;
    // while (this.pageToken && i < 4) {
    //   this.mainService.getCommentNetPage(this.link, this.pageToken)
    //     .subscribe(x => {
    //       const data = this.convertToComment(x);
    //       data.forEach(y => this.comments.push(y));
    //     });
    //   i++;
    // }

    const csvRows = [];
    csvRows.push('Username,Review,Link,Date');
    this.comments.forEach(x => {
      csvRows.push(x.username + ',' + x.review + ',' + x.link + ',' + x.date);
    });
    const csvString = csvRows.join('\r\n');
    const a = document.createElement('a');
    a.href = 'data:application/csv;charset=utf-8,' + csvString;
    a.setAttribute('download', this.YoutubeName + '.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.route.navigate(['/home']);
  }

}
