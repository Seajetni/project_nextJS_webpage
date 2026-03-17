"use client";

import Room from "@/components/client/Room";
import CheckBillModal from "@/components/client/CheckBillModal";

import axios from "axios";
import { useState, useEffect } from "react";
import { Search, Hotel, Zap } from "lucide-react";

export default function Home() {

  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [openBill, setOpenBill] = useState(false);

  const fetchRooms = () => {

    axios
      .get("http://localhost:8000/api/admin/rooms")
      .then((res) => {

        const sortedRooms = res.data.sort(
          (a, b) => Number(a.room_number) - Number(b.room_number)
        );

        setRooms(sortedRooms);

      })
      .catch((err) => {
        console.log(err);
      });

  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.room_number.toString().includes(search)
  );

  return (

    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <div className="flex justify-center mb-4">
            <Hotel className="w-10 h-10" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Room
          </h1>

          <p className="text-gray-300 mb-8">
            Comfortable rooms with modern facilities
          </p>

          {/* SEARCH */}
          <div className="max-w-md mx-auto relative">

            <Search className="absolute left-4 top-3.5 w-5 h-5 text-white" />

            <input
              type="text"
              placeholder="Search room number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-800 text-white focus:outline-none"
            />

          </div>

          {/* CHECK BILL BUTTON */}
          <div className="flex justify-center mt-8">

            <button
              onClick={() => setOpenBill(true)}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold transition"
            >
              <Zap className="w-5 h-5" />
              Check Water / Electric Bill
            </button>

          </div>

        </div>

      </section>


      {/* ROOMS */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-14">

          <p className="uppercase text-sm tracking-[6px] text-gray-400 mb-3">
            Dormitory
          </p>

          <h2 className="text-4xl font-bold text-gray-800">
            Available Rooms
          </h2>

          <div className="w-20 h-[3px] bg-black mx-auto mt-4"></div>

        </div>


        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredRooms.map((room) => (

            <Room
              key={room.room_id}
              room={room}
              fetchRooms={fetchRooms}
            />

          ))}

        </div>


        {filteredRooms.length === 0 && (

          <div className="text-center mt-20 text-gray-500">
            <p className="text-lg">No rooms found</p>
          </div>

        )}

      </section>


      {/* BILL MODAL */}
      <CheckBillModal
        open={openBill}
        onClose={() => setOpenBill(false)}
      />

    </div>

  );

}
