export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  published: boolean;
}

export interface BlogPost {
  slug: string;
  metadata: BlogPostMetadata;
  content: string;
}
