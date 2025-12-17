import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, BLOG_POSTS } from '../constants';
import { Profile, SkillCategory, ExperienceItem, ProjectItem, BlogPost } from '../types';

// Use environment variable if available, otherwise default to empty string (Static Mode)
// This prevents the app from trying to hit localhost:8000 by default and causing connection errors
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '';

/**
 * Helper to fetch data from API, falling back to static constants if API fails.
 */
async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  // If no API URL is configured, return static data immediately without attempting network request
  if (!API_BASE_URL) {
    return fallbackData;
  }

  try {
    // Abort controller to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const json = await response.json();
    // Laravel API resources usually wrap data in a 'data' property
    return json.data || json;
  } catch (error) {
    // Only warn if we actually attempted a fetch
    if (API_BASE_URL) {
      console.warn(`[API] Failed to fetch ${endpoint}. Using fallback data.`);
    }
    return fallbackData;
  }
}

export const api = {
  getProfile: () => fetchWithFallback<Profile>('profile', PROFILE),
  getSkills: () => fetchWithFallback<SkillCategory[]>('skills', SKILLS),
  getExperience: () => fetchWithFallback<ExperienceItem[]>('experience', EXPERIENCE),
  getProjects: () => fetchWithFallback<ProjectItem[]>('projects', PROJECTS),
  getBlogPosts: () => fetchWithFallback<BlogPost[]>('posts', BLOG_POSTS),
  
  submitContact: async (data: any) => {
    // Mock success if no API is configured (Static Mode)
    if (!API_BASE_URL) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, message: 'Message sent successfully (Static Mode)' };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    } catch (error) {
      // Re-throw to let the component handle the error state, but don't log red error here
      throw error;
    }
  }
};