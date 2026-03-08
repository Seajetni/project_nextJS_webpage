"use client";

import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function CheckBillModal({ open, onClose }) {

  const [studentId, setStudentId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {

    if (!studentId || !roomNumber) {
      setError("Please fill student ID and room number");
      return;
    }

    try {

      const res = await axios.get(
        `http://localhost:8000/api/student/${studentId}`
      );

      const student = res.data;

      if (student.room_number.toString() !== roomNumber.toString()) {

        setError("Student ID and Room Number do not match");
        setData(null);
        return;

      }

      setData(student);
      setError("");

    } catch (err) {

      setError("Student not found");
      setData(null);

    }

  };

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-2xl p-6 shadow-xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          Check Utility Bill
        </h2>


        {/* STUDENT ID */}
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />


        {/* ROOM */}
        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />


        <button
          onClick={handleCheck}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Check Bill
        </button>


        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}


        {/* RESULT */}
        {data && (

          <div className="mt-6 border-t pt-4 space-y-2">

            <p>
              <b>Room:</b> {data.room_number}
            </p>

            <p>
              <b>Electric Bill:</b> {data.electric_cost} ฿
            </p>

            <p>
              <b>Water Bill:</b> {data.water_cost} ฿
            </p>

          </div>

        )}

      </div>

    </div>

  );

}