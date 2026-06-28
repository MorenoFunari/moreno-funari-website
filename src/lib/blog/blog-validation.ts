import {
  getAllowedBlogCategorySlugs,
  isBlogCategorySlug,
  type BlogCategorySlug,
} from "@/config/blog-categories";
import type { BlogPostFrontmatter } from "@/types/blog";

import { compareEditorialDates, isValidEditorialDate } from "./blog-date";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COVER_IMAGE_PREFIX = "/images/blog/";

type RawFrontmatter = Record<string, unknown>;

export function validateBlogSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

export function assertValidBlogSlug(slug: string, fileName: string): void {
  if (!validateBlogSlug(slug)) {
    throw new Error(
      `Invalid blog slug in "${fileName}": file name must match [a-z0-9]+(?:-[a-z0-9]+)*.`,
    );
  }
}

export function validateBlogFrontmatter(
  data: RawFrontmatter,
  fileName: string,
): BlogPostFrontmatter {
  const title = requiredTrimmedString(data.title, fileName, "title");
  const description = requiredTrimmedString(
    data.description,
    fileName,
    "description",
  );
  const publishedAt = requiredDate(data.publishedAt, fileName, "publishedAt");
  const updatedAt = optionalDate(data.updatedAt, fileName, "updatedAt");
  const category = requiredBlogCategory(data.category, fileName);
  const tags = normalizeTags(data.tags, fileName);
  const draft = requiredBoolean(data.draft, fileName, "draft");
  const featured = optionalBoolean(data.featured, fileName, "featured", false);
  const cover = normalizeCover(data.coverImage, data.coverAlt, fileName);

  if (updatedAt && compareEditorialDates(updatedAt, publishedAt) < 0) {
    throw invalidFrontmatter(
      fileName,
      "updatedAt",
      "must not be before publishedAt.",
    );
  }

  return {
    title,
    description,
    publishedAt,
    ...(updatedAt ? { updatedAt } : {}),
    category,
    tags,
    draft,
    featured,
    ...cover,
  };
}

function requiredTrimmedString(
  value: unknown,
  fileName: string,
  field: string,
): string {
  if (typeof value !== "string") {
    throw invalidFrontmatter(fileName, field, "must be a string.");
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw invalidFrontmatter(fileName, field, "must not be empty.");
  }

  return trimmed;
}

function requiredBlogCategory(
  value: unknown,
  fileName: string,
): BlogCategorySlug {
  if (typeof value !== "string") {
    throw invalidFrontmatter(fileName, "category", "must be a string.");
  }

  if (!value.trim()) {
    throw invalidFrontmatter(fileName, "category", "must not be empty.");
  }

  if (value !== value.trim() || !isBlogCategorySlug(value)) {
    throw new Error(
      `Invalid blog frontmatter in "${fileName}": unknown category "${value}". Allowed categories: ${getAllowedBlogCategorySlugs()}.`,
    );
  }

  return value;
}

function optionalTrimmedString(
  value: unknown,
  fileName: string,
  field: string,
): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw invalidFrontmatter(fileName, field, "must be a string.");
  }

  const trimmed = value.trim();

  return trimmed || undefined;
}

function requiredDate(value: unknown, fileName: string, field: string): string {
  const date = requiredTrimmedString(value, fileName, field);

  if (!isValidEditorialDate(date)) {
    throw invalidFrontmatter(fileName, field, "must use YYYY-MM-DD.");
  }

  return date;
}

function optionalDate(
  value: unknown,
  fileName: string,
  field: string,
): string | undefined {
  const date = optionalTrimmedString(value, fileName, field);

  if (!date) {
    return undefined;
  }

  if (!isValidEditorialDate(date)) {
    throw invalidFrontmatter(fileName, field, "must use YYYY-MM-DD.");
  }

  return date;
}

function requiredBoolean(
  value: unknown,
  fileName: string,
  field: string,
): boolean {
  if (typeof value !== "boolean") {
    throw invalidFrontmatter(fileName, field, "must be a boolean.");
  }

  return value;
}

function optionalBoolean(
  value: unknown,
  fileName: string,
  field: string,
  defaultValue: boolean,
): boolean {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  if (typeof value !== "boolean") {
    throw invalidFrontmatter(fileName, field, "must be a boolean.");
  }

  return value;
}

function normalizeTags(value: unknown, fileName: string): readonly string[] {
  if (!Array.isArray(value)) {
    throw invalidFrontmatter(fileName, "tags", "must be an array of strings.");
  }

  const tags: string[] = [];
  const seen = new Set<string>();

  for (const tag of value) {
    if (typeof tag !== "string") {
      throw invalidFrontmatter(
        fileName,
        "tags",
        "must contain only strings.",
      );
    }

    const normalized = tag.trim();
    const key = normalized.toLocaleLowerCase("it-IT");

    if (normalized && !seen.has(key)) {
      tags.push(normalized);
      seen.add(key);
    }
  }

  return tags;
}

function normalizeCover(
  coverImageValue: unknown,
  coverAltValue: unknown,
  fileName: string,
): Pick<BlogPostFrontmatter, "coverImage" | "coverAlt"> {
  const coverImage = optionalTrimmedString(
    coverImageValue,
    fileName,
    "coverImage",
  );
  const coverAlt = optionalTrimmedString(coverAltValue, fileName, "coverAlt");

  if (!coverImage && !coverAlt) {
    return {};
  }

  if (!coverImage || !coverAlt) {
    throw invalidFrontmatter(
      fileName,
      "coverImage",
      "and coverAlt must both be present or both be absent.",
    );
  }

  if (!coverImage.startsWith(COVER_IMAGE_PREFIX)) {
    throw invalidFrontmatter(
      fileName,
      "coverImage",
      `must start with ${COVER_IMAGE_PREFIX}.`,
    );
  }

  if (coverImage.includes("..") || coverImage.includes("\\") || coverImage.includes("//")) {
    throw invalidFrontmatter(
      fileName,
      "coverImage",
      "must be a local image path without traversal.",
    );
  }

  if (!coverAlt) {
    throw invalidFrontmatter(fileName, "coverAlt", "must not be empty.");
  }

  return { coverImage, coverAlt };
}

function invalidFrontmatter(
  fileName: string,
  field: string,
  reason: string,
): Error {
  return new Error(
    `Invalid blog frontmatter in "${fileName}": "${field}" ${reason}`,
  );
}
