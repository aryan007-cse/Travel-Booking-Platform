import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getHotels } from "../../services/hotelServices";

export default function FeaturedHotels() {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHotels();
  }, []);

  async function loadHotels() {
    try {
      const res = await getHotels();
      setHotels(res.hotels.slice(0, 4));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Best Hotels
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Featured Stays
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Handpicked hotels offering comfort, luxury and unbeatable
              value for your next trip.
            </p>
          </div>

          <button
            onClick={() => navigate("/hotels")}
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
                className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <div className="h-56 w-full bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-8 w-1/3 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-12 text-center">
            <p className="text-slate-500">No hotels available right now.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/hotels/${hotel._id}`)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      hotel.image ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80"
                    }
                    alt={hotel.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow">
                    <Star size={13} className="fill-yellow-400 text-yellow-400" />
                    4.8
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-blue-600">
                    {hotel.name}
                  </h3>

                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={14} />
                    {hotel.city}, {hotel.country}
                  </p>

                  <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">Starting from</p>
                      <p className="text-xl font-bold text-blue-600">
                        ₹{hotel.price}
                        <span className="text-xs font-medium text-slate-400">
                          {" "}/ night
                        </span>
                      </p>
                    </div>

                    <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                      View
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={() => navigate("/hotels")}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
          >
            View All Hotels
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}