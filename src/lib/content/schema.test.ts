import { describe, expect, test } from "bun:test";
import { findDuplicateSlugs, validateFrontmatter } from "./schema";

describe("validateFrontmatter", () => {
  test("accepts valid frontmatter", () => {
    const result = validateFrontmatter("valid-post", {
      title: "A Post",
      description: "A description",
      date: "2026-01-01",
      author: "Marcin",
      tags: ["Next.js"],
      published: true,
    });
    expect(result.success).toBe(true);
  });

  test("rejects missing title", () => {
    const result = validateFrontmatter("missing-title", {
      description: "A description",
      date: "2026-01-01",
      author: "Marcin",
    });
    expect(result.success).toBe(false);
  });

  test("rejects an invalid date", () => {
    const result = validateFrontmatter("bad-date", {
      title: "A Post",
      description: "A description",
      date: "not-a-date",
      author: "Marcin",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((issue) => issue.includes("date"))).toBe(
        true,
      );
    }
  });

  test("defaults tags and published when omitted", () => {
    const result = validateFrontmatter("defaults", {
      title: "A Post",
      description: "A description",
      date: "2026-01-01",
      author: "Marcin",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tags).toEqual([]);
      expect(result.data.published).toBe(true);
    }
  });
});

describe("findDuplicateSlugs", () => {
  test("returns slugs that appear more than once", () => {
    expect(findDuplicateSlugs(["a", "b", "a", "c", "c"])).toEqual(["a", "c"]);
  });

  test("returns an empty array when there are no duplicates", () => {
    expect(findDuplicateSlugs(["a", "b", "c"])).toEqual([]);
  });
});
