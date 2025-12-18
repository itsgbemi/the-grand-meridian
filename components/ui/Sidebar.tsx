'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
Home,
Bed,
Users,
Calendar,
BarChart3,
Settings,
User,
LogOut
} from 'lucide-react'

const navItems = [
{ name: 'Overview', href: '/dashboard/overview', icon: Home },
{ name: 'Rooms', href: '/dashboard/rooms', icon: Bed },
{ name: 'Staff', href: '/dashboard/staff', icon: Users },
{ name: 'Bookings', href: '/dashboard/bookings', icon: Calendar },
{ name: 'Performance', href: '/dashboard/performance', icon: BarChart3 },
{ name: 'Profile', href: '/dashboard/profile', icon: User },
{ name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
const pathname = usePathname()

return (
<>
{open && (
<div
className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
onClick={() => setOpen(false)}
/>
)}

<aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
<div className="h-full flex flex-col">
<div className="p-6 border-b border-gray-200">
<h2 className="text-xl font-bold text-primary-800">Hotel Admin</h2>
</div>

<nav className="flex-1 p-4 space-y-1">
{navItems.map((item) => {
const isActive = pathname === item.href
return (
<Link
key={item.name}
href={item.href}
className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
: 'text-gray-700 hover:bg-gray-100'
}`}
onClick={() => setOpen(false)}
>
<item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
{item.name}
</Link>
)
})}
</nav>

<div className="p-4 border-t border-gray-200">
<button className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
<LogOut className="mr-3 h-5 w-5" />
Sign Out
</button>
</div>
</div>
</aside>
</>
)
}
