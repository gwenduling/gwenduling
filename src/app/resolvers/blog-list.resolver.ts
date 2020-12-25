import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

import { ButterApiService } from '../services/butter-api.service';
import { BlogList } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogListResolver implements Resolve<BlogList> {
  constructor(
    private butterService: ButterApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<BlogList> {
    const category = route?.params?.category;
    const CATEGORY_KEY = makeStateKey<Promise<BlogList>>('category-' + category || 'blog');

    if (this.transferState.hasKey(CATEGORY_KEY)) {
      const blogList = this.transferState.get<Promise<BlogList>>(CATEGORY_KEY, Promise.reject());
      this.transferState.remove(CATEGORY_KEY);
      return blogList;
    } else {
      return await this.butterService.getList(1, category).then((blogList) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(CATEGORY_KEY, blogList);
        }

        return blogList;
      });
    }
  }
}
