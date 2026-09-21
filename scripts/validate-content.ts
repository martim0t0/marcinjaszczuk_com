import { getAllPosts } from "../src/lib/blog/posts";

try {
  const posts = getAllPosts();
  console.log(`Validated ${posts.length} blog post(s). All content valid.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
