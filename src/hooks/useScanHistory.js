import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'authchecker_scan_history';
const MAX_ENTRIES = 20;

function readHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Each history entry is intentionally lean: { username, checkedAt }.
// We don't store score/trustLevel/metrics here, those are looked up live
// from useProfiles() at render time, so history never shows a stale score
// if scoring.js ever changes.
export function useScanHistory() {
  const [history, setHistory] = useState(readHistory);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (err) {
      console.log('Failed to save scan history:', err);
    }
  }, [history]);

  const recordScan = useCallback((username) => {
    if (!username) return null;

    setHistory((prev) => {
      const withoutDupe = prev.filter((entry) => entry.username !== username);
      const newRecord = { username, checkedAt: new Date().toISOString() };
      return [newRecord, ...withoutDupe].slice(0, MAX_ENTRIES);
    });
  }, []);

  const removeScan = useCallback((username) => {
    setHistory((prev) => prev.filter((entry) => entry.username !== username));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const getRecentScans = useCallback((limit = 5) => {
    return history.slice(0, limit);
  }, [history]);

  // These two need the live profiles list (from useProfiles) since platform
  // and trust level aren't stored in history itself, only username/time are.
  const getHistoryByPlatform = useCallback((platform, profiles) => {
    if (!platform || !profiles) return history;
    return history.filter((entry) => {
      const profile = profiles.find((p) => p.username === entry.username);
      return profile && profile.platform.toLowerCase() === platform.toLowerCase();
    });
  }, [history]);

  const searchHistory = useCallback((query) => {
    if (!query) return history;
    const lowerQuery = query.toLowerCase();
    return history.filter((entry) => entry.username.toLowerCase().includes(lowerQuery));
  }, [history]);

  return {
    history,
    recordScan,
    removeScan,
    clearHistory,
    getRecentScans,
    getHistoryByPlatform,
    searchHistory,
  };
}