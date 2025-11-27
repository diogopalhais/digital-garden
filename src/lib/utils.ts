import type { CollectionEntry } from 'astro:content';

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a date to a short string (e.g., "Nov 2025")
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
  }).format(date);
}

/**
 * Sort projects by date (newest first)
 */
export function sortProjectsByDate(
  projects: CollectionEntry<'projects'>[]
): CollectionEntry<'projects'>[] {
  return projects.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Filter published content (not drafts)
 */
export function filterPublished<T extends { data: { draft?: boolean } }>(
  items: T[]
): T[] {
  return items.filter((item) => !item.data.draft);
}

/**
 * Get featured items
 */
export function filterFeatured<T extends { data: { featured?: boolean } }>(
  items: T[]
): T[] {
  return items.filter((item) => item.data.featured);
}

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}
