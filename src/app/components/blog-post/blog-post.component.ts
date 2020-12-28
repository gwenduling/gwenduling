import {
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as dayjs from 'dayjs';

import {
  BlogPost,
  BlogPostData,
  BlogPostMeta,
  BlogList,
} from '../../models/blog.model';
import { MetaService } from '../../services/meta.service';
import { Metadata } from '../../models/meta.model';
import { defaultMeta } from '../../data/meta.data';
import { State } from '../../models/state.model';
import { ButterApiService } from '../../services/butter-api.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogPostComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private metaService: MetaService,
    private butterApiService: ButterApiService,
    @Inject(PLATFORM_ID) private platformId: typeof PLATFORM_ID
  ) {}
  meta: BlogPostMeta | undefined;
  post: BlogPostData | undefined;
  body: SafeHtml | undefined;
  slug: string | undefined;
  blogPostStatus: State | undefined;
  state = State;
  relatedPosts: { name: string; slug: string }[] | undefined;
  pageScrolled: boolean | undefined;

  @HostListener('window:scroll', [])
  handleScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.pageYOffset;
      this.pageScrolled = scrollY >= window.innerHeight;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
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
    this.getRelatedPostsFromTags();
  }

  setMetadata(): void {
    const metadata = this.getMetadata();
    this.metaService.setMetaTags(metadata);
  }

  getMetadata(): Metadata {
    return {
      ...defaultMeta,
      title: this.post?.title + ' | gwenduling',
      description: this.post?.meta_description || '',
      image: this.post?.featured_image,
      url: `/blog/${this.post?.slug}`,
    };
  }

  transformBody(): void {
    if (!this.post || !this.post.body) {
      return;
    }

    this.body = this.sanitizer.bypassSecurityTrustHtml(this.post.body);
  }

  getPublishedDate(): string {
    return dayjs(this.post?.published).format('MMMM DD, YYYY');
  }

  isStatus(state: State): boolean {
    return state === this.blogPostStatus;
  }

  getPost(): void {
    this.blogPostStatus = State.Loading;
    this.butterApiService
      .getPost(this.slug || '')
      .then((blogPost) => {
        this.setBlogListData(blogPost);
        this.blogPostStatus = State.Success;
      })
      .catch((error) => {
        console.error(error);
        this.blogPostStatus = State.Error;
      });
  }

  getRelatedPostsFromTags(): void {
    if (this.post?.tags?.[0]) {
      this.post.tags.forEach((tag) => {
        this.getRelatedPosts(tag.slug);
      });
    }
  }

  getRelatedPosts(tag: string): void {
    this.butterApiService
      .getList(1, undefined, tag, 20)
      .then((response: BlogList) => {
        if (response?.data?.data?.[0]) {
          const relatedPosts = response.data.data
            .filter((data) => {
              return (
                data.slug !== this.post?.slug &&
                (!this.relatedPosts ||
                  this.relatedPosts.findIndex((o) => o.slug === data.slug) ===
                    -1)
              );
            })
            .map((data) => ({
              name: data.title,
              slug: data.slug,
            }));

          this.relatedPosts = this.relatedPosts
            ? this.relatedPosts.concat(relatedPosts)
            : relatedPosts;
        }
      });
  }

  removeSpace(str: string): string {
    return str.split(' ').join('');
  }

  backToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
