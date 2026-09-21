import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { formatPostDate } from "@/lib/utils/dates";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5">
      {post.metadata.image ? (
        <Image
          src={post.metadata.image}
          alt=""
          width={640}
          height={360}
          className="aspect-video w-full rounded-lg object-cover"
        />
      ) : null}
      <p className="text-xs text-muted">
        {formatPostDate(post.metadata.date)}
      </p>
      <h3 className="text-lg font-semibold text-foreground">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.metadata.title}
        </Link>
      </h3>
      <p className="text-sm text-muted">{post.metadata.description}</p>
      {post.metadata.tags.length ? (
        <div className="flex flex-wrap gap-2">
          {post.metadata.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
      <Link
        href={`/blog/${post.slug}`}
        className="text-sm font-medium text-accent-strong hover:underline"
      >
        Read article →
      </Link>
    </article>
  );
}
