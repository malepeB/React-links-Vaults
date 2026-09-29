interface TagFilterProps {
  tags: string[];
  active: string | null;
  onSelect: (tag: string | null) => void;
}

export default function TagFilter({ tags, active, onSelect }: TagFilterProps) {
  return (
    <select
      className="tag-select"
      value={active ?? ""}
      onChange={(e) => onSelect(e.target.value || null)}
      aria-label="Filter by tag"
    >
      <option value="">All Tags</option>
      {tags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
}
