import {
  BlogPost,
  BlogList,
  BlogTag,
  BlogCategories,
} from '../models/blog.model';

export const mockBlogPost: BlogPost = {
  data: {
    data: {
      url: 'www.test/url',
      created: '',
      published: '2020-10-01T15:00:00Z',
      author: {
        bio: '',
        email: '',
        first_name: '',
        last_name: '',
        profile_image: '',
        slug: '',
      },
      categories: [
        {
          name: 'dev',
          slug: 'dev',
        },
      ],
      tags: [],
      featured_image: '',
      featured_image_alt: '',
      slug: '/blog-post-test',
      title: 'Blog Post Test',
      body: '<p>body content</p>',
      summary: '<p>body content</p>',
      seo_title: 'Blog Post Title',
      meta_description: '',
      status: '',
    },
    meta: {
      next_post: null,
      previous_post: null,
    },
  },
};

export const mockBlogList: BlogList = {
  data: {
    data: [
      {
        author: {
          bio: '',
          email: '',
          first_name: '',
          last_name: '',
          profile_image: '',
          slug: '',
        },
        categories: [
          {
            name: 'travel',
            slug: 'travel',
          },
        ],
        created: '',
        featured_image: '',
        featured_image_alt: '',
        meta_description: '',
        published: '',
        seo_title: '',
        slug: '',
        status: '',
        summary: '',
        tags: [],
        title: '',
        updated: '',
        url: '',
      },
    ],
    meta: {
      count: 1,
      next_page: null,
      previous_page: null,
    },
  },
};

export const mockTags: BlogTag[] = [
  {
    name: 'test slug 1',
    slug: 'test-slug-1',
  },
  {
    name: 'test slug 2',
    slug: 'test-slug-2',
  },
];

export const mockCategories: BlogCategories = {
  data: {
    data: [
      {
        name: 'Travel',
        slug: 'travel',
      },
      {
        name: 'Dev',
        slug: 'dev',
      },
    ],
  },
};
