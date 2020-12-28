import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BlogComponent } from './blog.component';
import { ButterApiService } from '../../services/butter-api.service';
import { mockBlogList } from '../../test-data/blog';
import { State } from '../../models/state.model';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  const mockActivatedRoute = {
    data: of({ blogList: mockBlogList }),
    snapshot: {
      params: {
        category: 'travel',
      },
    },
  };

  const mockActivatedRouteError = {
    data: of('Error'),
  };

  describe('default component configuration', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BlogComponent],
        imports: [RouterTestingModule],
        providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
      }).compileComponents();
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
      component.meta = undefined;
      component.pageSize = 10;
      expect(component.getTotalPages()).toBeUndefined();
    });

    it('should return total pages', () => {
      component.meta = {
        count: 45,
        next_page: null,
        previous_page: null,
      };
      component.pageSize = 10;

      expect(component.getTotalPages()).toBe(5);
    });

    it('should set status to success when data is available', () => {
      expect(component.blogListStatus).toBe(State.Success);
    });

    it('should get category from the activatedRoute params', () => {
      expect(component.getTitle()).toBe('travel stories ☕️');
    });

    it('should get title when category if undefined', () => {
      component.category = undefined;
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
        meta: undefined,
      };
      spyOn(butterService, 'getList').and.returnValue(Promise.resolve(data));
      spyOn(component, 'setBlogListData');
      await component.getList(1);
      expect(component.setBlogListData).toHaveBeenCalled();
    });

    it('should set state to error on response error', fakeAsync(() => {
      const butterService = TestBed.inject(ButterApiService);
      spyOn(butterService, 'getList').and.returnValue(
        Promise.reject(new Error(''))
      );
      component.getList(1);
      flushMicrotasks();
      expect(component.blogListStatus).toBe(State.Error);
    }));

    it('should return current page', () => {
      expect(component.getPage()).toBe(1);
    });
  });

  describe('component resolver error', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BlogComponent],
        imports: [RouterTestingModule],
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRouteError },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BlogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should set status to error', () => {
      expect(component.blogListStatus).toBe(State.Error);
    });
  });
});
