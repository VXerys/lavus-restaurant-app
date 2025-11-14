// Hot deals API client - single source of truth (MockAPI)
// This module exports typed helpers to fetch hot-deals from the provided MockAPI.

import { ImageSourcePropType } from 'react-native';

export interface HotDealItem {
  id: string;
  type: 'hero' | 'regular';
  label: string;
  title: string;
  description?: string;
  // Remote API provides image URL; keep union for backwards compatibility
  image: string | ImageSourcePropType;
  validUntil?: string;
  discount?: number;
}

const API_BASE = 'https://691162977686c0e9c20d3911.mockapi.io/api/v1';

/**
 * Fetch all hot deals from MockAPI.
 * Returns an empty array on error and logs a warning.
 */
export const fetchHotDeals = async (): Promise<HotDealItem[]> => {
  try {
    const res = await fetch(`${API_BASE}/hot-deals`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? (data as HotDealItem[]) : [];
  } catch (err) {
    console.warn('[hotDeals] fetchHotDeals failed:', err);
    return [];
  }
};

/**
 * Fetch a single hot deal by id from MockAPI.
 * Returns undefined on not-found or error.
 */
export const fetchHotDealById = async (id: string): Promise<HotDealItem | undefined> => {
  try {
    const res = await fetch(`${API_BASE}/hot-deals/${encodeURIComponent(id)}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data as HotDealItem;
  } catch (err) {
    console.warn(`[hotDeals] fetchHotDealById(${id}) failed:`, err);
    return undefined;
  }
};

export default undefined as unknown as never;
