import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tl-ph';

@Injectable({
  providedIn: 'root'
})
export class AgeService {
  constructor() { }

  getAge(day?: string): number {
    const birthday = dayjs('1996/03/06')
      .locale(locale);

    const today = dayjs(day ? day : undefined)
      .locale(locale);

    return today.diff(birthday, 'year');
  }
}
