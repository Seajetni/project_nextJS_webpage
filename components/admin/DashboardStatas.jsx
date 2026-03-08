"use client";

import { Home, Users, DollarSign, CheckCircle, CloudHail } from "lucide-react";


export default function DashboardStats({ rooms }) {
    const totalRooms = rooms.length;

    const availableRooms = rooms.filter(
        (r) => r.status === "available"
    ).length;

    const occupiedRooms = rooms.filter(
        (r) => r.status === "booked"
    ).length;

    const totalRevenue = rooms.reduce(
        (sum, room) => sum + room.waterBill + room.electricityBill,
        0
    );
    const totalIncome = rooms.reduce((sum, item) => {
    return sum + Number(item.total);
    }, 0);
    const stats = [
        {
            label: "Total Rooms",
            value: totalRooms,
            icon: Home,
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
            textColor: "text-blue-700",
        },
        {
            label: "Available",
            value: availableRooms,
            icon: CheckCircle,
            color: "bg-green-500",
            bgColor: "bg-green-50",
            textColor: "text-green-700",
        },
        {
            label: "Occupied",
            value: occupiedRooms,
            icon: Users,
            color: "bg-purple-500",
            bgColor: "bg-purple-50",
            textColor: "text-purple-700",
        },
        {
            label: "Total Bills",
            value: totalIncome,
            icon: DollarSign,
            color: "bg-amber-500",
            bgColor: "bg-amber-50",
            textColor: "text-amber-700",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className={`${stat.bgColor} rounded-xl p-6 shadow-sm`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`${stat.color} p-3 rounded-lg`}>
                                <Icon className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>

                        <p className={`text-3xl font-bold ${stat.textColor}`}>
                            {stat.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}