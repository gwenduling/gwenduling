import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tl-ph';

import { ConfettiComponent } from './confetti.component';
import { EventsService } from '../../services/events.service';
import { mockEvents } from '../../test-data/event';

describe('ConfettiComponent', () => {
  let component: ConfettiComponent;
  let fixture: ComponentFixture<ConfettiComponent>;
  let eventsService: EventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfettiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfettiComponent);
    component = fixture.componentInstance;
    component.emoji = ['🐣', '🦑'];
    fixture.detectChanges();
  });

  beforeEach(() => {
    const mockEventToday = {
      ...mockEvents[0],
      date: dayjs().locale(locale).format('YYYY/MM/DD'),
    };
    eventsService = TestBed.inject(EventsService);
    eventsService.events = [mockEventToday, mockEvents[1], mockEvents[2]];
    eventsService._event = mockEventToday;
    eventsService.hasEventToday = () => true;
    fixture.detectChanges();
  });

  beforeEach(function () {
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should end drawing in canvas after 5s', () => {
    component.endDraw();
    component.continueDraw = true;
    jasmine.clock().tick(5000);
    expect(component.continueDraw).toBeFalsy();
  });

  it('should close event if event has no description', () => {
    spyOn(eventsService, 'closeEvent');
    component.endDraw();
    jasmine.clock().tick(5000);
    expect(eventsService.closeEvent).toHaveBeenCalled();
  });

  it('should clear canvas after ending draw', () => {
    component.canvasContext = ({
      clearRect: () => {},
    } as any) as CanvasRenderingContext2D;

    spyOn(component.canvasContext, 'clearRect');
    component.endDraw();
    jasmine.clock().tick(5500);
    expect(component.canvasContext!.clearRect).toHaveBeenCalledOnceWith(
      0,
      0,
      component.canvasWidth!,
      component.canvasHeight!
    );
  });
});
