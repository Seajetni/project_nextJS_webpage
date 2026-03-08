"use client";

import DashboardStats from "@/components/admin/DashboardStatas";
import RoomCard from "@/components/admin/Roomcard";
import EditRoomModal from "@/components/admin/EditRoomModal";
import { History } from "@/components/admin/History";

import axios from "axios";
import { useState, useEffect } from "react";
import { Building2, Search } from "lucide-react";

export default function Home() {

  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [payments, setPayments] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // LOGIN STATE
  const [isAuth, setIsAuth] = useState(false);
  const [password, setPassword] = useState("");

  // check password
  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      setIsAuth(true);
    } else {
      alert("Wrong password");
    }
  };

  // โหลดข้อมูลจาก Laravel
  useEffect(() => {

    if (!isAuth) return;

    axios
      .get("http://localhost:8000/api/admin/rooms")
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:8000/api/admin/payments")
      .then((res) => {
        setPayments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [isAuth]);

  // update room
  const handleSaveRoom = async (updatedRoom) => {
    try {

      await axios.put(
        `http://localhost:8000/api/admin/room-status/${updatedRoom.room_id}`,
        {
          status: updatedRoom.status,
        }
      );

      setRooms(
        rooms.map((room) =>
          room.room_id === updatedRoom.room_id ? updatedRoom : room
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  // filter + search
  const filteredRooms = rooms.filter((room) => {

    const matchSearch =
      room.room_number?.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === "all") return matchSearch;

    if (filterStatus === "available") {
      return room.status === "available" && matchSearch;
    }

    if (filterStatus === "occupied") {
      return room.status === "booked" && matchSearch;
    }

  });

  // LOGIN PAGE
  if (!isAuth) {
    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-xl shadow-lg w-80">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Admin Login
          </h2>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded-lg mb-4"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Login
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">

          <div className="flex items-center gap-3">

            <div className="bg-blue-600 p-3 rounded-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Room Management System
              </h1>
              <p className="text-gray-600">Admin Dashboard</p>
            </div>

          </div>

        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* STATS */}
        <DashboardStats rooms={rooms} />

        {/* FILTER */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">

          <div className="flex flex-col md:flex-row gap-4">

            {/* SEARCH */}
            <div className="flex-1 relative">

              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

            </div>

            {/* FILTER */}
            <div className="flex gap-2">

              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-lg ${
                  filterStatus === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilterStatus("available")}
                className={`px-4 py-2 rounded-lg ${
                  filterStatus === "available"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Available
              </button>

              <button
                onClick={() => setFilterStatus("occupied")}
                className={`px-4 py-2 rounded-lg ${
                  filterStatus === "occupied"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                Occupied
              </button>

            </div>

          </div>

        </div>

        {/* ROOM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filteredRooms.map((room) => (
            <RoomCard
              key={room.room_id}
              room={room}
              onEdit={setEditingRoom}
            />
          ))}

        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No rooms found
          </div>
        )}

      </main>

      {/* MODAL */}
      {editingRoom && (
        <EditRoomModal
          room={editingRoom}
          onClose={() => setEditingRoom(null)}
          onSave={handleSaveRoom}
        />
      )}

      {/* PAYMENT HISTORY */}
      <History payments={payments} />

    </div>
  );
}