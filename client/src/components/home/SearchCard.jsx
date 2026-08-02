import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  CalendarDays,
  Users,
  Search,
} from "lucide-react";

export default function SearchCard() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (from.trim()) params.append("from", from);
    if (to.trim()) params.append("to", to);
    if (departure) params.append("date", departure);
    if (tripType === "roundtrip" && returnDate) {
      params.append("returnDate", returnDate);
    }

    params.append("travellers", travellers);
    params.append("tripType", tripType);

    navigate(`/flights?${params.toString()}`);
  };

  return (
    <section className="relative z-20 mx-auto -mt-28 max-w-7xl px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

        {/* Trip Type */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={() => setTripType("oneway")}
            className={`rounded-full px-6 py-2 font-semibold transition ${
              tripType === "oneway"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            One Way
          </button>

          <button
            onClick={() => setTripType("roundtrip")}
            className={`rounded-full px-6 py-2 font-semibold transition ${
              tripType === "roundtrip"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            Round Trip
          </button>
        </div>

        {/* Search Form */}
        <div className="grid gap-5 lg:grid-cols-6">

          {/* From */}
          <div className="rounded-2xl border p-4 hover:border-blue-500">
            <label className="text-sm text-slate-500">
              From
            </label>

            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Mumbai"
              className="mt-2 w-full bg-transparent text-lg font-semibold outline-none"
            />
          </div>

          {/* To */}
          <div className="rounded-2xl border p-4 hover:border-blue-500">
            <label className="text-sm text-slate-500">
              To
            </label>

            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Delhi"
              className="mt-2 w-full bg-transparent text-lg font-semibold outline-none"
            />
          </div>

          {/* Departure */}
          <div className="rounded-2xl border p-4 hover:border-blue-500">
            <label className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={16} />
              Departure
            </label>

            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="mt-2 w-full bg-transparent outline-none"
            />
          </div>

          {/* Return */}
          <div className="rounded-2xl border p-4 hover:border-blue-500">
            <label className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={16} />
              Return
            </label>

            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              disabled={tripType === "oneway"}
              className="mt-2 w-full bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-40"
            />
          </div>

          {/* Travellers */}
          <div className="rounded-2xl border p-4 hover:border-blue-500">
            <label className="flex items-center gap-2 text-sm text-slate-500">
              <Users size={16} />
              Travellers
            </label>

            <select
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="mt-2 w-full bg-transparent text-lg font-semibold outline-none"
            >
              <option value="1">1 Traveller</option>
              <option value="2">2 Travellers</option>
              <option value="3">3 Travellers</option>
              <option value="4">4 Travellers</option>
              <option value="5">5 Travellers</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-lg font-semibold text-white transition hover:scale-105 hover:shadow-xl"
            >
              <Search size={20} />
              Search
            </button>
          </div>

        </div>

        {/* Popular Searches */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-500">
            Popular Routes:
          </span>

          {[
            "Mumbai → Delhi",
            "Pune → Goa",
            "Delhi → Dubai",
            "Bangalore → Chennai",
          ].map((route) => (
            <span
              key={route}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm transition hover:bg-blue-100 hover:text-blue-600"
            >
              <Plane className="mr-2 inline h-4 w-4" />
              {route}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}