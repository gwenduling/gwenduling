import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

import { Metadata } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private baseURL = 'http://gwenduling.com';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  setDefaultMetaTags(): void {
    this.metaService.updateTag({
      name: 'author',
      content: 'Giowee Argao'
    });

    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'gwenduling',
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website',
    });

    this.metaService.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.metaService.updateTag({
      name: 'twitter:creator',
      content: '@gwenduling',
    });

    this.metaService.updateTag({
      name: 'twitter:site',
      content: '@gwenduling',
    });
  }

  setMetaTags(metadata: Metadata): void {
    this.titleService.setTitle(metadata.title);
    this.metaService.updateTag({
      name: 'description',
      content: metadata.description,
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: metadata.title,
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: metadata.description,
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: this.baseURL + metadata.url,
    });
    
    this.metaService.updateTag({
      name: 'twitter:title',
      content: metadata.title
    });

    this.metaService.updateTag({
      name: 'twitter:description',
      content: metadata.description
    });

    this.metaService.updateTag({
      name: 'robots',
      content: metadata.follow ?
        'index, follow' :
        'noindex, nofollow, noarchive'
    });

    this.metaService.updateTag({
      property: 'og:image',
      content: metadata.image || '',
    });

    this.metaService.updateTag({
      name: 'twitter:image',
      content: metadata.image || '',
    });
  }
}
