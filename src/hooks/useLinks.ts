import { useEffect, useState, useCallback } from "react";
import type { LinkEntry, LinkDraft } from "../types";
import { loadLinks, saveLinks } from "../storage";

function makeId(): string {
  return `lnk_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useLinks() {
  const [links, setLinks] = useState<LinkEntry[]>(() => loadLinks());

  // Persist to localStorage whenever the collection changes.
  useEffect(() => {
    saveLinks(links);
  }, [links]);

  const addLink = useCallback((draft: LinkDraft): LinkEntry => {
    const now = Date.now();
    const entry: LinkEntry = {
      id: makeId(),
      title: draft.title.trim(),
      url: draft.url.trim(),
      description: draft.description.trim(),
      tags: draft.tags.map((t) => t.trim()).filter(Boolean),
      createdAt: now,
      updatedAt: now,
    };
    setLinks((prev) => [entry, ...prev]);
    return entry;
  }, []);

  const updateLink = useCallback((id: string, draft: LinkDraft) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? {
              ...link,
              title: draft.title.trim(),
              url: draft.url.trim(),
              description: draft.description.trim(),
              tags: draft.tags.map((t) => t.trim()).filter(Boolean),
              updatedAt: Date.now(),
            }
          : link
      )
    );
  }, []);

  const deleteLink = useCallback((id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  }, []);

  return { links, addLink, updateLink, deleteLink };
}
