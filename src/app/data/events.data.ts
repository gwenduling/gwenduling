import { EventDay } from '../models/event.model';

export const events: EventDay[] = [
  {
    date: '2021/01/31',
    name: `New feature: Emoji Party! Did you see it?`,
    emoji: ['🐣', '🦑', '🤷🏻‍♀️', '🐤', '🍫', '🤙🏻'],
    description: `Using HTML5 Canvas I added a new feature here to show flying (selected) emojis that is based on events; my birthday, anniversaries, holidays, announcements, whatever I like really. It's been a while since I last played around with HTML5 canvas and I can't believe I managed to create what was inside my head 🤯! You can refresh this page to see the feature again (if you haven't closed this panel yet).`,
    link: {
      href: 'https://codepen.io/gwenduling/full/gOLbajG',
      label: 'View on CodePen',
    },
  },
  {
    date: '2021/02/01',
    name: `Production test: Day 2 of Emoji Party`,
    emoji: ['🦑', '🐤', '🐶', '🐘', '🙈'],
    description: `Okay I just wanted to see more of this awesome new feature (flying emojis). Thanks for stopping by!`,
    link: {
      href: 'https://codepen.io/gwenduling/full/gOLbajG',
      label: 'View on CodePen',
    },
  },
  {
    date: '2021/02/02',
    name: `Production test: Day 3 of Emoji Party`,
    emoji: ['☀️', '🏖', '🌴', '✈', '🍂'],
    description: `Nope. Not yet tired of this emoji party 🤙🏻. Back to normal tomorrow!`,
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
      // tslint:disable-next-line: max-line-length
      // tslint:disable-next-line: quotemark
      'Been stressing since the start of 2021 that I will be 25 years old this year! That was definitely way too fast for me to process 🤯! If all goes as planned (unlike last year), we are now en route to our first travel since lockdown. Thanks for supporting my website on my special day 💋',
  },
  {
    date: '2021/03/07',
    name: 'We will take home our poodle puppy today 🥺🐶!',
    emoji: ['🐶', '🐩', '🦴', '🐾'],
    description: `Hello world, we will take home our puppy "chicken" today! BRB still on Youtube watching puppy training content. Blog soon.`,
  },
  {
    date: '2021/03/17',
    name: '1 year lockdown(-ish) due to Covid-19 with no end in sight ☹️ 🇵🇭',
    emoji: ['🦠', '🇵🇭', '😷', '😷', '🏡', '💉'],
    description:
      "This time last year we were on a meeting on who will be put on forced leave and who will start working from home. As a new employee (of only one month), I wasn't sure I was still employed. Fast forward to today and we are still WFH and lockdowns are still not lifted despite the growing number of people going outisde 👻. That's 1 whole year of confusion and bad governance.",
    link: {
      href: 'https://gwenduling.com/blog/in-quarantine-2020',
      label: 'Quarantine 2020 blog',
    },
  },
  {
    date: '2021/10/10',
    name: "Happy 1 year since moving out of mama's house 🎈",
    emoji: ['🏠', '🏡', '💸', '💑', '💆🏻‍♀️', '🏳'],
    description:
      'A year of learning to do my chores and balancing our monthly bills. A year of AJ learning to cook my favorite dishes. A year in a healthy environment where my mental health came first. Wow we did that 🥺.',
    link: {
      href: 'https://gwenduling.com/blog/timeline-building-our-house',
      label: 'Building Our House blog',
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
