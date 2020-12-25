import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlogComponent } from './blog.component';
import { ButterApiService } from '../../services/butter-api.service';
import { of } from 'rxjs';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return undefined total pages when no data is found', () => {
    expect(component.getTotalPages()).toBeUndefined();
  });

  it('should return total pages', () => {
    component.meta = {
      count: 45,
      next_page: null,
      previous_page: null
    };
    component.pageSize = 10;

    expect(component.getTotalPages()).toBe(5);
  });

  it('should get default title', () => {
    expect(component.getTitle()).toBe('recent stories ☕️');
  });

  it('should get category title', () => {
    component.category = 'travel';
    expect(component.getTitle()).toBe('travel stories ☕️');

    component.category = 'personal';
    expect(component.getTitle()).toBe('personal stories ☕️');

    component.category = 'dev';
    expect(component.getTitle()).toBe('dev stories ☕️');
  });

  it('should get list', async () => {
    const butterService = TestBed.inject(ButterApiService);
    const data = {
      data: undefined,
      meta: undefined
    };
    spyOn(butterService, 'getList').and.returnValue(Promise.resolve(data));
    spyOn(component, 'setBlogListData');
    await component.getList(1);
    expect(component.setBlogListData).toHaveBeenCalled();
  });
});
