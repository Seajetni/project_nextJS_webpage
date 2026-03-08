'use client'

import { Edit2, Droplet, Zap } from 'lucide-react'

export default function RoomCard({ room, onEdit }) {

  const isAvailable = room.status === "available"

  const roomPrice =
    room.type_name === "Air" ? 4000 :
    room.type_name === "Fan" ? 3500 : 0

  const totalBill = isAvailable
    ? "-"
    : `$${(
        Number(room.water_cost || 0) +
        Number(room.electric_cost || 0) +
        roomPrice
      ).toFixed(2)}`

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            Room {room.room_number}
          </h3>

          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
              isAvailable
                ? "bg-green-300 text-green-700"
                : "bg-red-300 text-red-700"
            }`}
          >
            {isAvailable ? "available" : "booked"}
          </span>
        </div>

        <button
          onClick={() => onEdit(room)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Edit2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="space-y-3">

        <div className="border-t pt-3">
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-gray-800 font-medium">
            {room.student_name || 'No tenant'}
          </p>
        </div>

        {!isAvailable && (
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Droplet className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-blue-600 font-medium">
                  Water Bill
                </p>
              </div>

              <p className="text-lg font-semibold text-blue-700">
                ${Number(room.water_cost || 0).toFixed(2)}
              </p>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-amber-600" />
                <p className="text-xs text-amber-600 font-medium">
                  Electricity Bill
                </p>
              </div>

              <p className="text-lg font-semibold text-amber-700">
                ${Number(room.electric_cost || 0).toFixed(2)}
              </p>
            </div>

          </div>
        )}

        <div className="border-t pt-3">
          <p className="text-sm text-gray-500">Total Utilities</p>
          <p className="text-xl font-bold text-gray-800">
            {totalBill}
          </p>
        </div>

      </div>
    </div>
  )
}