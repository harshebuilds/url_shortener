import { useState, useCallback } from "react";
import { apiFetch } from "../api/client";

export const useLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch("/api/my-urls");
      if (!res.ok) throw new Error("Failed to fetch links");
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createLink = useCallback(async (originalUrl, customSlug) => {
    const res = await apiFetch("/api/shorten", {
      method: "POST",
      body: JSON.stringify({ originalUrl, customSlug }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to shorten");
    setLinks((prev) => [data.url, ...prev]);
    return data;
  }, []);

  return { links, loading, error, fetchLinks, createLink };
};
