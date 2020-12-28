import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

import { ButterApiService } from '../services/butter-api.service';
import { BlogPost } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostResolver implements Resolve<BlogPost> {
  constructor(
    private butterService: ButterApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<BlogPost> {
    const slug = route?.params?.slug;
    const SLUG_KEY = makeStateKey<Promise<BlogPost>>('slug-' + slug);

    if (this.transferState.hasKey(SLUG_KEY)) {
      const blogPost = this.transferState.get<Promise<BlogPost>>(
        SLUG_KEY,
        Promise.resolve({ data: undefined })
      );
      this.transferState.remove(SLUG_KEY);
      return blogPost;
    } else {
      return await this.butterService.getPost(slug).then((blogPost) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(SLUG_KEY, blogPost);
        }

        return blogPost;
      });
    }
  }
}
