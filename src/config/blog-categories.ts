type BlogCategoryDefinition = {
  slug: string;
  label: string;
  description: string;
};

export const blogCategories = [
  {
    slug: "consapevolezza",
    label: "Consapevolezza",
    description:
      "Osservare pensieri, reazioni e abitudini per capire con maggiore chiarezza ciò che sta accadendo.",
  },
  {
    slug: "fiducia-e-azione",
    label: "Fiducia e azione",
    description:
      "Fare un primo passo anche quando la sicurezza non è ancora completa.",
  },
  {
    slug: "pressione-e-lavoro",
    label: "Pressione e lavoro",
    description:
      "Responsabilità, aspettative, autocritica e lucidità nei momenti professionali più intensi.",
  },
  {
    slug: "sport-e-mentalita",
    label: "Sport e mentalità",
    description:
      "Errore, presenza, concentrazione, rispetto e capacità di tornare nell’azione successiva.",
  },
  {
    slug: "vita-quotidiana",
    label: "Vita quotidiana",
    description:
      "Cambiamenti, relazioni, stanchezza e piccoli gesti concreti nelle situazioni di ogni giorno.",
  },
] as const satisfies readonly BlogCategoryDefinition[];

export type BlogCategory = (typeof blogCategories)[number];
export type BlogCategorySlug = BlogCategory["slug"];

export function isBlogCategorySlug(value: string): value is BlogCategorySlug {
  return blogCategories.some((category) => category.slug === value);
}

export function getBlogCategoryBySlug(slug: BlogCategorySlug): BlogCategory {
  const category = blogCategories.find((candidate) => candidate.slug === slug);

  if (!category) {
    throw new Error(`Unknown blog category slug: ${slug}`);
  }

  return category;
}

export function getBlogCategoryLabel(slug: BlogCategorySlug): string {
  return getBlogCategoryBySlug(slug).label;
}

export function getAllowedBlogCategorySlugs(): string {
  return blogCategories.map((category) => category.slug).join(", ");
}
