import { Bed, Users, Calendar, Key } from 'lucide-react'

interface StatsCardsProps {
totalRooms: number
availableRooms: number
totalBookings: number
activeStaff: number
}

export default function StatsCards({
totalRooms,
availableRooms,
totalBookings,
activeStaff
}: StatsCardsProps) {
const stats = [
{
title: 'Total Rooms',
value: totalRooms,
icon: Bed,
color: 'bg-blue-500',
change: '+2 this month'
},
{
title: 'Available Rooms',
value: availableRooms,
icon: Key,
color: 'bg-green-500',
change: `${Math.round((availableRooms / totalRooms) * 100)}% available`
},
{
title: 'Active Bookings',
value: totalBookings,
icon: Calendar,
color: 'bg-purple-500',
change: '+5 this week'
},
{
title: 'Staff Active',
value: activeStaff,
icon: Users,
color: 'bg-amber-500',
change: 'All present'
}
]

return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{stats.map((stat) => (
<div key={stat.title} className="card">
<div className="flex items-center justify-between">
<div>
<p className="text-sm font-medium text-gray-600">{stat.title}</p>
<p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
<p className="text-xs text-gray-500 mt-1">{stat.change}</p>
</div>
<div className={`${stat.color} p-3 rounded-xl`}>
<stat.icon className="h-6 w-6 text-white" />
</div>
</div>
</div>
))}
</div>
)
}
