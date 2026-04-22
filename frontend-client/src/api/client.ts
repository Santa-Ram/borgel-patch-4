import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem('refresh_token');
      if (refresh) {
        try {
          const { data } = await axios.post('/api/auth/refresh/', { refresh });
          localStorage.setItem('access_token', data.access);
          err.config.headers.Authorization = `Bearer ${data.access}`;
          return API.request(err.config);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(err);
  }
);

// ── In-memory cache (30s TTL) — deduplicates identical GET calls across components ──
const cache = new Map<string, { data: unknown; ts: number }>();
const TTL = 30_000;

function cachedGet(url: string, params?: Record<string, unknown>) {
  const key = url + (params ? JSON.stringify(params) : '');
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL) {
    return Promise.resolve({ data: hit.data } as any);
  }
  return API.get(url, { params }).then((res) => {
    cache.set(key, { data: res.data, ts: Date.now() });
    return res;
  });
}

export const postsAPI = {
  list: (params?: Record<string, unknown>) => cachedGet('/posts/', params),
  detail: (slug: string) => cachedGet(`/posts/${slug}/`),
  create: (data: FormData) => API.post('/admin/posts/', data),
  update: (id: number, data: FormData) => API.patch(`/admin/posts/${id}/`, data),
  delete: (id: number) => API.delete(`/admin/posts/${id}/`),
};

export const teamAPI = {
  list: () => cachedGet('/team/'),
  detail: (id: number) => cachedGet(`/team/${id}/`),
  create: (data: FormData) => API.post('/admin/team/', data),
  update: (id: number, data: FormData) => API.patch(`/admin/team/${id}/`, data),
  delete: (id: number) => API.delete(`/admin/team/${id}/`),
};

export const expertisesAPI = {
  list: () => cachedGet('/expertises/'),
  detail: (slug: string) => cachedGet(`/expertises/${slug}/`),
  create: (data: FormData) => API.post('/admin/expertises/', data),
  update: (slug: string, data: FormData) => API.patch(`/admin/expertises/${slug}/`, data),
  delete: (slug: string) => API.delete(`/admin/expertises/${slug}/`),
};

export const contactsAPI = {
  submit: (data: Record<string, unknown>) => API.post('/contacts/', data),
  list: () => API.get('/admin/contacts/'),
  markRead: (id: number) => API.patch(`/admin/contacts/${id}/mark-read/`),
  delete: (id: number) => API.delete(`/admin/contacts/${id}/`),
};

export const reviewsAPI = {
  list: () => cachedGet('/reviews/'),
  create: (data: FormData) => API.post('/admin/reviews/', data),
  update: (id: number, data: Partial<{ is_active: boolean }>) => API.patch(`/admin/reviews/${id}/`, data),
  delete: (id: number) => API.delete(`/admin/reviews/${id}/`),
};

export const videosAPI = {
  list: () => cachedGet('/videos/'),
  create: (data: Record<string, unknown>) => API.post('/admin/videos/', data),
  update: (id: number, data: Partial<{ is_active: boolean; order: number }>) => API.patch(`/admin/videos/${id}/`, data),
  delete: (id: number) => API.delete(`/admin/videos/${id}/`),
};

export const galleryAPI = {
  sections: () => cachedGet('/gallery/sections/'),
  images: (sectionSlug: string) => cachedGet(`/gallery/images/?section__slug=${sectionSlug}`),
};

export const newsletterAPI = {
  subscribe: (email: string) => API.post('/newsletter/subscribe/', { email }),
  list: () => API.get('/admin/newsletter/'),
  delete: (id: number) => API.delete(`/admin/newsletter/${id}/`),
};

export const authAPI = {
  login: (username: string, password: string) =>
    axios.post('/api/auth/login/', { username, password }),
  refresh: (refresh: string) => axios.post('/api/auth/refresh/', { refresh }),
};

export default API;
