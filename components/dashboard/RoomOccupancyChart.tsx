'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const data = [
  { floor: '1st', occupancy: 65, rooms: 12 },
  { floor: '2nd', occupancy: 85, rooms: 10 },
  { floor: '3rd', occupancy: 75, rooms: 8 },
  { floor: '4th', occupancy: 90, rooms: 6 },
  { floor: '5th', occupancy: 70, rooms: 4 },
]

export default function RoomOccupancyChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="floor" stroke="#666" />
          <YAxis stroke="#666" label={{ value: 'Occupancy %', angle: -90, position: 'insideLeft' }} />
          <Tooltip
            formatter={(value, name) => {
              if (name === 'occupancy') return [`${value}%`, 'Occupancy Rate']
              return [value, name]
            }}
            labelFormatter={(label) => `Floor: ${label}`}
          />
          <Bar dataKey="occupancy" name="Occupancy Rate" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.occupancy > 80 ? '#1e40af' : entry.occupancy > 60 ? '#3b82f6' : '#60a5fa'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center text-sm text-gray-600 mt-4">
        <p>Overall Hotel Occupancy: <span className="font-bold text-primary-700">78%</span></p>
      </div>
    </div>
  )
}
