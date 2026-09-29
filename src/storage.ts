import type { LinkEntry } from "./types";

const STORAGE_KEY = "links-vault.links";

function seed(): LinkEntry[] {
  const t = Date.now();
  const make = (
    i: number,
    title: string,
    url: string,
    description: string,
    tags: string[]
  ): LinkEntry => ({
    id: `seed_${i}`,
    title,
    url,
    description,
    tags,
    createdAt: t - i,
    updatedAt: t - i,
  });

  return [
    make(1, "GitHub", "https://github.com/octocat/project", "Central repo for the sprint — track issues, PRs and CI status.", ["Dev", "Git"]),
    make(2, "Figma", "https://figma.com/file/abc123", "Product design file with all screens and components.", ["Design"]),
    make(3, "MDN Web Docs", "https://developer.mozilla.org", "Reference docs for HTML, CSS and JavaScript APIs.", ["Dev", "Reading"]),
    make(4, "Dribbble", "https://dribbble.com/shots/inspo", "Design inspiration board for the new dashboard.", ["Design", "Inspo"]),
    make(5, "Smashing Magazine", "https://smashingmagazine.com", "Long read on accessible design patterns.", ["Reading"]),
    make(6, "Notion", "https://notion.so/team/roadmap", "Team roadmap and sprint planning board.", ["Tools", "Planning"]),
  ];
}

// First visit (nothing stored yet) shows sample bookmarks; after that,
// whatever is in localStorage — even an empty list — is the source of truth.
export function loadLinks(): LinkEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return seed();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LinkEntry[]) : [];
  } catch (err) {
    console.error("Failed to read links from storage", err);
    return [];
  }
}

export function saveLinks(links: LinkEntry[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    return true;
  } catch (err) {
    console.error("Failed to save links to storage", err);
    return false;
  }
}
