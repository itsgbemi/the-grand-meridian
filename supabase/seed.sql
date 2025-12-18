-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create roles enum
CREATE TYPE user_role AS ENUM ('owner', 'manager', 'receptionist', 'housekeeping', 'maintenance');

-- Create room types enum
CREATE TYPE room_type AS ENUM ('standard', 'deluxe', 'suite', 'executive', 'presidential');
CREATE TYPE room_status AS ENUM ('available', 'occupied', 'maintenance', 'cleaning', 'reserved');

-- Create users table (staff)
CREATE TABLE users (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
phone VARCHAR(20),
role user_role NOT NULL DEFAULT 'receptionist',
department VARCHAR(100),
hire_date DATE DEFAULT CURRENT_DATE,
is_active BOOLEAN DEFAULT true,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

-- Create rooms table
CREATE TABLE rooms (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
room_number VARCHAR(10) UNIQUE NOT NULL,
room_type room_type NOT NULL,
floor INTEGER NOT NULL,
price_per_night DECIMAL(10,2) NOT NULL,
capacity INTEGER NOT NULL,
status room_status DEFAULT 'available',
description TEXT,
amenities JSONB DEFAULT '[]'::jsonb,
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

-- Create guests table
CREATE TABLE guests (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
email VARCHAR(255),
phone VARCHAR(20) NOT NULL,
address TEXT,
identification_type VARCHAR(50),
identification_number VARCHAR(100),
nationality VARCHAR(100),
created_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
room_id UUID REFERENCES rooms(id) ON DELETE RESTRICT,
guest_id UUID REFERENCES guests(id) ON DELETE RESTRICT,
check_in DATE NOT NULL,
check_out DATE NOT NULL,
total_amount DECIMAL(10,2) NOT NULL,
status VARCHAR(50) DEFAULT 'confirmed',
payment_status VARCHAR(50) DEFAULT 'pending',
special_requests TEXT,
created_by UUID REFERENCES users(id),
created_at TIMESTAMP DEFAULT NOW(),
updated_at TIMESTAMP DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
booking_id UUID REFERENCES bookings(id),
amount DECIMAL(10,2) NOT NULL,
transaction_type VARCHAR(50) NOT NULL,
payment_method VARCHAR(50),
description TEXT,
created_at TIMESTAMP DEFAULT NOW()
);

-- Create auth.users linking
ALTER TABLE users ADD COLUMN auth_id UUID;

-- Insert initial owner
INSERT INTO users (email, first_name, last_name, phone, role, department, is_active) VALUES
('owner@grandmeridian.com', 'Alexander', 'Meridian', '+1234567890', 'owner', 'Management', true);

-- Insert sample staff
INSERT INTO users (email, first_name, last_name, phone, role, department, is_active) VALUES
('manager@grandmeridian.com', 'Sarah', 'Johnson', '+1234567891', 'manager', 'Management', true),
('reception@grandmeridian.com', 'Michael', 'Chen', '+1234567892', 'receptionist', 'Front Desk', true),
('housekeeping@grandmeridian.com', 'Maria', 'Garcia', '+1234567893', 'housekeeping', 'Housekeeping', true);

-- Insert rooms
INSERT INTO rooms (room_number, room_type, floor, price_per_night, capacity, status, amenities) VALUES
('101', 'standard', 1, 199.99, 2, 'available', '["WiFi", "TV", "AC", "Mini Fridge"]'),
('102', 'standard', 1, 199.99, 2, 'available', '["WiFi", "TV", "AC", "Mini Fridge"]'),
('201', 'deluxe', 2, 299.99, 3, 'available', '["WiFi", "TV", "AC", "Mini Bar", "Ocean View"]'),
('202', 'deluxe', 2, 299.99, 3, 'occupied', '["WiFi", "TV", "AC", "Mini Bar", "Ocean View"]'),
('301', 'suite', 3, 499.99, 4, 'available', '["WiFi", "TV", "AC", "Kitchen", "Living Room", "Balcony"]'),
('302', 'executive', 3, 699.99, 2, 'maintenance', '["WiFi", "TV", "AC", "Jacuzzi", "Study", "City View"]'),
('401', 'presidential', 4, 999.99, 4, 'available', '["WiFi", "TV", "AC", "Butler Service", "Private Pool", "Panoramic View"]');

-- Insert sample guests
INSERT INTO guests (first_name, last_name, email, phone, nationality) VALUES
('John', 'Smith', 'john.smith@email.com', '+1987654321', 'USA'),
('Emma', 'Wilson', 'emma.wilson@email.com', '+1987654322', 'UK'),
('David', 'Brown', 'david.brown@email.com', '+1987654323', 'Canada');

-- Insert sample bookings
INSERT INTO bookings (room_id, guest_id, check_in, check_out, total_amount, status, payment_status) VALUES
((SELECT id FROM rooms WHERE room_number = '202'), (SELECT id FROM guests WHERE email = 'john.smith@email.com'), 
CURRENT_DATE - 2, CURRENT_DATE + 2, 1199.96, 'checked_in', 'paid'),
((SELECT id FROM rooms WHERE room_number = '301'), (SELECT id FROM guests WHERE email = 'emma.wilson@email.com'), 
CURRENT_DATE + 1, CURRENT_DATE + 5, 1999.96, 'confirmed', 'deposit');

-- Create indexes
CREATE INDEX idx_bookings_room_id ON bookings(room_id);
CREATE INDEX idx_bookings_guest_id ON bookings(guest_id);
CREATE INDEX idx_bookings_dates ON bookings(check_in, check_out);
CREATE INDEX idx_rooms_status ON rooms(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = NOW();
RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
