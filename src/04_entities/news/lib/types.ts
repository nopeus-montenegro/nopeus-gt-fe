export interface NewsPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover: string;
}

export interface NewsPost extends NewsPostMeta {
  content: string;
}
