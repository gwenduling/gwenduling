import { Component, OnInit } from '@angular/core';

import { ButterApiService } from '../../services/butter-api.service';
import { BlogList, BlogListItem } from '../../models/blog.model';
import { State } from '../../models/state.model';

@Component({
  selector: 'app-blog-recent',
  templateUrl: './blog-recent.component.html',
  styleUrls: ['./blog-recent.component.scss']
})
export class BlogRecentComponent implements OnInit {
  posts: BlogListItem[] | undefined = [];
  blogRecentStatus: State | undefined;
  state = State;

  constructor(private butterApiService: ButterApiService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.blogRecentStatus = State.Loading;
    this.butterApiService.getList(1, undefined, 4).then((response: BlogList) => {
      this.blogRecentStatus = State.Success;
      this.posts = response?.data?.data;
    }).catch(error => {
      console.error(error);
      this.blogRecentStatus = State.Error;
    })
  }

  isStatus(state: State): boolean {
    return state === this.blogRecentStatus;
  }
}
