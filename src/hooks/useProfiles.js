import { useEffect, useState } from 'react';
import { analyzeProfile } from '../utils/scoring';
import influencersUrl from '../data/influencers.json?url';

// Loads and analyzes every profile once, up front. Every page (Search,
// Results, History) reads from this same list rather than fetching one
// profile at a time, keeps the app consistent and avoids duplicate
// scoring logic living in more than one place.
export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProfiles() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(influencersUrl);
        if (!response.ok) {
          throw new Error('Failed to load influencer data');
        }

        const data = await response.json();

        const analyzed = data.map((profile) => ({
          ...profile,
          handle: `@${profile.username}`,
          analysis: analyzeProfile(profile),
        }));

        setProfiles(analyzed);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfiles();
  }, []);

  return { profiles, loading, error };
}
