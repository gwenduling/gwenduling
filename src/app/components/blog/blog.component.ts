import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BlogMeta, BlogListItem, BlogList } from '../../models/blog.model';
import { ButterApiService } from '../../services/butter-api.service';
import { MetaService } from '../../services/meta.service';
import { blogMeta } from '../../data/meta.data';
import { State } from '../../models/state.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: BlogListItem[] | undefined = [];
  meta: BlogMeta | undefined;
  page: number | undefined;
  pageSize: number | undefined;
  category: string | undefined;
  blogListStatus: State | undefined;
  state = State;

  constructor(
    private activatedRoute: ActivatedRoute,
    private butterApiService: ButterApiService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data?.blogList) {
        this.blogListStatus = State.Success;
        this.setBlogListData(data.blogList);
      } else {
        this.blogListStatus = State.Error;
      }
      
    });

    this.category = this.activatedRoute?.snapshot?.params?.category;

    this.setMetatags();
  }

  setBlogListData(blogList: BlogList): void {
    this.posts = blogList?.data?.data;
    this.meta = blogList?.data?.meta;
    this.page = this.butterApiService.page;
    this.pageSize = this.butterApiService.pageSize;
  }

  getPage(): number {
    return this.butterApiService.page;
  }

  setMetatags(): void {
    const metadata = {
      ...blogMeta,
      title: this.category ? `${blogMeta.title} | ${this.category}` : blogMeta.title,
      url: this.category ? `${blogMeta.url}/category/${this.category}` : blogMeta.url
    }
    this.metaService.setMetaTags(metadata);
  }

  getTotalPages(): number | undefined {
    if (!this.meta || !this.pageSize) { return; }

    return Math.ceil(this.meta.count / this.pageSize);
  }

  getList(page: number): void {
    this.blogListStatus = State.Loading;
    this.butterApiService.getList(page, this.category).then((response: BlogList) => {
      this.setBlogListData(response);
      this.blogListStatus = State.Success;
    })
    .catch(error => {
      console.error(error);
      this.blogListStatus = State.Error;
    });
  }

  getTitle(): string {
    return this.category ? `${this.category} stories ☕️` : 'recent stories ☕️';
  }

  isStatus(state: State): boolean {
    return state === this.blogListStatus;
  }
}
