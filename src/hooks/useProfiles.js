import { useState, useCallback } from 'react';
import influencersData from '../data/influencers.json';

/**
 * Custom hook for fetching and caching influencer profile data
 * Uses local JSON data
*/

function useProfiles() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const calculateTrustLevel = (score) => {
    if (score >= 90) return 'High Authenticity';
    if (score >= 70) return 'Authentic';
    if (score >= 40) return 'Uncertain';
    return 'Low Trust';
  };

  const calculateAuthenticityScore = (data) => {
    let score = 0;
    
    if (data.followers30DaysAgo && data.followers) {
      const growthRate = (data.followers - data.followers30DaysAgo) / data.followers30DaysAgo;
      if (growthRate >= 0.01 && growthRate <= 0.10) {
        score += 25; 
      } else if (growthRate > 0.10 && growthRate <= 0.20) {
        score=score + 15; 
      } else if (growthRate > 0.20) {
        score += 5; // Very high growth, likely bots
      } else if (growthRate >= -0.05 && growthRate < 0.01) {
        score += 10; // Stable account
      }
    }
    
    if (data.averageLikes && data.followers) {
      const engagementRate = (data.averageLikes / data.followers) * 100;
      if (engagementRate >= 2.0 && engagementRate <= 8.0) {
        score += 25; 
      } else if (engagementRate >= 1.0 && engagementRate < 2.0) {
        score += 15; 
      } else if (engagementRate > 8.0 && engagementRate <= 15.0) {
        score += 10; 
      }
    }
    
    if (data.following && data.followers) {
      const ratio = data.following / data.followers;
      if (ratio < 0.1) {
        score += 15; // True influencer
      } else if (ratio >= 0.1 && ratio < 0.3) {
        score += 12; // Normal
      } else if (ratio >= 0.3 && ratio < 0.6) {
        score += 8; // Slightly suspicious
      }
    }
    
    if (data.accountAgeMonths) {
      if (data.accountAgeMonths > 24) {
        score += 10; 
      } else if (data.accountAgeMonths >= 12 && data.accountAgeMonths <= 24) {
        score += 7; 
      } else {
        score += 3; 
      }
    }
    
    if (data.postsLast30Days) {
      if (data.postsLast30Days >= 15 && data.postsLast30Days <= 30) {
        score += 10; // Consistent posting
      } else if (data.postsLast30Days >= 8 && data.postsLast30Days < 15) {
        score += 6; 
      } else {
        score += 2; 
      }
    }
    
    if (data.followers90DaysAgo && data.followers) {
      const growth90 = (data.followers - data.followers90DaysAgo) / data.followers90DaysAgo;
      if (growth90 >= 0.03 && growth90 <= 0.30) {
        score += 10; 
      } else if (growth90 > 0.30 && growth90 <= 0.50) {
        score += 5; 
      }
    }
    
    return Math.min(score, 100);
  };

  const fetchProfile = useCallback(
    async (handle, platform, options = {}) => {
      
      // Platform is required for finding the profile
      if (!platform) {
        throw new Error('A Social platform is required  ie facebook)');
      }

      // Remove @ if user included it (clean handle)
      const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;
      
      // Create unique cache key
      const cacheKey = `${cleanHandle}_${platform}`;

      
      // If profile is cached and force refresh is false, return cached version
      if (!options.forceRefresh && cache[cacheKey]) {
        setProfile(cache[cacheKey]);
        return cache[cacheKey];
      }
      
      setLoading(true); 
      setError(null);   

      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const profileData = influencersData.find(
          item => item.username.toLowerCase() === cleanHandle.toLowerCase() && 
                 item.platform.toLowerCase() === platform.toLowerCase()
        );

        if (!profileData) {
          throw new Error(`Account '${handle}' not found on ${platform}`);
        }
        
        const score = calculateAuthenticityScore(profileData);
        const trustLevel = calculateTrustLevel(score);
        const metrics = {
    
          postingConsistency: Math.min(100, (profileData.postsLast30Days || 0) / 30 * 100),
          engagementQuality: Math.min(100, ((profileData.averageLikes || 0) / (profileData.followers || 1)) * 1000),
          followerAnalysis: Math.min(100, (profileData.followers || 0) / 1000),
          contentOriginality: 85,
        };
        
        const normalizedData = {
          handle: profileData.username,
          platform: profileData.platform,
          
          authenticityScore: Math.round(score),
          trustLevel: trustLevel,
          isVerified: false, 
          metrics: metrics,
          
          // stats
          followers: profileData.followers || 0,
          following: profileData.following || 0,
          posts: profileData.postsLast30Days || 0,
          
          // Engagement rate calculation
          engagementRate: profileData.averageLikes && profileData.followers 
            ? Math.round((profileData.averageLikes / profileData.followers) * 100 * 100) / 100  : 0,
           
          // Metadata
          bio: `${profileData.username} - ${profileData.platform} influencer`,
          profileImage: `https://i.pravatar.cc/150?img=${profileData.id || 1}`,
          timestamp: new Date().toISOString(),
          rawData: profileData,
        };
        
        // Save to cache for future use
        setCache((prev) => ({ ...prev, [cacheKey]: normalizedData }));
        setProfile(normalizedData);
        setLoading(false);
        return normalizedData;

      } catch (err) {
        setError(err.message);
        setLoading(false);
        throw err; 
      }
    },
    [cache] 
  );

  const clearProfile = useCallback(() => {
    setProfile(null);
    setError(null);
  }, []); 

  const clearCache = useCallback(() => {
    setCache({});
    setProfile(null);
  }, []); // No dependencies - never changes

  const removeFromCache = useCallback((handle, platform) => {
    if (!platform) {
      console.warn('Platform is required to remove from cache');
      return;
    }
    
    const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;
    const cacheKey = `${cleanHandle}_${platform}`;

    setCache((prev) => {
      const newCache = { ...prev };
      delete newCache[cacheKey];
      return newCache;
    });
  }, []); 

// returns an object 
  return {  
    profile,     
    loading,     
    error,       

    fetchProfile,    
    clearProfile,   
    clearCache,      
    removeFromCache, 
  };
}
export { useProfiles };