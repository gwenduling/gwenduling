import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';

import { State } from '../../models/state.model';
import { ButterApiService } from '../../services/butter-api.service';
import { mockBlogList } from '../../test-data/blog';
import { BlogRecentComponent } from './blog-recent.component';

describe('BlogRecentComponent', () => {
  let component: BlogRecentComponent;
  let fixture: ComponentFixture<BlogRecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogRecentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get list', async () => {
    const butterService = TestBed.inject(ButterApiService);
    spyOn(butterService, 'getList').and.returnValue(
      Promise.resolve(mockBlogList)
    );

    await component.getList();
    expect(component.posts).toHaveSize(1);
  });

  it('should set state to error on response error', fakeAsync(() => {
    const butterService = TestBed.inject(ButterApiService);
    spyOn(butterService, 'getList').and.returnValue(
      Promise.reject(new Error(''))
    );
    component.getList();
    flushMicrotasks();
    expect(component.blogRecentStatus).toBe(State.Error);
  }));
});
