'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Hotel, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
const router = useRouter()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

const handleLogin = async (e: React.FormEvent) => {
e.preventDefault()
setLoading(true)
setError('')

try {
const { data, error } = await supabase.auth.signInWithPassword({
email,
password,
})

if (error) {
if (error.message === 'Invalid login credentials') {
setError('Invalid email or password. Please try again.')
} else {
setError(error.message)
}
return
}

if (data.user) {
router.push('/dashboard')
}
} catch (err) {
setError('An unexpected error occurred')
} finally {
setLoading(false)
}
}

return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
<div className="max-w-md w-full mx-4">
<div className="bg-white rounded-2xl shadow-xl p-8">
<div className="text-center mb-8">
<div className="flex justify-center mb-4">
<div className="bg-primary-100 p-3 rounded-xl">
<Hotel className="h-12 w-12 text-primary-600" />
</div>
</div>
<h1 className="text-3xl font-bold text-gray-900 mb-2">The Grand Meridian</h1>
<p className="text-gray-600">Hotel Management System</p>
</div>

<form onSubmit={handleLogin} className="space-y-6">
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Email Address
</label>
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<Mail className="h-5 w-5 text-gray-400" />
</div>
<input
type="email"
required
value={email}
onChange={(e) => setEmail(e.target.value)}
className="input-field pl-10"
placeholder="staff@grandmeridian.com"
/>
</div>
</div>

<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Password
</label>
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<Lock className="h-5 w-5 text-gray-400" />
</div>
<input
type="password"
required
value={password}
onChange={(e) => setPassword(e.target.value)}
className="input-field pl-10"
placeholder="Enter your password"
/>
</div>
</div>

{error && (
<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
{error}
</div>
)}

<button
type="submit"
disabled={loading}
className="w-full btn-primary py-3 text-lg font-semibold"
>
{loading ? 'Signing in...' : 'Sign In'}
</button>

<div className="text-center text-sm text-gray-600 pt-4 border-t">
<p>Default credentials for demo:</p>
<p className="font-mono text-xs mt-1">owner@grandmeridian.com / password123</p>
</div>
</form>
</div>
</div>
</div>
)
}
