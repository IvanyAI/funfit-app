import { useEffect, useState } from 'react';
import { getHome, HomeData } from '../services/homeService';

export function useHome() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHome() {
      setLoading(true);
      const res = await getHome();
      if (res.ok && res.data) {
        setData(res.data);
        setError(null);
      } else {
        setError(res.error || 'Failed to load home data');
      }
      setLoading(false);
    }

    fetchHome();
  }, []);

  return { data, loading, error };
}
