export const formatPrice = (n: number) => new Intl.NumberFormat('sv-SE').format(n);

/** Delar upp en rubrik så att `highlight` kan visas kursivt i accentfärg. */
export function splitHighlight(title: string, highlight?: string): [string, string, string] {
  if (!highlight || !title.includes(highlight)) return [title, '', ''];
  const i = title.indexOf(highlight);
  return [title.slice(0, i), highlight, title.slice(i + highlight.length)];
}

/** Ikoner för tjänsterna på startsidan (inre SVG-markup), används i tur och ordning. */
export const serviceIcons = [
  '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M7 21h10"/>',
  '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.3-4.3"/>',
  '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 10h8"/>',
  '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/>',
  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
];
