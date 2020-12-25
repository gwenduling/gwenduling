export interface BlogList {
  data?: {
    data: BlogListItem[];
    meta: BlogMeta;
  };
}

export interface BlogListItem {
  author: BlogAuthor;
  categories: BlogCategory[];
  created: string;
  featured_image: string;
  featured_image_alt: string;
  meta_description: string;
  published: string;
  seo_title: string;
  slug: string;
  status: string;
  summary: string;
  tags: BlogTag[];
  title: string;
  updated: string;
  url: string;
}

export interface BlogAuthor {
  bio: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  slug: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
}

export interface BlogTag {
  name: string;
  slug: string;
}

export interface BlogMeta {
  count: number;
  next_page: number | null;
  previous_page: number | null;
}

export interface BlogCategories {
  data?: {
    data: BlogCategory[];
  };
}

export interface BlogListParams {
  exclude_body: boolean;
  page: number;
  page_size: number;
  category_slug?: string;
}

export interface BlogPostMetaItem {
  slug: string;
  title: string;
  featured_image: string;
}

export interface BlogPostMeta {
  next_post: BlogPostMetaItem | null;
  previous_post: BlogPostMetaItem | null;
}

export interface BlogPost {
  data?: {
    meta: BlogPostMeta;
    data: BlogPostData;
  };
}

export interface BlogPostData {
  url: string;
  created: string;
  published: string;
  author: BlogAuthor;
  categories: BlogCategory[];
  tags: BlogTag[];
  featured_image: string;
  featured_image_alt: string;
  slug: string;
  title: string;
  body: string;
  summary: string;
  seo_title: string;
  meta_description: string;
  status: string;
}
