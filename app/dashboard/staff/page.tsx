'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Users, Mail, Phone, UserCheck, UserX, Plus } from 'lucide-react'

type StaffMember = {
id: string
first_name: string
last_name: string
email: string
phone: string
role: string
department: string
hire_date: string
is_active: boolean
}

export default function StaffPage() {
const [staff, setStaff] = useState<StaffMember[]>([])
const [loading, setLoading] = useState(true)

useEffect(() => {
fetchStaff()
}, [])

const fetchStaff = async () => {
const { data, error } = await supabase
.from('users')
.select('*')
.order('created_at', { ascending: false })

if (error) {
console.error('Error fetching staff:', error)
} else {
setStaff(data || [])
}
setLoading(false)
}

const getRoleColor = (role: string) => {
switch (role) {
case 'owner': return 'bg-purple-100 text-purple-800'
case 'manager': return 'bg-blue-100 text-blue-800'
case 'receptionist': return 'bg-green-100 text-green-800'
case 'housekeeping': return 'bg-amber-100 text-amber-800'
default: return 'bg-gray-100 text-gray-800'
}
}

const toggleStaffStatus = async (id: string, currentStatus: boolean) => {
const { error } = await supabase
.from('users')
.update({ is_active: !currentStatus })
.eq('id', id)

if (!error) {
setStaff(staff.map(member =>
member.id === id ? { ...member, is_active: !currentStatus } : member
))
}
}

return (
<div>
<div className="flex justify-between items-center mb-8">
<div>
<h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
<p className="text-gray-600">Manage hotel staff members and roles</p>
</div>
<button className="btn-primary flex items-center space-x-2">
<Plus className="h-5 w-5" />
<span>Add Staff</span>
</button>
</div>

{loading ? (
<div className="card text-center py-12">
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
<p className="mt-4 text-gray-600">Loading staff data...</p>
</div>
) : (
<div className="card overflow-hidden">
<div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200">
<thead className="bg-gray-50">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Staff Member
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Contact
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Role
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Department
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Status
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
Actions
</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
{staff.map((member) => (
<tr key={member.id} className="hover:bg-gray-50">
<td className="px-6 py-4">
<div className="flex items-center">
<div className="h-10 w-10 flex-shrink-0">
<div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
<Users className="h-5 w-5 text-primary-600" />
</div>
</div>
<div className="ml-4">
<div className="text-sm font-medium text-gray-900">
{member.first_name} {member.last_name}
</div>
<div className="text-sm text-gray-500">
Hired: {new Date(member.hire_date).toLocaleDateString()}
</div>
</div>
</div>
</td>
<td className="px-6 py-4">
<div className="text-sm text-gray-900 flex items-center space-x-1">
<Mail className="h-4 w-4 text-gray-400" />
<span>{member.email}</span>
</div>
<div className="text-sm text-gray-500 flex items-center space-x-1 mt-1">
<Phone className="h-4 w-4 text-gray-400" />
<span>{member.phone || 'N/A'}</span>
</div>
</td>
<td className="px-6 py-4">
<span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(member.role)}`}>
{member.role}
</span>
</td>
<td className="px-6 py-4 text-sm text-gray-900">
{member.department || 'N/A'}
</td>
<td className="px-6 py-4">
{member.is_active ? (
<div className="flex items-center text-green-600">
<UserCheck className="h-5 w-5 mr-1" />
<span className="text-sm">Active</span>
</div>
) : (
<div className="flex items-center text-red-600">
<UserX className="h-5 w-5 mr-1" />
<span className="text-sm">Inactive</span>
</div>
)}
</td>
<td className="px-6 py-4 text-sm font-medium space-x-2">
<button className="text-primary-600 hover:text-primary-900">
Edit
</button>
<button
onClick={() => toggleStaffStatus(member.id, member.is_active)}
className={`${member.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
>
{member.is_active ? 'Deactivate' : 'Activate'}
</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
)}
</div>
)
}
