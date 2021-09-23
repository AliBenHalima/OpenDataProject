import { Feed } from './Utils/feed';
import { FeedService } from './Services/feed.service';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/Services/AuthService';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Echo from 'laravel-echo';
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crc-front';
  feedSubscription;
  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private _snackBar: MatSnackBar,
    private feedService : FeedService
  ) {}

  ngOnInit(): void {
    $(".cour-menu").hover(function() {
      $(".cour-mm").fadeIn();
      console.log("azf");

  });
  $(".cour-menu").mouseleave(function() {
      $(".cour-mm").fadeOut();
    });
    // this.feedSubscription = this.feedService
    //   .getFeedItems()
    //   .subscribe((feed: Feed) => {

    //   });

    addEventListener('offline', (e) => {
      this._snackBar.open('Please check your internet connection', 'Ok', {
        duration: 5000,
      });
    });

    addEventListener('online', (e) => {
      this._snackBar.open('You are now online', 'Ok', {
        duration: 5000,
      });
    });
    this.primengConfig.ripple = true;
    if (!navigator.onLine) {
      this._snackBar.open('Please check your internet connection', 'Ok', {
        duration: 5000,
      });
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (document.getElementById('custom_js') != null) {
          document.getElementById('custom_js').remove();
        }

        const node = document.createElement('script');
        node.src = 'assets/TravelFront/js/jquery-latest.min.js';
        node.type = 'text/javascript';
        node.async = false;
        node.id = 'custom0_js';
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);

        const node1 = document.createElement('script');
        node1.src = 'assets/TravelFront/js/bootstrap.js';
        node1.type = 'text/javascript';
        node1.async = false;
        node1.id = 'custom1_js';
        node1.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node1);

        const node2 = document.createElement('script');
        node2.src = 'assets/TravelFront/js/wow.min.js';
        node2.type = 'text/javascript';
        node2.async = false;
        node2.id = 'custom2_js';
        node2.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node2);

        const node3 = document.createElement('script');
        node3.src = 'assets/TravelFront/js/materialize.min.js';
        node3.type = 'text/javascript';
        node3.async = false;
        node3.id = 'custom3_js';
        node3.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node3);

        const node4 = document.createElement('script');
        node4.src = 'assets/TravelFront/js/custom.js';
        node4.type = 'text/javascript';
        node4.async = false;
        node4.id = 'custom4_js';
        node4.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node4);
      }
    });
  }
}
