import LinkRow from "./LinkRow";

export default function LinkTable({ links, onDelete }) {
  if (!links.length)
    return (
      <p
        style={{
          textAlign: "center",
          padding: 48,
          color: "#9ca3af",
          fontSize: 13,
        }}
      >
        No links yet. Shorten something above.
      </p>
    );

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr 70px 90px",
          gap: 8,
          padding: "8px 14px",
          background: "#f9fafb",
          fontSize: 11,
          fontWeight: 500,
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        <span>Original URL</span>
        <span>Short link</span>
        <span style={{ textAlign: "right" }}>Clicks</span>
        <span style={{ textAlign: "right" }}>Actions</span>
      </div>
      <div>
        {links.map((link) => (
          <LinkRow key={link._id} link={link} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
