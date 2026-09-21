import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMetadata } from "@/types/blog";
import {
  findDuplicateSlugs,
  validateFrontmatter,
  type ContentValidationError,
} from "@/lib/content/schema";

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content", "blog");

interface RawPost {
  slug: string;
  data: unknown;
  content: string;
}

function readRawPosts(): RawPost[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) return [];

  return fs
    .readdirSync(BLOG_CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(BLOG_CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, data, content };
    });
}

/**
 * Validates every post's frontmatter and checks for duplicate slugs.
 * Throws a single aggregated error listing every problem found so a
 * production build fails loudly instead of shipping a broken page (SPEC §27).
 */
export function getAllPosts(): BlogPost[] {
  const raw = readRawPosts();
  const errors: ContentValidationError[] = [];
  const posts: BlogPost[] = [];

  for (const { slug, data, content } of raw) {
    const result = validateFrontmatter(slug, data);
    if (!result.success) {
      errors.push(result.error);
      continue;
    }
    posts.push({ slug, metadata: result.data, content });
  }

  const duplicates = findDuplicateSlugs(raw.map((post) => post.slug));
  for (const slug of duplicates) {
    errors.push({ slug, issues: ["duplicate slug"] });
  }

  if (errors.length > 0) {
    const message = errors
      .map((error) => `- ${error.slug}: ${error.issues.join("; ")}`)
      .join("\n");
    throw new Error(`Invalid blog content:\n${message}`);
  }

  return posts.sort(
    (a, b) => Date.parse(b.metadata.date) - Date.parse(a.metadata.date),
  );
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.metadata.published);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return getPublishedPosts().map((post) => post.slug);
}

export type { BlogPostMetadata };
