import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tl-ph';

import { EventsService } from './events.service';
import { mockEvents } from '../test-data/event';
import { EventDay } from '../models/event.model';

describe('EventsService', () => {
  let service: EventsService;
  let events: EventDay[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });

    events = [
      {
        ...mockEvents[0],
        date: dayjs().locale(locale).format('YYYY/MM/DD'),
      },
      mockEvents[1],
      mockEvents[2],
    ];
  });

  describe('platform browser', () => {
    beforeEach(() => {
      TestBed.compileComponents();
      service = TestBed.inject(EventsService);
      service.events = events;
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return true when event is available', () => {
      localStorage.clear();
      expect(service.hasEventToday()).toBeTruthy();
    });

    it('should return false when no event available', () => {
      service.events = [
        {
          ...mockEvents[0],
          date: '2020/01/01',
        },
      ];

      expect(service.hasEventToday()).toBeFalsy();
    });

    it('should set event and cursor when event is available', () => {
      service._event = undefined;
      spyOn(service, 'setCursor');
      service.hasEventToday();
      expect(service.setCursor).toHaveBeenCalledOnceWith();
      expect(service._event).toBeDefined();
    });

    it('should not re-set event and cursor when event is already set', () => {
      service._event = service.events[0];
      spyOn(service, 'setCursor');
      service.hasEventToday();
      expect(service.setCursor).not.toHaveBeenCalledOnceWith();
      expect(service._event).toBeDefined();
    });

    it('should return undefined if no event available', () => {
      service.hasEventToday = () => false;
      expect(service.event).toBeUndefined();
    });
  });

  it('should return false when platform is server', () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    TestBed.compileComponents();
    service = TestBed.inject(EventsService);
    service.events = events;
    expect(service.hasEventToday()).toBeFalsy();
  });
});
