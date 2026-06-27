import type { Metadata } from "next";

import { BlogEmptyState } from "@/components/sections/blog/blog-empty-state";
import { BlogHero } from "@/components/sections/blog/blog-hero";
import { BlogResourcesSection } from "@/components/sections/blog/blog-resources-section";
import { BlogTopicsSection } from "@/components/sections/blog/blog-topics-section";
import { FeaturedPostSection } from "@/components/sections/blog/featured-post-section";
import { PostsGridSection } from "@/components/sections/blog/posts-grid-section";
import { siteConfig } from "@/config/site";
import { getPublishedBlogPosts } from "@/lib/blog/blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Riflessioni concrete su fiducia, pressione, errore, lavoro, sport e piccoli passi possibili nella vita quotidiana.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog",
    description:
      "Riflessioni concrete su fiducia, pressione, errore, lavoro, sport e piccoli passi possibili nella vita quotidiana.",
    url: `${siteConfig.url}/blog`,
  },
  twitter: {
    card: "summary",
    title: "Blog",
    description:
      "Riflessioni concrete su fiducia, pressione, errore, lavoro, sport e piccoli passi possibili nella vita quotidiana.",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const remainingPosts = featuredPost
    ? posts.filter((post) => post.slug !== featuredPost.slug)
    : [];
  const featuredLabel =
    featuredPost && featuredPost.featured ? "In evidenza" : "Ultimo articolo";

  return (
    <main id="main-content">
      <BlogHero hasPosts={posts.length > 0} />
      {featuredPost ? (
        <>
          <FeaturedPostSection label={featuredLabel} post={featuredPost} />
          <PostsGridSection posts={remainingPosts} />
        </>
      ) : (
        <BlogEmptyState />
      )}
      <BlogTopicsSection />
      <BlogResourcesSection />
    </main>
  );
}
