export const routes = {
  auth: {
    login: '/login',
    signup: '/signup',
  },
  public: ['/', '/about', '/contact', '/login', '/signup'],
  protected: ['/dashboard', '/profile', '/admin', '/cart', '/admin/products', '/products'],
  static: ['/_next', '/static', '/favicon.ico', '/assets', '/BeadAssets'],
  admin: ['/admin', '/admin/products'],
  home: '/dashboard',
} as const;

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
