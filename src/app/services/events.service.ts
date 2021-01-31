import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tl-ph';

import { events } from '../data/events.data';
import { EventDay } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  events: EventDay[] = events;
  _event: EventDay | undefined;
  showPanel: boolean = false;

  constructor() {}

  hasEventToday(): boolean {
    const today = dayjs().locale(locale);

    return this.events.some((event: EventDay) => {
      const day = dayjs(event.date).locale(locale);
      const todayFormatted = today.format('DD/MM/YYYY');
      const todayLocalStorageFlag: string | null = localStorage.getItem(
        todayFormatted
      );

      if (today.format('DD/MM/YYYY') === day.format('DD/MM/YYYY')) {
        if (!this._event) {
          this._event = event;
          this.setCursor();
        }

        this.showPanel = todayLocalStorageFlag !== 'Y';

        return true;
      }

      return;
    });
  }

  set event(value: EventDay | undefined) {
    this._event = value;
  }

  get event(): EventDay | undefined {
    if (!this.hasEventToday()) return undefined;

    return this._event!;
  }

  setCursor(): void {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="font-size:20px"><text y="20">${
      this._event!.emoji[0]
    }</text></svg>`;

    document.body.style.cursor = `url('data:image/svg+xml;utf8,${svg}'), auto`;
  }

  closeEvent(): void {
    const today = dayjs().locale(locale);

    localStorage.setItem(today.format('DD/MM/YYYY'), 'Y');
  }
}
