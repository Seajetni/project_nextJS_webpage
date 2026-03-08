import { useState } from "react";
import axios from "axios";
import { X, User, Hash, Phone, Mail } from "lucide-react";

export default function ReservationModal({
  isOpen,
  onClose,
  roomId,
  roomNumber,
  refreshRooms
}) {
 
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post("http://127.0.0.1:8000/api/booking", {

        room_id: roomId,
        student_code: formData.studentId,
        student_name: formData.name,
        phone: formData.phone,
        email: formData.email

      });

      alert("Booking success");

      refreshRooms();

      setFormData({
        studentId: "",
        name: "",
        phone: "",
        email: "",
      });

      onClose();

    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message || "Booking failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (field, value) => {

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

  };

console.log(roomId)
  return (

    <div className="fixed inset-0 flex items-center justify-center z-50">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">

        <div className="flex justify-between mb-6">

          <div>
            <h2 className="text-xl font-bold">
              Reserve Room {roomNumber}
            </h2>
            <p className="text-sm text-gray-500">
              Fill your information
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="relative">
            <Hash className="absolute left-3 top-3 text-gray-400"/>
            <input
              type="text"
              placeholder="Student ID"
              className="w-full border rounded-lg pl-10 py-3"
              value={formData.studentId}
              onChange={(e)=>handleChange("studentId",e.target.value)}
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400"/>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg pl-10 py-3"
              value={formData.name}
              onChange={(e)=>handleChange("name",e.target.value)}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400"/>
            <input
              type="text"
              placeholder="Phone"
              className="w-full border rounded-lg pl-10 py-3"
              value={formData.phone}
              onChange={(e)=>handleChange("phone",e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400"/>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg pl-10 py-3"
              value={formData.email}
              onChange={(e)=>handleChange("email",e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-teal-500 text-white py-3 rounded-lg"
            >
              {loading ? "Booking..." : "Confirm"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}