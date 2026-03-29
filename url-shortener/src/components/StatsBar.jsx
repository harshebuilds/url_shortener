export default function StatsBar({ totalLinks, totalClicks }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 20,
      }}
    >
      {[
        { label: "Total links", value: totalLinks },
        { label: "Total clicks", value: totalClicks.toLocaleString() },
      ].map(({ label, value }) => (
        <div
          key={label}
          style={{
            padding: "14px 16px",
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            background: "#fff",
          }}
        >
          <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{label}</p>
          <p style={{ fontSize: 28, fontWeight: 500, margin: "4px 0 0" }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
