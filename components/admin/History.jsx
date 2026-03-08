"use client";

import React, { useState, useMemo } from "react";

export const History = ({ payments }) => {

  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [page, setPage] = useState(1);

  const perPage = 20;

  // filter
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {

      const matchSearch =
        p.room_number?.toLowerCase().includes(search.toLowerCase());

      const matchMonth =
        monthFilter === "all" || String(p.month) === monthFilter;

      const matchYear =
        yearFilter === "all" || String(p.year) === yearFilter;

      return matchSearch && matchMonth && matchYear;

    });
  }, [payments, search, monthFilter, yearFilter]);

  // pagination
  const totalPages = Math.ceil(filteredPayments.length / perPage);

  const paginated = filteredPayments.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">

        <h2 className="text-xl font-bold">
          Payment History
        </h2>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search room..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-lg text-sm"
        />

      </div>


      {/* FILTER */}
      <div className="flex gap-3 mb-6">

        <select
          value={monthFilter}
          onChange={(e) => {
            setMonthFilter(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-lg text-sm"
        >
          <option value="all">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <select
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 rounded-lg text-sm"
        >
          <option value="all">All Years</option>
          {[...new Set(payments.map(p => p.year))].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

      </div>


      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="border-b bg-gray-50">

            <tr>
              <th className="text-left p-3">Room</th>
              <th className="text-left p-3">Month</th>
              <th className="text-left p-3">Year</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
            </tr>

          </thead>

          <tbody>

            {paginated.map((pay) => (

              <tr
                key={pay.payment_id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3 font-medium">
                  {pay.room_number}
                </td>

                <td className="p-3">
                  {pay.month}
                </td>

                <td className="p-3">
                  {pay.year}
                </td>

                <td className="p-3 font-semibold">
                  {pay.amount} ฿
                </td>

                <td className="p-3">

                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      pay.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {pay.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">
          Page {page} / {totalPages || 1}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
};