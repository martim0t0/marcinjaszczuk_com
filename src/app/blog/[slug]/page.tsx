import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog/posts";
import { formatPostDate } from "@/lib/utils/dates";
import { siteConfig } from "@/lib/utils/site";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${slug}`;
  return {
    title: post.metadata.title,
    description: post.metadata.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description: post.metadata.description,
      url,
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
      images: post.metadata.image ? [post.metadata.image] : undefined,
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post || !post.metadata.published) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return (
    <Container className="py-16">
      <article>
        <header className="flex flex-col gap-3 border-b border-border pb-8">
          <p className="text-sm text-muted">
            {formatPostDate(post.metadata.date)} · {post.metadata.author}
          </p>
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
            {post.metadata.title}
          </h1>
          {post.metadata.tags.length ? (
            <div className="flex flex-wrap gap-2">
              {post.metadata.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </header>
        <div className="max-w-prose pb-4 pt-2">{content}</div>
      </article>
    </Container>
  );
}
