import { describe, expect, test } from "bun:test";
import { getAllPosts, getPublishedPosts } from "./posts";

describe("blog posts (against the real content/blog fixtures)", () => {
  test("orders posts newest-first", () => {
    const posts = getAllPosts();
    const dates = posts.map((post) => Date.parse(post.metadata.date));
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  test("excludes unpublished posts from getPublishedPosts", () => {
    const all = getAllPosts();
    const published = getPublishedPosts();
    expect(published.every((post) => post.metadata.published)).toBe(true);
    expect(published.length).toBeLessThanOrEqual(all.length);
  });
});
