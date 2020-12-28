import {
  ComponentFixture,
  fakeAsync,
  flushMicrotasks,
  TestBed,
} from '@angular/core/testing';

import { State } from '../../models/state.model';
import { ButterApiService } from '../../services/butter-api.service';
import { mockCategories } from '../../test-data/blog';
import { BlogCategoriesComponent } from './blog-categories.component';

describe('BlogCategoriesComponent', () => {
  let component: BlogCategoriesComponent;
  let fixture: ComponentFixture<BlogCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogCategoriesComponent],
    }).compileComponents();
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

  it('should get categories', async () => {
    const butterService = TestBed.inject(ButterApiService);
    spyOn(butterService, 'getCategories').and.returnValue(
      Promise.resolve(mockCategories)
    );

    await component.getCategories();
    expect(component.categories).toHaveSize(2);
  });

  it('should set state to error on response error', fakeAsync(() => {
    const butterService = TestBed.inject(ButterApiService);
    spyOn(butterService, 'getCategories').and.returnValue(
      Promise.reject(new Error(''))
    );
    component.getCategories();
    flushMicrotasks();
    expect(component.blogCategoriesStatus).toBe(State.Error);
  }));
});
