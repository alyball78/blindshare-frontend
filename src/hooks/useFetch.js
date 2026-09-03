import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export function useFetch() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { logout } = useContext(AuthContext);

  async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_URL + url, {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token && { Authorization: `Bearer ${token}` }),

        ...options.headers,
      },
    });

    if (res.status === 204) {
      return;
    }

    const data = await res.json();

    if (res.status === 401) {
      logout();

      throw new Error(data.message || "Une erreur est survenue.");
    }

    if (res.status === 400) {
      return { validationErrors: data.errors };
    }

    if (!res.ok) {
      throw new Error(data.message || "Une erreur est survenue.");
    }

    return data;
  }

  return { apiFetch };
}
