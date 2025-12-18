import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
public: {
Tables: {
users: {
Row: {
id: string
email: string
first_name: string
last_name: string
phone: string | null
role: string
department: string | null
hire_date: string | null
is_active: boolean
created_at: string
updated_at: string
}
}
rooms: {
Row: {
id: string
room_number: string
room_type: string
floor: number
price_per_night: number
capacity: number
status: string
description: string | null
amenities: string[]
created_at: string
updated_at: string
}
}
bookings: {
Row: {
id: string
room_id: string
guest_id: string
check_in: string
check_out: string
total_amount: number
status: string
payment_status: string
special_requests: string | null
created_by: string | null
created_at: string
updated_at: string
}
}
}
}
}
