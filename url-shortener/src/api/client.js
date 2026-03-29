export const apiFetch = (path, options = {}) => {
  const token = localStorage.getItem("token");
  return fetch(`http://localhost:3000${path}`, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
};
