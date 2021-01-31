import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tl-ph';

import { EventComponent } from './event.component';
import { mockEvents } from '../../test-data/event';
import { EventsService } from '../../services/events.service';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    component.event = {
      ...mockEvents[0],
      date: dayjs().locale(locale).format('DD/MM/YYYY'),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only title if no description available', () => {
    const title = fixture.nativeElement.querySelector('p.title');
    const content = fixture.nativeElement.querySelector('p.content');
    const customButton = fixture.nativeElement.querySelector('a.button.-first');

    expect(title).toBeTruthy();
    expect(content).toBeFalsy();
    expect(customButton).toBeFalsy();
  });

  it('should display custom button if available', () => {
    component.event = mockEvents[2];
    fixture.detectChanges();
    const customButton = fixture.nativeElement.querySelector('a.button.-first');
    expect(customButton).toBeTruthy();
  });

  it('should close panel', () => {
    const eventsService = TestBed.inject(EventsService);
    spyOn(eventsService, 'closeEvent');
    component.closeEvent();
    expect(eventsService.closeEvent).toHaveBeenCalled();
  });
});
