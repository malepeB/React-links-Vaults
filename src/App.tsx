import { useMemo, useState } from "react";
import type { LinkEntry, LinkDraft } from "./types";
import { useLinks } from "./hooks/useLinks";
import { useToasts } from "./hooks/useToasts";
import Modal from "./components/Modal";
import LinkForm from "./components/LinkForm";
import LinkCard from "./components/LinkCard";
import SearchBar from "./components/SearchBar";
import TagFilter from "./components/TagFilter";
import EmptyState from "./components/EmptyState";
import ToastStack from "./components/ToastStack";
import ConfirmDialog from "./components/ConfirmDialog";
import "./App.css";

type ModalState = { mode: "add" } | { mode: "edit"; entry: LinkEntry } | null;

export default function App() {
  const { links, addLink, updateLink, deleteLink } = useLinks();
  const { toasts, push, dismiss } = useToasts();

  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(null);
  const [pendingDelete, setPendingDelete] = useState<LinkEntry | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    links.forEach((l) => l.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [links]);

  const visibleLinks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return links.filter((link) => {
      if (activeTag && !link.tags.includes(activeTag)) return false;
      if (!q) return true;
      return (
        link.title.toLowerCase().includes(q) ||
        link.url.toLowerCase().includes(q) ||
        link.description.toLowerCase().includes(q) ||
        link.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [links, query, activeTag]);

  function handleAdd(draft: LinkDraft) {
    addLink(draft);
    setModal(null);
    push(`"${draft.title.trim()}" saved.`, "success");
  }

  function handleEdit(draft: LinkDraft) {
    if (modal?.mode !== "edit") return;
    updateLink(modal.entry.id, draft);
    setModal(null);
    push(`"${draft.title.trim()}" updated.`, "success");
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    deleteLink(pendingDelete.id);
    // If the deleted link held the last use of the active tag, reset the filter.
    if (activeTag && !links.some((l) => l.id !== pendingDelete.id && l.tags.includes(activeTag))) {
      setActiveTag(null);
    }
    push(`"${pendingDelete.title}" deleted.`, "info");
    setPendingDelete(null);
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1 className="topbar__brand">
          <span aria-hidden="true">🔗</span> Links Vault
        </h1>
        <button type="button" className="btn btn--primary" onClick={() => setModal({ mode: "add" })}>
          + Add Link
        </button>
      </header>

      <SearchBar value={query} onChange={setQuery} resultCount={visibleLinks.length} />
      <TagFilter tags={allTags} active={activeTag} onSelect={setActiveTag} />

      <main className="content">
        {visibleLinks.length === 0 ? (
          <EmptyState hasQuery={Boolean(query || activeTag)} onAdd={() => setModal({ mode: "add" })} />
        ) : (
          <div className="grid">
            {visibleLinks.map((entry) => (
              <LinkCard
                key={entry.id}
                entry={entry}
                onEdit={(e) => setModal({ mode: "edit", entry: e })}
                onDelete={(e) => setPendingDelete(e)}
              />
            ))}
          </div>
        )}
      </main>

      <Modal
        open={modal !== null}
        title={modal?.mode === "edit" ? "Edit Link" : "Add New Link"}
        onClose={() => setModal(null)}
      >
        <LinkForm
          initial={modal?.mode === "edit" ? modal.entry : null}
          onSubmit={modal?.mode === "edit" ? handleEdit : handleAdd}
          onCancel={() => setModal(null)}
        />
      </Modal>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this link?"
        message={pendingDelete ? `"${pendingDelete.title}" will be permanently removed.` : ""}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
