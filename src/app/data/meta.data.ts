import { Metadata } from '../models/meta.model';

export const defaultMeta: Metadata = {
  title: 'gwenduling',
  description: "gwenduling's personal blog/website.",
  follow: true,
  url: '/',
  image: 'http://gwenduling.com/assets/images/gwenduling_preview.JPG',
};

export const noFollowMeta: Metadata = {
  ...defaultMeta,
  follow: false,
};

export const blogMeta: Metadata = {
  ...defaultMeta,
  title: 'gwenduling | blog',
  url: '/blog',
};
