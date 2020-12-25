import { Component, OnInit } from '@angular/core';

import { ButterApiService } from '../../services/butter-api.service';
import { BlogCategories, BlogCategory } from '../../models/blog.model';
import { State } from '../../models/state.model';

@Component({
  selector: 'app-blog-categories',
  templateUrl: './blog-categories.component.html',
  styleUrls: ['./blog-categories.component.scss']
})
export class BlogCategoriesComponent implements OnInit {
  categories: BlogCategory[] | undefined;
  blogCategoriesStatus: State | undefined;
  state = State;

  constructor(
    private butterApiService: ButterApiService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.blogCategoriesStatus = State.Loading;
    this.butterApiService.getCategories()
      .then((response: BlogCategories) => {
        this.blogCategoriesStatus = State.Success;
        this.categories = response?.data?.data;
      })
      .catch((error) => {
        console.error(error);
        this.blogCategoriesStatus = State.Error;
      });
  }

  getEmoji(categoryName: string): string {
    switch (categoryName.toLowerCase()) {
      case 'dev':
        return '💻';

      case 'travel':
        return '🌎';

      case 'personal':
        return '💁🏻‍♀️';

      default:
        return '🐣';
    }
  }

  isStatus(state: State): boolean {
    return state === this.blogCategoriesStatus;
  }
}
