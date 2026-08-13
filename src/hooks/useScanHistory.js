import { useState, useEffect, useCallback } from 'react';

function useScanHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const savedHistory = localStorage.getItem('scanHistory');
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory);
          setHistory(Array.isArray(parsed) ? parsed : []);
        }
      } catch (err) {
        console.log('Failed to parse scan history:', err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const saveHistory = useCallback((newHistory) => {
    setHistory(newHistory);
    try {
      localStorage.setItem('scanHistory', JSON.stringify(newHistory));
    } catch (err) {
      console.log('Failed to save scan history:', err);
    }
  }, []);

  const addScan = useCallback((scanData) => {
    if (!scanData.handle) {
      return null;
    }

    const newRecord = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      handle: scanData.handle,
      platform: scanData.platform || 'Influencer',
      score: Math.round(scanData.score || 0),
      trustLevel: scanData.trustLevel || 'Unknown',
      isVerified: scanData.isVerified || false,
      metrics: scanData.metrics || {},
      ...scanData,
    };
    
    saveHistory([newRecord, ...history]);
    return newRecord;
  }, [history, saveHistory]);

  const removeScan = useCallback((id) => {
    const filtered = history.filter(item => item.id !== id);
    saveHistory(filtered);
  }, [history, saveHistory]);

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  const getScan = useCallback((id) => {
    return history.find(item => item.id === id) || null;
  }, [history]);

  const getFilteredHistory = useCallback((onlyVerified = false) => {
    if (!onlyVerified) return history;
    return history.filter(item => item.isVerified);
  }, [history]);

  const getHistoryByPlatform = useCallback((platform) => {
    if (!platform) return history;
    return history.filter(item => item.platform.toLowerCase() === platform.toLowerCase());
  }, [history]);

  const searchHistory = useCallback((query) => {
    if (!query) return history;
    const lowerQuery = query.toLowerCase();
    return history.filter(item =>
      item.handle.toLowerCase().includes(lowerQuery) ||
      item.platform.toLowerCase().includes(lowerQuery)
    );
  }, [history]);

  const getHistorySummary = useCallback(() => {
    if (history.length === 0) {
      return { 
        total: 0, 
        averageScore: 0, 
        verifiedCount: 0, 
        highestScore: 0, 
        lowestScore: 0,
        totalScans: 0,
      };
    }
    
    const total = history.length;
    const verifiedCount = history.filter(item => item.isVerified).length;
    const scores = history.map(item => item.score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / total;
    
    return {
      total,
      totalScans: total,
      averageScore: Math.round(averageScore),
      verifiedCount,
      highestScore: Math.max(...scores),
      lowestScore: Math.min(...scores),
    };
  }, [history]);

  const getRecentScans = useCallback((limit = 5) => {
    return history.slice(0, limit);
  }, [history]);

  const exportHistory = useCallback(() => {
    return JSON.stringify(history, null, 2);
  }, [history]);

  const importHistory = useCallback((jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      if (Array.isArray(imported)) {
        saveHistory(imported);
        return true;
      }
      return false;
    } catch (err) {
      console.log('Failed to import history:', err);
      return false;
    }
  }, [saveHistory]);

  return {
    history,
    loading,
    addScan,
    removeScan,
    clearHistory,
    getScan,
    getFilteredHistory,
    getHistoryByPlatform,
    searchHistory,
    getHistorySummary,
    getRecentScans,
    exportHistory,
    importHistory,
  };
}

export { useScanHistory };