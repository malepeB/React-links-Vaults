export interface LinkEntry {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export type LinkDraft = Omit<LinkEntry, "id" | "createdAt" | "updatedAt">;
