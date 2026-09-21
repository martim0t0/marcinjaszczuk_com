import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeaturedPost } from "@/components/blog/featured-post";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getPublishedPosts } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on software engineering and building this site.",
};

export default function BlogIndexPage() {
  const posts = getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <Container className="flex flex-col gap-10 py-16">
      <SectionHeading as="h1">Blog</SectionHeading>

      {featured ? <FeaturedPost post={featured} /> : null}

      {rest.length ? (
        <section aria-labelledby="recent-articles-heading" className="flex flex-col gap-6">
          <h2
            id="recent-articles-heading"
            className="text-lg font-semibold text-foreground"
          >
            Recent Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {rest.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ) : null}

      {posts.length === 0 ? (
        <p className="text-sm text-muted">No posts published yet.</p>
      ) : null}
    </Container>
  );
}
