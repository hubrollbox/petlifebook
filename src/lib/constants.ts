/**
 * Application constants
 */

// Image upload constraints
export const IMAGE_CONSTRAINTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FREE_IMAGES: 10,
  MAX_PREMIUM_IMAGES: 100,
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  COMPRESSION_QUALITY: 0.8,
  MAX_WIDTH: 1920,
  MAX_HEIGHT: 1920,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PETS_PER_PAGE: 12,
  MEMORIES_PER_PAGE: 10,
} as const;

// Routes that require authentication
export const PROTECTED_ROUTES = [
  '/criar-perfil',
  '/meus-pets',
  '/configuracoes',
] as const;

// Species options
export const SPECIES_OPTIONS = [
  'Cão',
  'Gato',
  'Pássaro',
  'Peixe',
  'Hamster',
  'Coelho',
  'Outro',
] as const;

// Plan types
export const PLAN_TYPES = {
  FREE: 'free',
  PREMIUM: 'premium',
} as const;

// Subscription status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;
