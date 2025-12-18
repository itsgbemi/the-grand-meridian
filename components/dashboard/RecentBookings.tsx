import { Calendar, User, CreditCard } from 'lucide-react'

interface Booking {
  id: string
  check_in: string
  check_out: string
  status: string
  total_amount: number
  rooms?: { room_number: string }
  guests?: { first_name: string; last_name: string }
}

interface RecentBookingsProps {
  bookings: Booking[]
}

export default function RecentBookings({ bookings }: RecentBookingsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'checked_in': return 'bg-green-100 text-green-800'
      case 'checked_out': return 'bg-gray-100 text-gray-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{booking.guests?.first_name} {booking.guests?.last_name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {booking.rooms?.room_number || 'N/A'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm font-medium">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-1" />
                    ${booking.total_amount}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
