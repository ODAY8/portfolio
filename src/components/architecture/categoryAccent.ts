const ACCENTS = ['accentBlue', 'accentLavender', 'accentTeal', 'accentGreen'] as const

const FIXED_ASSIGNMENTS: Record<string, (typeof ACCENTS)[number]> = {
  Cybersecurity: 'accentBlue',
  'Artificial Intelligence': 'accentLavender',
  'Full-Stack': 'accentTeal',
  'Mobile Application': 'accentGreen',
}

/** Stable category -> accent mapping so a category always reads the same
 * color everywhere (card badge, filter pills), rather than shifting with
 * array position. Unrecognized categories (added later) fall back to a
 * deterministic hash so the system still scales without a code change. */
export function categoryAccentClass(category: string): (typeof ACCENTS)[number] {
  const fixed = FIXED_ASSIGNMENTS[category]
  if (fixed) return fixed

  let hash = 0
  for (let i = 0; i < category.length; i++) hash = (hash * 31 + category.charCodeAt(i)) >>> 0
  return ACCENTS[hash % ACCENTS.length]
}
