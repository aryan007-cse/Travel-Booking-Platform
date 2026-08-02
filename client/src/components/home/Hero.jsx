import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PlaneTakeoff,
  Calendar,
  Users,
  Search,
  ArrowRightLeft,
  ShieldCheck,
  BadgeCheck,
  Clock3,
} from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneway");

  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departureDate: "",
    returnDate: "",
    travellers: 1,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const swapCities = () => {
    setSearchData({
      ...searchData,
      from: searchData.to,
      to: searchData.from,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!searchData.from) newErrors.from = "Required";
    if (!searchData.to) newErrors.to = "Required";
    if (!searchData.departureDate)
      newErrors.departureDate = "Required";

    if (tripType === "roundtrip" && !searchData.returnDate)
      newErrors.returnDate = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = () => {
    if (!validate()) return;

    const params = new URLSearchParams();

    params.append("from", searchData.from);
    params.append("to", searchData.to);
    params.append("date", searchData.departureDate);

    navigate(`/flights?${params.toString()}`);
  };

  const popularRoutes = [
    { from: "Mumbai", to: "Delhi" },
    { from: "Pune", to: "Goa" },
    { from: "Delhi", to: "Dubai" },
    { from: "Bangalore", to: "Chennai" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-500">

      {/* Decorative background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white blur-3xl"></div>
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-16 lg:px-8 lg:pt-24">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Find Your Perfect Flight
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            Compare flights, hotels and holiday packages from hundreds
            of providers — all in one place.
          </p>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              Secure Payments
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck size={18} />
              Best Price Guarantee
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              Instant Confirmation
            </div>
          </div>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mx-auto mt-10 max-w-6xl rounded-3xl bg-white p-6 shadow-2xl md:p-8"
        >

          {/* Trip Type Toggle */}
          <div className="mb-6 flex gap-3">
            {["oneway", "roundtrip"].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tripType === type
                    ? "bg-blue-600 text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type === "oneway" ? "One Way" : "Round Trip"}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">

            {/* From */}
            <div className="lg:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                From
              </label>

              <div className="relative">
                <PlaneTakeoff
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="text"
                  name="from"
                  value={searchData.from}
                  onChange={handleChange}
                  placeholder="City or Airport"
                  className={`h-14 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition focus:ring-2 ${
                    errors.from
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                />
              </div>

              {errors.from && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.from}
                </p>
              )}
            </div>

            {/* Swap Button */}
            <div className="hidden items-end justify-center lg:flex">
              <button
                onClick={swapCities}
                className="mb-2 rounded-full border border-slate-300 bg-white p-3 shadow transition hover:bg-slate-50"
                type="button"
              >
                <ArrowRightLeft size={18} />
              </button>
            </div>

            {/* To */}
            <div className="lg:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                To
              </label>

              <div className="relative">
                <PlaneTakeoff
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90"
                  size={18}
                />

                <input
                  type="text"
                  name="to"
                  value={searchData.to}
                  onChange={handleChange}
                  placeholder="City or Airport"
                  className={`h-14 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition focus:ring-2 ${
                    errors.to
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                />
              </div>

              {errors.to && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.to}
                </p>
              )}
            </div>

            {/* Departure */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                Departure
              </label>

              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="date"
                  name="departureDate"
                  value={searchData.departureDate}
                  onChange={handleChange}
                  className={`h-14 w-full rounded-xl border pl-10 pr-3 text-sm outline-none transition focus:ring-2 ${
                    errors.departureDate
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                />
              </div>

              {errors.departureDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.departureDate}
                </p>
              )}
            </div>

            {/* Return (roundtrip only) */}
            {tripType === "roundtrip" && (
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                  Return
                </label>

                <input
                  type="date"
                  name="returnDate"
                  value={searchData.returnDate}
                  onChange={handleChange}
                  className={`h-14 w-full rounded-xl border px-4 text-sm outline-none transition focus:ring-2 ${
                    errors.returnDate
                      ? "border-red-400 focus:ring-red-200"
                      : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
                  }`}
                />
              </div>
            )}

            {/* Travellers */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-600">
                Travellers
              </label>

              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <select
                  name="travellers"
                  value={searchData.travellers}
                  onChange={handleChange}
                  className="h-14 w-full appearance-none rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} Traveller{n > 1 && "s"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className={`flex items-end ${
              tripType === "roundtrip" ? "md:col-span-2 lg:col-span-1" : "lg:col-span-1"
            }`}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSearch}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-sm font-semibold text-white shadow-lg transition"
              >
                <Search size={18} />
                Search
              </motion.button>
            </div>

          </div>

          {/* Popular Routes */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Popular:
            </span>

            {popularRoutes.map((route, index) => (
              <button
                key={index}
                onClick={() =>
                  setSearchData({
                    ...searchData,
                    from: route.from,
                    to: route.to,
                  })
                }
                className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-600 hover:text-white"
              >
                {route.from} → {route.to}
              </button>
            ))}
          </div>

        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-6 text-center text-white"
        >
          <div>
            <p className="text-3xl font-bold">500+</p>
            <p className="mt-1 text-sm text-blue-100">Destinations</p>
          </div>

          <div>
            <p className="text-3xl font-bold">1M+</p>
            <p className="mt-1 text-sm text-blue-100">Happy Travellers</p>
          </div>

          <div>
            <p className="text-3xl font-bold">24/7</p>
            <p className="mt-1 text-sm text-blue-100">Support</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}