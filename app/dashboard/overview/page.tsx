import StatsCards from '@/components/dashboard/StatsCards'
import RecentBookings from '@/components/dashboard/RecentBookings'
import RoomOccupancyChart from '@/components/dashboard/RoomOccupancyChart'
import { supabase } from '@/lib/supabase'

async function getDashboardData() {
const [
{ count: totalRooms },
{ count: availableRooms },
{ count: totalBookings },
{ count: activeStaff }
] = await Promise.all([
supabase.from('rooms').select('*', { count: 'exact' }),
supabase.from('rooms').select('*', { count: 'exact' }).eq('status', 'available'),
supabase.from('bookings').select('*', { count: 'exact' }).gte('check_in', new Date().toISOString().split('T')[0]),
supabase.from('users').select('*', { count: 'exact' }).eq('is_active', true)
])

const { data: recentBookings } = await supabase
.from('bookings')
.select(`
*,
rooms (room_number),
guests (first_name, last_name)
`)
.order('created_at', { ascending: false })
.limit(5)

return {
totalRooms: totalRooms || 0,
availableRooms: availableRooms || 0,
totalBookings: totalBookings || 0,
activeStaff: activeStaff || 0,
recentBookings: recentBookings || []
}
}

export default async function OverviewPage() {
const data = await getDashboardData()

return (
<div>
<div className="mb-8">
<h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
<p className="text-gray-600">Welcome back! Here's what's happening today.</p>
</div>

<StatsCards
totalRooms={data.totalRooms}
availableRooms={data.availableRooms}
totalBookings={data.totalBookings}
activeStaff={data.activeStaff}
/>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
<div className="card">
<h2 className="text-xl font-semibold text-gray-900 mb-4">Room Occupancy</h2>
<RoomOccupancyChart />
</div>

<div className="card">
<h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Bookings</h2>
<RecentBookings bookings={data.recentBookings} />
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
<div className="card">
<h3 className="font-semibold text-gray-900 mb-2">Today's Arrivals</h3>
<p className="text-2xl font-bold text-primary-600">12</p>
</div>
<div className="card">
<h3 className="font-semibold text-gray-900 mb-2">Today's Departures</h3>
<p className="text-2xl font-bold text-primary-600">8</p>
</div>
<div className="card">
<h3 className="font-semibold text-gray-900 mb-2">Occupancy Rate</h3>
<p className="text-2xl font-bold text-primary-600">78%</p>
</div>
</div>
</div>
)
}
