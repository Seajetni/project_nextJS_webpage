"use client";

import Image from "next/image";
import { useState } from "react";
import ReservationModal from "./ReservationModel";
import { BedDouble, Wind } from "lucide-react";

const Room = ({ room, fetchRooms }) => {

  const img =
    "https://hotel-booking-arnob.netlify.app/assets/1-583b7c9f.png";

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (room.status !== "available") return null;

  const handleRoomClick = () => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">

        {/* IMAGE */}
        <div className="relative h-[220px] w-full overflow-hidden">

          <img
            src={img}
            alt="room"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* PRICE BADGE */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow">
            {room.price} ฿
          </div>

        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* ROOM TITLE */}
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">

            <BedDouble className="w-5 h-5 text-gray-500" />

            Room {room.room_number}

          </h2>

          {/* ROOM INFO */}
          <div className="flex items-center justify-between mb-5 text-sm text-gray-600">

            <div className="flex items-center gap-2">

              {room.type_name === "Air" ? (
                <Wind className="w-4 h-4 text-blue-500" />
              ) : (
                <Wind className="w-4 h-4 text-gray-400" />
              )}

              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
                {room.type_name}
              </span>

            </div>

            <span className="text-xs text-green-600 font-medium">
              Available
            </span>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleRoomClick}
            className="w-full py-2.5 rounded-xl bg-black text-white font-medium hover:bg-gray-900 transition"
          >
            Reserve Room
          </button>

        </div>

      </div>

      {selectedRoom && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          roomId={room.room_id}
          roomNumber={room.room_number}
          refreshRooms={fetchRooms}
        />
      )}
    </>
  );
};

export default Room;