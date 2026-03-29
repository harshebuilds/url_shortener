import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLinks } from "../hooks/useLinks";
import ShortenForm from "../components/ShortenForm";
import StatsBar from "../components/StatsBar";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { links, loading, error, fetchLinks, createLink, deleteLink } =
    useLinks();

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 500 }}>My links</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 13,
          }}
        >
          <span style={{ color: "#6b7280" }}>{user?.email}</span>
          <button
            onClick={logout}
            style={{
              fontSize: 13,
              color: "#dc2626",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <StatsBar totalLinks={links.length} totalClicks={totalClicks} />
      <ShortenForm onCreate={createLink} />

      {loading && <Skeleton />}
      {error && <ErrorBanner message={error} onRetry={fetchLinks} />}
      {!loading && !error && <LinkTable links={links} onDelete={deleteLink} />}
    </div>
  );
}

const Skeleton = () => (
  <div
    style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}
  >
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        style={{
          height: 56,
          borderRadius: 8,
          background: "#f3f4f6",
          animation: "pulse 1.5s infinite",
        }}
      />
    ))}
  </div>
);

const ErrorBanner = ({ message, onRetry }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 16px",
      background: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: 8,
      color: "#dc2626",
      fontSize: 13,
      marginTop: 16,
    }}
  >
    <span>{message}</span>
    <button
      onClick={onRetry}
      style={{
        background: "none",
        border: "none",
        color: "#dc2626",
        cursor: "pointer",
        textDecoration: "underline",
        fontSize: 13,
      }}
    >
      Retry
    </button>
  </div>
);
