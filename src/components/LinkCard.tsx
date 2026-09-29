import type { LinkEntry } from "../types";

interface LinkCardProps {
  entry: LinkEntry;
  onEdit: (entry: LinkEntry) => void;
  onDelete: (entry: LinkEntry) => void;
}

const AVATAR_COLORS = ["#7C6CF0", "#14B8A6", "#F59E0B", "#EC4899", "#3B82F6", "#22C55E", "#EF4444", "#0EA5E9"];

function avatarColor(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) hash = (hash * 31 + title.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

export default function LinkCard({ entry, onEdit, onDelete }: LinkCardProps) {
  return (
    <article className="card">
      <div className="card__head">
        <span className="avatar" style={{ background: avatarColor(entry.title) }} aria-hidden="true">
          {entry.title.charAt(0).toUpperCase()}
        </span>
        <div className="card__id">
          <h3 className="card__title">{entry.title}</h3>
          <a className="card__url" href={entry.url} target="_blank" rel="noreferrer noopener" title={entry.url}>
            {displayUrl(entry.url)}
          </a>
        </div>
      </div>

      {entry.description && <p className="card__desc">{entry.description}</p>}

      {entry.tags.length > 0 && (
        <ul className="card__tags">
          {entry.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="card__actions">
        <button type="button" className="text-btn text-btn--edit" onClick={() => onEdit(entry)} aria-label={`Edit ${entry.title}`}>
          Edit
        </button>
        <button type="button" className="text-btn text-btn--delete" onClick={() => onDelete(entry)} aria-label={`Delete ${entry.title}`}>
          Delete
        </button>
      </div>
    </article>
  );
}
