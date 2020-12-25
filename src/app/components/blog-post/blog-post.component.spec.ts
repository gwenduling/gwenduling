import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { BlogPostComponent } from './blog-post.component';
import { BlogPost } from '../../models/blog.model';
import { mockBlogPost } from '../../test-data/blog';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;
  let mockPost: BlogPost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostComponent ],
      imports: [
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockPost = mockBlogPost;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data from service', () => {
    component.setBlogListData(mockPost);
    expect(component.meta).toBeTruthy();
    expect(component.post).toBeTruthy();
  });

  it('should not transform body when post is undefined', () => {
    component.post = undefined;
    component.transformBody();
    expect(component.body).toBeUndefined();
  })

  it('should set publish date', () => {
    component.post = mockPost?.data?.data;
    expect('October 01, 2020').toBe(component.getPublishedDate());
  });
});
