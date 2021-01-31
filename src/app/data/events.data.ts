import { EventDay } from '../models/event.model';

export const events: EventDay[] = [
  {
    date: '2021/01/31',
    name: `New feature: Emoji Confetti! Did you see it?`,
    emoji: ['🐣', '🦑', '🤷🏻‍♀️', '🐤', '🏖', '🍫', '🍟'],
    description: `Using HTML5 Canvas I added a new feature here to show a confetti of (selected) emojis that is based on events; my birthday, anniversaries, holidays, announcements, whatever I like really. It's been a while since I last played around with HTML5 canvas and I can't believe I managed to create what was inside my head 🤯! You can refresh this page to see the confetti feature again (if you haven't closed this panel yet).`,
    link: {
      href: 'https://codepen.io/gwenduling/full/gOLbajG',
      label: 'View on CodePen',
    },
  },
  {
    date: '2021/03/06',
    name: `It's my birthday today!`,
    emoji: ['🐣', '🎁', '🎈', '🎂', '🥳'],
    description:
      'So that was 25 years! I got lucky with the decision I made at 16 years old on what I will do with my life (write code). That was almost 10 years ago 👵🏼! I am overwhelmed with all the blessing that came with this career so a new goal of mine is to (finally) give back. Thank you for supporting my personal website on my birthday! 🐣',
    link: {
      href: 'mailto:gioweeargao@gmail.com?Subject=HBD%20Gwe!',
      label: 'Greet me via email',
    },
  },
  {
    date: '2021/02/14',
    name: 'Happy Hearts day to you!',
    emoji: ['💕', '💛', '❣️', '🥰'],
  },
  {
    date: '2021/07/11',
    name: "boyfie's birthday today!",
    description: `If you're reading this babe, I love you! This is me running out of ideas to surprise you 🤪 (Apologies for being cheesy hehe)`,
    emoji: ['🥳', '🎁', '🎈', '🎂'],
    link: {
      href: 'http://ajquiambao.com',
      label: 'Checkout his new website!',
    },
  },
  {
    date: '2021/06/12',
    name: 'Happy Independence day Philippines! #OustDuterte',
    emoji: ['🇵🇭'],
  },
  {
    date: '2021/10/31',
    name: 'Happy Halloween!',
    emoji: ['👻', '🎃'],
  },
  {
    date: '2021/12/23',
    name: 'Merry Christmas Eve Eve!',
    emoji: ['🎄', '🎅🏼', '🤶🏾', '🧧', '🎁'],
  },
  {
    date: '2021/12/24',
    name: 'Merry Christmas Eve!',
    emoji: ['🎄', '🎅🏼', '🤶🏾', '🧧', '🎁'],
  },
  {
    date: '2021/12/25',
    name: 'Merry Christmas!',
    emoji: ['🎄', '🎅🏼', '🤶🏾', '🧧', '🎁'],
    description: 'Seasons greetings! Hope you are having an awesome holiday!',
  },
  {
    date: '2022/01/01',
    name: 'Happy New Year!',
    emoji: ['🎆', '🎉', '🥳'],
    description: `Day 1 and hopeful. Have you finished writing down your 2022 goals?`,
  },
];
