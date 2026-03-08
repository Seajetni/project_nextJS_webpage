"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function EditRoomModal({ room, onClose,  }) {

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (room) {
      setFormData(room);
    }
  }, [room]);

  if (!room || !formData) return null;

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // update room status
      await axios.put(
        `http://localhost:8000/api/admin/rooms/${room.room_id}/status`,
        {
          status: formData.status
        }
      );

      // update utilities bill
      await axios.put(
        `http://localhost:8000/api/admin/rooms/${room.room_id}/bill`,
        {
          water: formData.water_cost,
          electric: formData.electric_cost
        }
      );

    
      onClose();

    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">

          <h2 className="text-xl font-semibold text-gray-800">
            Edit Room {room.room_number}
          </h2>

          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-600"/>
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Room Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Number
            </label>

            <input
              type="text"
              value={formData.room_number}
              onChange={(e)=>handleChange("room_number",e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Status */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e)=>handleChange("status",e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >

              <option value="available">Available</option>
              <option value="booked">Booked</option>

            </select>

          </div>

          {/* Tenant */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              value={formData.student_name || ""}
              onChange={(e)=>handleChange("name",e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter tenant name"
            />

          </div>

          {/* Water */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Water Bill
            </label>

            <input
              type="number"
              value={formData.water_cost || 0}
              onChange={(e)=>handleChange("water_cost",Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />

          </div>

          {/* Electric */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electricity Bill
            </label>

            <input
              type="number"
              value={formData.electric_cost || 0}
              onChange={(e)=>handleChange("electric_cost",Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />

          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}