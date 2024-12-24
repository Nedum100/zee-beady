export const routes = {
  auth: {
    login: '/login',
    signup: '/signup',
  },
  public: ['/', '/about', '/contact', '/login', '/signup'],
  protected: [
    '/dashboard', 
    '/profile', 
    '/admin', 
    '/cart', 
    '/admin/products', 
    '/products',
    '/api/products',  // Add API routes if they need protection
    '/api/products/:id'  // Add dynamic API routes
  ],
  static: ['/_next', '/static', '/favicon.ico', '/assets', '/BeadAssets'],
  admin: [
    '/admin', 
    '/admin/products',
    '/api/products',  // Add API routes for admin access
    '/api/products/:id'  // Add dynamic API routes
  ],
  home: '/dashboard',
  api: {  // Add API routes configuration
    products: {
      base: '/api/products',
      byId: (id: string) => `/api/products/${id}`
    }
  }
} as const;

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';

export const VALID_CATEGORIES = [
  'waist-beads',
  'bracelets',
  'necklaces',
  'anklets',
  'bags'
] as const;

export type Category = typeof VALID_CATEGORIES[number];
