import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Event, Router, RouterEvent, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';
import * as Bowser from 'bowser';

import { MetaService } from './services/meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading = true;
  isValidBrowser: boolean | undefined;

  constructor(
    private router: Router,
    private metaService: MetaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    router.events.pipe(
      filter((event: Event): event is RouterEvent => event instanceof RouterEvent)
    ).subscribe((event: RouterEvent) => {
      this.checkRouterEvent(event);
    });
  }

  ngOnInit(): void {
    this.addConsoleMessage();
    this.metaService.setDefaultMetaTags();
    this.validateBrowser();
  }

  addConsoleMessage(): void {
    console.log('%cWhat are you doing here?', 'color: #e3c468; font-size: 25px');
    console.log('%cAnyway I hope you find what you\'re looking for. Have fun! (Please don\'t hack me)', 'color: #e3c468;');
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;

      if (!isPlatformServer(this.platformId)) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  validateBrowser(): void {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const isInValidBrowser = browser.satisfies({
      windows: {
        'internet explorer': '<=11'
      },
      firefox: '<52',
      chrome: '<57',
      safari: '<10.1',
      edge: '<16',
      opera: '<44',
      samsung_internet: '<6.2'
    });

    this.isValidBrowser = !isInValidBrowser;
  }
}
