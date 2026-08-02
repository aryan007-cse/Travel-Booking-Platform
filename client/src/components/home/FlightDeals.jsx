import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Clock3, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getFlights } from "../../services/flightServices";

export default function FlightDeals() {
  const navigate = useNavigate();

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlights();
  }, []);

  async function loadFlights() {
    try {
      const res = await getFlights();
      setFlights(res.flights.slice(0, 4));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function formatDuration(minutes) {
    if (!minutes) return "-";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Today's Best Deals
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Flight Deals
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Grab the best fares before they're gone.
            </p>
          </div>

          <button
            onClick={() => navigate("/flights")}
            className="hidden items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600 md:flex"
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-white p-6 shadow-md"
              >
                <div className="mb-6 h-12 w-12 rounded-full bg-slate-200" />
                <div className="mb-3 h-5 w-2/3 rounded bg-slate-200" />
                <div className="mb-6 h-4 w-1/2 rounded bg-slate-200" />
                <div className="mb-6 h-16 rounded bg-slate-200" />
                <div className="h-10 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : flights.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center">
            <p className="text-slate-500">No flight deals available right now.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {flights.map((flight, index) => (
              <motion.div
                key={flight._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/flights/${flight._id}`)}
                className="group cursor-pointer rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl"
              >

                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Plane size={22} />
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Save 20%
                  </span>
                </div>

                {/* Airline */}
                <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
                  {flight.airline}
                </h3>

                <p className="mt-0.5 text-sm text-slate-400">
                  {flight.flightNumber}
                </p>

                {/* Route */}
                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase text-slate-400">From</p>
                    <p className="text-base font-bold text-slate-800">
                      {flight.from}
                    </p>
                    <p className="text-xs text-slate-500">
                      {flight.departureTime}
                    </p>
                  </div>

                  <ArrowRight size={18} className="text-blue-400" />

                  <div className="text-right">
                    <p className="text-xs uppercase text-slate-400">To</p>
                    <p className="text-base font-bold text-slate-800">
                      {flight.to}
                    </p>
                    <p className="text-xs text-slate-500">
                      {flight.arrivalTime}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock3 size={14} />
                  {formatDuration(flight.duration)}
                </div>

                {/* Price */}
                <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">Starting from</p>
                    <p className="text-xl font-bold text-blue-600">
                      ₹{flight.price}
                    </p>
                  </div>

                  <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Book
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>

              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={() => navigate("/flights")}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
          >
            View All Flights
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}