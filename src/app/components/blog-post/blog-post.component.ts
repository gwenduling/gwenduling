import { Component, OnInit, Pipe, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as dayjs from 'dayjs';

import { BlogPost, BlogPostData, BlogPostMeta } from '../../models/blog.model';
import { MetaService } from '../../services/meta.service';
import { Metadata } from '../../models/meta.model';
import { defaultMeta } from '../../data/meta.data';
import { State } from '../../models/state.model';
import { ButterApiService } from '../../services/butter-api.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BlogPostComponent implements OnInit {
  meta: BlogPostMeta | undefined;
  post: BlogPostData | undefined;
  body: SafeHtml | undefined;
  slug: string | undefined;
  blogPostStatus: State | undefined;
  state = State;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private metaService: MetaService,
    private butterApiService: ButterApiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data?.blogPost) {
        this.blogPostStatus = State.Success;
        this.setBlogListData(data?.blogPost);
      } else {
        this.blogPostStatus = State.Error;
      }
    });

    this.slug = this.activatedRoute?.snapshot?.params?.slug;
  }

  setBlogListData(blogPost: BlogPost): void {
    this.meta = blogPost?.data?.meta;
    this.post = blogPost?.data?.data;
    this.transformBody();
    this.setMetadata();
  }

  setMetadata(): void {
    const metadata = this.getMetadata();
    this.metaService.setMetaTags(metadata);
  }

  getMetadata(): Metadata {
    return {
      ...defaultMeta,
      title: 'gwenduling | ' + this.post?.title,
      description: this.post?.meta_description || '',
      image: this.post?.featured_image,
      url: `/blog/post/${this.post?.slug}`
    }
  }

  transformBody(): void {
    if (!this.post || !this.post.body) { return; }

    this.body = this.sanitizer.bypassSecurityTrustHtml(this.post.body);
  }

  getPublishedDate(): string {
    return dayjs(this.post?.published)
      .format('MMMM DD, YYYY');
  }

  isStatus(state: State): boolean {
    return state === this.blogPostStatus;
  }

  getPost(): void {
    this.blogPostStatus = State.Loading;
    this.butterApiService.getPost(this.slug || '').then(blogPost => {
      this.setBlogListData(blogPost);
      this.blogPostStatus = State.Success;
    }).catch(error => {
      console.error(error);
      this.blogPostStatus = State.Error;
    })
  }
}
