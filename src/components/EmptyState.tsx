interface EmptyStateProps {
  hasQuery: boolean;
  onAdd: () => void;
}

export default function EmptyState({ hasQuery, onAdd }: EmptyStateProps) {
  if (hasQuery) {
    return (
      <div className="empty">
        <p className="empty__title">No matching links</p>
        <p className="empty__body">Try a different search word or choose another tag.</p>
      </div>
    );
  }

  return (
    <div className="empty">
      <p className="empty__title">No links saved yet</p>
      <p className="empty__body">Save the sites you want to find again — articles, tools, references.</p>
      <button type="button" className="btn btn--primary" onClick={onAdd}>
        + Add Link
      </button>
    </div>
  );
}
