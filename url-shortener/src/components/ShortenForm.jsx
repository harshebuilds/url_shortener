import { useState } from "react";

export default function ShortenForm({ onCreate }) {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handle = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onCreate(url, slug || undefined);
      setUrl("");
      setSlug("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: 16,
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        background: "#fff",
        marginBottom: 20,
      }}
    >
      <form
        onSubmit={handle}
        style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="https://your-long-url.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          style={{ ...input, flex: "1 1 200px" }}
        />
        <input
          type="text"
          placeholder="custom slug (optional)"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
          }
          style={{ ...input, flex: "0 0 180px" }}
        />
        <button type="submit" disabled={loading} style={btn}>
          {loading ? "Shortening…" : "Shorten"}
        </button>
      </form>
      {error && (
        <p style={{ margin: "8px 0 0", fontSize: 13, color: "#dc2626" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const input = {
  padding: "8px 10px",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};
const btn = {
  padding: "8px 18px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
};
