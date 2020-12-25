import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButterLinkComponent } from './butter-link.component';

describe('ButterLinkComponent', () => {
  let component: ButterLinkComponent;
  let fixture: ComponentFixture<ButterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButterLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
