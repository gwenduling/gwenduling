import { TestBed } from '@angular/core/testing';

import { ButterApiService } from './butter-api.service';
import { butterService } from './butter.service';

describe('ButterApiService', () => {
  let service: ButterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set category as param when available', async () => {
    spyOn(butterService.post, 'list');
    await service.getList(undefined, 'dev', undefined);
    expect(butterService.post.list).toHaveBeenCalledWith({
      exclude_body: true,
      page: 1,
      page_size: 10,
      category_slug: 'dev'
    });
  });

  it('should not set category as param when not available', async () => {
    spyOn(butterService.post, 'list');
    await service.getList(undefined, undefined, undefined);
    expect(butterService.post.list).toHaveBeenCalledWith({
      exclude_body: true,
      page: 1,
      page_size: 10
    });
  });
});
