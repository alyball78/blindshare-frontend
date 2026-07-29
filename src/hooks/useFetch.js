import { useContext } from "react";
import {authContext} from "../context/AuthContext";

export async function apiFetch(endpoint, options = {}) {
  const url = `${import.meta.env.VITE_API_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erreur réseau');
  }

  if (response.status === 204) return null;

  return response.json();
}

export default useFetch;