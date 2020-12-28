import { Injectable } from '@angular/core';

import { butterService } from './butter.service';
import { BlogList, BlogCategories, BlogListParams } from '../models/blog.model';

@Injectable({
  providedIn: 'root',
})
export class ButterApiService {
  page = 1;
  pageSize = 10;

  constructor() {}

  getList(
    page = this.page,
    category?: string | undefined,
    tag?: string | undefined,
    pageSize = this.pageSize
  ): Promise<BlogList> {
    const params: BlogListParams = {
      exclude_body: true,
      page,
      page_size: pageSize,
    };

    if (category) {
      params.category_slug = category;
    }

    if (tag) {
      params.tag_slug = tag;
    }

    this.page = page;

    return butterService.post.list(params);
  }

  getCategories(): Promise<BlogCategories> {
    return butterService.category.list();
  }

  getPost(slug: string): Promise<any> {
    return butterService.post.retrieve(slug);
  }
}
