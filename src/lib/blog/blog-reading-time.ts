const WORDS_PER_MINUTE = 200;

export function calculateReadingTimeMinutes(content: string): number {
  const text = content
    .replace(/^---[\s\S]*?---/, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_[\](){}.!?,:;"'|=-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text) {
    return 1;
  }

  return Math.max(1, Math.ceil(text.split(" ").length / WORDS_PER_MINUTE));
}
