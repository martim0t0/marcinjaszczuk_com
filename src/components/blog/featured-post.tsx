import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { formatPostDate } from "@/lib/utils/dates";

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <article className="flex flex-col gap-4 border-b border-border pb-10">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-strong">
        Featured Article
      </p>
      {post.metadata.image ? (
        <Image
          src={post.metadata.image}
          alt=""
          width={1200}
          height={630}
          className="aspect-[2/1] w-full rounded-xl object-cover"
        />
      ) : null}
      <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.metadata.title}
        </Link>
      </h2>
      <p className="text-sm text-muted">{formatPostDate(post.metadata.date)}</p>
      <p className="text-base text-foreground">{post.metadata.description}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="text-sm font-medium text-accent-strong hover:underline"
      >
        Read article →
      </Link>
    </article>
  );
}
