import { useState } from "react";

const BASE = "http://localhost:3000";

export default function LinkRow({ link, onDelete }) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [err, setErr] = useState(null);

  const shortUrl = `${BASE}/${link.shortId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this link?")) return;
    setDeleting(true);
    try {
      await onDelete(link._id);
    } catch {
      setErr("Failed");
      setDeleting(false);
    }
  };

  return (
    <div style={{ borderTop: "1px solid #f3f4f6" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr 70px 90px",
          gap: 8,
          padding: "10px 14px",
          alignItems: "center",
          fontSize: 13,
        }}
      >
        {/* Original URL */}
        <div style={{ overflow: "hidden" }}>
          <a
            href={link.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={link.originalUrl}
            style={{
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "#111827",
              textDecoration: "none",
            }}
          >
            {link.originalUrl}
          </a>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>
            {new Date(link.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Short link */}
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "monospace",
            color: "#2563eb",
            fontSize: 12,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
          }}
        >
          /{link.shortId}
        </a>

        {/* Clicks */}
        <span style={{ textAlign: "right", fontWeight: 500 }}>
          {link.clicks.toLocaleString()}
        </span>

        {/* Actions */}
        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
          <button
            onClick={handleCopy}
            style={{ ...actionBtn, ...(copied ? copiedStyle : {}) }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            style={{ ...actionBtn, color: "#dc2626", borderColor: "#fecaca" }}
          >
            {deleting ? "…" : "Del"}
          </button>
        </div>
      </div>
      {err && (
        <p
          style={{
            padding: "0 14px 8px",
            fontSize: 12,
            color: "#dc2626",
            textAlign: "right",
          }}
        >
          {err}
        </p>
      )}
    </div>
  );
}

const actionBtn = {
  padding: "3px 8px",
  fontSize: 11,
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  background: "transparent",
  cursor: "pointer",
  color: "#374151",
};
const copiedStyle = { color: "#16a34a", borderColor: "#bbf7d0" };
