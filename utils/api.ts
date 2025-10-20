export const API_URL = "http://192.168.18.202:8001/api";

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const url = `${API_URL}${endpoint}`;
    // attach token if available so authenticated endpoints work without extra boilerplate
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });

    console.log("API Request:", { url, options });
    console.log("Response status:", res.status, "url:", res.url);

    const contentType = res.headers.get('content-type')?.toLowerCase() || "";
    console.log("Response Headers:", contentType);

    if (!contentType.includes('application/json')) {
      const text = await res.text().catch(() => null);
      if (!res.ok) {
        return { ok: false, error: text || `HTTP ${res.status}`, status: res.status, data: null };
      }
      return { ok: true, data: text };
    }

    let data: any = null;
    try {
      data = await res.json();
    } catch (jsonError) {
      if (res.ok) {
        return { ok: true, data: null };
      }
      const text = await res.text().catch(() => null);
      return { ok: false, error: text || 'Invalid JSON response', status: res.status };
    }

    return { ok: res.ok, data };

  } catch (err) {
    console.error("API Fetch Error:", err);
    const errorMessage = (err && (err as any).message) ? (err as any).message : 'An unknown error occurred.';
    return { ok: false, error: errorMessage };
  }
}