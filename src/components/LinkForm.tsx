import { useState } from "react";
import type { FormEvent } from "react";
import type { LinkDraft, LinkEntry } from "../types";

interface LinkFormProps {
  initial?: LinkEntry | null;
  onSubmit: (draft: LinkDraft) => void;
  onCancel: () => void;
}

function normaliseUrl(value: string): string {
  const v = value.trim();
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.hostname.includes(".");
  } catch {
    return false;
  }
}

export default function LinkForm({ initial, onSubmit, onCancel }: LinkFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tagsInput, setTagsInput] = useState(initial?.tags.join(", ") ?? "");
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: { title?: string; url?: string } = {};
    if (!title.trim()) next.title = "Please enter a title.";
    if (!url.trim()) next.url = "Please enter a URL.";
    else if (!isValidUrl(normaliseUrl(url))) next.url = "Enter a valid URL, e.g. https://example.com";

    setErrors(next);
    if (next.title || next.url) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({ title, url: normaliseUrl(url), description, tags });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <label className="field">
        <span className="field__label">Title *</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Figma Community"
          autoFocus
        />
        {errors.title && <span className="field__error">{errors.title}</span>}
      </label>

      <label className="field">
        <span className="field__label">URL *</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        {errors.url && <span className="field__error">{errors.url}</span>}
      </label>

      <label className="field">
        <span className="field__label">Description</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this link for?"
          rows={3}
        />
      </label>

      <label className="field">
        <span className="field__label">Tags (optional)</span>
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="design, inspiration, tools"
        />
      </label>

      <div className="form__actions">
        <button type="button" className="btn btn--outline" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          Save Link
        </button>
      </div>
    </form>
  );
}
