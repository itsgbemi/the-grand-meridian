'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/ui/Sidebar'
import { Menu, Bell, User } from 'lucide-react'

export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
const [sidebarOpen, setSidebarOpen] = useState(false)
const pathname = usePathname()

return (
<div className="min-h-screen bg-gray-50">
<div className="flex">
<Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

<div className="flex-1">
<header className="bg-white border-b border-gray-200 px-6 py-4">
<div className="flex items-center justify-between">
<div className="flex items-center">
<button
onClick={() => setSidebarOpen(!sidebarOpen)}
className="lg:hidden mr-4 text-gray-500 hover:text-gray-700"
>
<Menu className="h-6 w-6" />
</button>
<div>
<h1 className="text-2xl font-bold text-gray-900">
The Grand Meridian
</h1>
<p className="text-sm text-gray-600">Hotel Management Dashboard</p>
</div>
</div>

<div className="flex items-center space-x-4">
<button className="relative p-2 text-gray-600 hover:text-gray-900">
<Bell className="h-6 w-6" />
<span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
</button>
<div className="h-8 w-px bg-gray-200"></div>
<button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
<div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
<User className="h-5 w-5 text-primary-600" />
</div>
<div className="hidden md:block text-left">
<p className="text-sm font-medium">Alexander Meridian</p>
<p className="text-xs text-gray-500">Owner</p>
</div>
</button>
</div>
</div>
</header>

<main className="p-6">
{children}
</main>
</div>
</div>
</div>
)
}
