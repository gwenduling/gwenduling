import { EventDay } from '../models/event.model';

export const mockEvents: EventDay[] = [
  {
    date: '2021/02/01',
    name: 'Event name',
    emoji: ['💕', '💛', '❣️', '🥰'],
  },
  {
    date: '2021/02/02',
    name: 'Event name 2',
    description: 'Event description',
    emoji: ['💛', '❣️', '🥰'],
  },
  {
    date: '2021/01/31',
    name: 'Event name',
    description: `Event description`,
    emoji: ['🥳', '🎁', '🎈', '🎂'],
    link: {
      href: 'http://test.com',
      label: 'Event link label',
    },
  },
];
