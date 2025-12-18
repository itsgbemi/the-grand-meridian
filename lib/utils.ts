export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculateTotal(amount: number, taxRate: number = 0.12): number {
  return amount + (amount * taxRate)
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'available':
    case 'confirmed':
    case 'paid':
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'occupied':
    case 'checked_in':
      return 'bg-blue-100 text-blue-800'
    case 'maintenance':
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'cleaning':
      return 'bg-purple-100 text-purple-800'
    case 'cancelled':
    case 'inactive':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
