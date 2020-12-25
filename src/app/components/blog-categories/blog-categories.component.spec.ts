import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoriesComponent } from './blog-categories.component';

describe('BlogCategoriesComponent', () => {
  let component: BlogCategoriesComponent;
  let fixture: ComponentFixture<BlogCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get default emoji', () => {
    expect(component.getEmoji('')).toBe('🐣');
  });

  it('should get travel emoji', () => {
    expect(component.getEmoji('travel')).toBe('🌎');
  });

  it('should get dev emoji', () => {
    expect(component.getEmoji('dev')).toBe('💻');
  });

  it('should get personal emoji', () => {
    expect(component.getEmoji('personal')).toBe('💁🏻‍♀️');
  });
});
