export const APP_NAME = 'The Grand Meridian Hotel Management System'
export const APP_DESCRIPTION = 'Professional hotel management system for The Grand Meridian'
export const APP_VERSION = '1.0.0'

export const USER_ROLES = {
  OWNER: 'owner',
  MANAGER: 'manager',
  RECEPTIONIST: 'receptionist',
  HOUSEKEEPING: 'housekeeping',
  MAINTENANCE: 'maintenance'
} as const

export const ROOM_TYPES = {
  STANDARD: 'standard',
  DELUXE: 'deluxe',
  SUITE: 'suite',
  EXECUTIVE: 'executive',
  PRESIDENTIAL: 'presidential'
} as const

export const ROOM_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
  CLEANING: 'cleaning',
  RESERVED: 'reserved'
} as const

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CHECKED_IN: 'checked_in',
  CHECKED_OUT: 'checked_out',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show'
} as const

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIAL: 'partial',
  REFUNDED: 'refunded',
  FAILED: 'failed'
} as const

export const TRANSACTION_TYPES = {
  BOOKING: 'booking',
  ROOM_SERVICE: 'room_service',
  RESTAURANT: 'restaurant',
  EXTRA_CHARGES: 'extra_charges',
  REFUND: 'refund'
} as const

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
  DIGITAL_WALLET: 'digital_wallet'
} as const

export const DEPARTMENTS = {
  MANAGEMENT: 'Management',
  FRONT_DESK: 'Front Desk',
  HOUSEKEEPING: 'Housekeeping',
  MAINTENANCE: 'Maintenance',
  RESTAURANT: 'Restaurant',
  SECURITY: 'Security'
} as const

export const AMENITIES = [
  'WiFi',
  'TV',
  'AC',
  'Mini Fridge',
  'Mini Bar',
  'Safe',
  'Hair Dryer',
  'Iron',
  'Coffee Maker',
  'Balcony',
  'Ocean View',
  'City View',
  'Kitchen',
  'Living Room',
  'Jacuzzi',
  'Private Pool',
  'Butler Service',
  'Room Service',
  'Laundry Service',
  'Breakfast Included'
] as const

export const DEFAULT_PAGE_SIZE = 10
export const ITEMS_PER_PAGE = [10, 25, 50, 100]

export const CURRENCY = 'USD'
export const CURRENCY_SYMBOL = '$'
export const TAX_RATE = 0.12 // 12%

export const CHECK_IN_TIME = '14:00' // 2:00 PM
export const CHECK_OUT_TIME = '11:00' // 11:00 AM

export const DEFAULT_AVATAR_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#8B5CF6'  // Violet
]

export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#10B981',
  TERTIARY: '#8B5CF6',
  WARNING: '#F59E0B',
  DANGER: '#EF4444',
  SUCCESS: '#10B981',
  INFO: '#06B6D4'
}

export const ROOM_TYPE_PRICES = {
  [ROOM_TYPES.STANDARD]: 199.99,
  [ROOM_TYPES.DELUXE]: 299.99,
  [ROOM_TYPES.SUITE]: 499.99,
  [ROOM_TYPES.EXECUTIVE]: 699.99,
  [ROOM_TYPES.PRESIDENTIAL]: 999.99
} as const

export const ROOM_TYPE_CAPACITIES = {
  [ROOM_TYPES.STANDARD]: 2,
  [ROOM_TYPES.DELUXE]: 3,
  [ROOM_TYPES.SUITE]: 4,
  [ROOM_TYPES.EXECUTIVE]: 2,
  [ROOM_TYPES.PRESIDENTIAL]: 4
} as const

export const STATUS_COLORS = {
  [ROOM_STATUS.AVAILABLE]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-200'
  },
  [ROOM_STATUS.OCCUPIED]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-200'
  },
  [ROOM_STATUS.MAINTENANCE]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-200'
  },
  [ROOM_STATUS.CLEANING]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-200'
  },
  [ROOM_STATUS.RESERVED]: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-200'
  },
  [BOOKING_STATUS.CONFIRMED]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800'
  },
  [BOOKING_STATUS.CHECKED_IN]: {
    bg: 'bg-green-100',
    text: 'text-green-800'
  },
  [BOOKING_STATUS.CHECKED_OUT]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800'
  },
  [BOOKING_STATUS.CANCELLED]: {
    bg: 'bg-red-100',
    text: 'text-red-800'
  }
} as const

export const ROLE_COLORS = {
  [USER_ROLES.OWNER]: {
    bg: 'bg-purple-100',
    text: 'text-purple-800'
  },
  [USER_ROLES.MANAGER]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800'
  },
  [USER_ROLES.RECEPTIONIST]: {
    bg: 'bg-green-100',
    text: 'text-green-800'
  },
  [USER_ROLES.HOUSEKEEPING]: {
    bg: 'bg-amber-100',
    text: 'text-amber-800'
  },
  [USER_ROLES.MAINTENANCE]: {
    bg: 'bg-orange-100',
    text: 'text-orange-800'
  }
} as const

export const NAVIGATION_ITEMS = [
  { name: 'Overview', href: '/dashboard/overview', icon: 'Home' },
  { name: 'Rooms', href: '/dashboard/rooms', icon: 'Bed' },
  { name: 'Staff', href: '/dashboard/staff', icon: 'Users' },
  { name: 'Bookings', href: '/dashboard/bookings', icon: 'Calendar' },
  { name: 'Guests', href: '/dashboard/guests', icon: 'User' },
  { name: 'Performance', href: '/dashboard/performance', icon: 'BarChart3' },
  { name: 'Profile', href: '/dashboard/profile', icon: 'UserCircle' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'Settings' }
] as const

export const HOTEL_CONTACT = {
  NAME: 'The Grand Meridian',
  ADDRESS: '123 Luxury Avenue, Portland, OR 97201',
  PHONE: '+1 (503) 555-0123',
  EMAIL: 'info@grandmeridian.com',
  WEBSITE: 'https://grandmeridian.com'
} as const

export const TIMEZONE = 'America/Los_Angeles'
export const DATE_FORMAT = 'MMM dd, yyyy'
export const TIME_FORMAT = 'hh:mm a'
export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif']

export const PASSWORD_POLICY = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
} as const

export const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes in milliseconds

export const NOTIFICATION_TYPES = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  CHECK_IN_REMINDER: 'check_in_reminder',
  CHECK_OUT_REMINDER: 'check_out_reminder',
  ROOM_READY: 'room_ready',
  MAINTENANCE_REQUEST: 'maintenance_request',
  STAFF_ASSIGNMENT: 'staff_assignment'
} as const

export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  BOOKING_CONFIRMATION: 'booking_confirmation',
  INVOICE: 'invoice',
  PASSWORD_RESET: 'password_reset',
  STAFF_WELCOME: 'staff_welcome'
} as const
