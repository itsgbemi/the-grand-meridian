'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Bed, Search, Filter, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

type Room = {
id: string
room_number: string
room_type: string
floor: number
price_per_night: number
capacity: number
status: string
}

export default function RoomsPage() {
const [rooms, setRooms] = useState<Room[]>([])
const [loading, setLoading] = useState(true)
const [search, setSearch] = useState('')
const [filter, setFilter] = useState('all')

useEffect(() => {
fetchRooms()
}, [])

const fetchRooms = async () => {
const { data, error } = await supabase
.from('rooms')
.select('*')
.order('room_number')

if (error) {
console.error('Error fetching rooms:', error)
} else {
setRooms(data || [])
}
setLoading(false)
}

const filteredRooms = rooms.filter(room => {
const matchesSearch = room.room_number.toLowerCase().includes(search.toLowerCase()) ||
room.room_type.toLowerCase().includes(search.toLowerCase())
const matchesFilter = filter === 'all' || room.status === filter
return matchesSearch && matchesFilter
})

const getStatusColor = (status: string) => {
switch (status) {
case 'available': return 'bg-green-100 text-green-800'
case 'occupied': return 'bg-red-100 text-red-800'
case 'maintenance': return 'bg-yellow-100 text-yellow-800'
case 'cleaning': return 'bg-blue-100 text-blue-800'
default: return 'bg-gray-100 text-gray-800'
}
}

const getStatusText = (status: string) => {
return status.charAt(0).toUpperCase() + status.slice(1)
}

return (
<div>
<div className="flex justify-between items-center mb-8">
<div>
<h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
<p className="text-gray-600">Manage all hotel rooms and their status</p>
</div>
<Link
href="/dashboard/rooms/new"
className="btn-primary flex items-center space-x-2"
>
<Plus className="h-5 w-5" />
<span>Add Room</span>
</Link>
</div>

<div className="card mb-6">
<div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
<div className="flex-1 relative">
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
<input
type="text"
placeholder="Search rooms by number or type..."
className="input-field pl-10"
value={search}
onChange={(e) => setSearch(e.target.value)}
/>
</div>
<select
className="input-field"
value={filter}
onChange={(e) => setFilter(e.target.value)}
>
<option value="all">All Status</option>
<option value="available">Available</option>
<option value="occupied">Occupied</option>
<option value="maintenance">Maintenance</option>
<option value="cleaning">Cleaning</option>
</select>
</div>
</div>

{loading ? (
<div className="card text-center py-12">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
<p className="mt-4 text-gray-600">Loading rooms...</p>
</div>
) : (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{filteredRooms.map((room) => (
<div key={room.id} className="card hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div>
<div className="flex items-center space-x-2">
<Bed className="h-5 w-5 text-primary-600" />
<h3 className="text-xl font-bold text-gray-900">Room {room.room_number}</h3>
</div>
<p className="text-sm text-gray-600">Floor {room.floor}</p>
</div>
<span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
{getStatusText(room.status)}
</span>
</div>

<div className="space-y-3">
<div className="flex justify-between">
<span className="text-gray-600">Type:</span>
<span className="font-medium">{room.room_type}</span>
</div>
<div className="flex justify-between">
<span className="text-gray-600">Capacity:</span>
<span className="font-medium">{room.capacity} guests</span>
</div>
<div className="flex justify-between">
<span className="text-gray-600">Price:</span>
<span className="font-medium">${room.price_per_night}/night</span>
</div>
</div>

<div className="flex space-x-2 mt-6">
<Link
href={`/dashboard/rooms/${room.id}`}
className="flex-1 btn-secondary flex items-center justify-center space-x-2 py-2"
>
<Edit className="h-4 w-4" />
<span>Edit</span>
</Link>
<button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
<Trash2 className="h-4 w-4" />
</button>
</div>
</div>
))}
</div>
)}
</div>
)
}
