import { apiFetch } from '../utils/api';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export interface HomeData {
  user: UserProfile;
  // stats?: {
  //   today_calories: number;
  //   weekly_workouts: number;
  //   goal_calories: number;
  //   progress: number;
  // };
}

export async function getHome(): Promise<{ ok: boolean; data?: HomeData; error?: string }> {
  const res = await apiFetch('/home');

  if (res.ok && res.data?.ok) {
    return { ok: true, data: res.data.data as HomeData };
  } else {
    return { ok: false, error: res.data?.message || res.error || 'Failed to fetch home data' };
  }
}
