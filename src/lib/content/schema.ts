import { z } from "zod";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export const frontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  date: z
    .string()
    .regex(isoDatePattern, "date must be in YYYY-MM-DD format")
    .refine((value) => !Number.isNaN(Date.parse(value)), "date is invalid"),
  author: z.string().min(1, "author is required"),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  image: z.string().optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export interface ContentValidationError {
  slug: string;
  issues: string[];
}

export function validateFrontmatter(
  slug: string,
  data: unknown,
): { success: true; data: Frontmatter } | { success: false; error: ContentValidationError } {
  const result = frontmatterSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: {
      slug,
      issues: result.error.issues.map(
        (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`,
      ),
    },
  };
}

export function findDuplicateSlugs(slugs: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const slug of slugs) {
    if (seen.has(slug)) {
      duplicates.add(slug);
    }
    seen.add(slug);
  }
  return [...duplicates];
}
