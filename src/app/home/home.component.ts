import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    localStorage.clear();
  }

  OnSubmit(link: string) {
    link = link.substr(link.length - 11);
    localStorage.setItem('link', link);
    this.route.navigate(['/youtube']);
  }

}
