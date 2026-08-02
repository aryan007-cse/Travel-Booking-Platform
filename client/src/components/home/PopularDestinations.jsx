import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Goa",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    price: "4,999",
    desc: "Beaches • Nightlife • Resorts",
  },
  {
    id: 2,
    name: "Dubai",
    location: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    price: "18,999",
    desc: "Luxury • Desert • Shopping",
  },
  {
    id: 3,
    name: "Bali",
    location: "Indonesia",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=80",
    price: "22,499",
    desc: "Nature • Temples • Beaches",
  },
  {
    id: 4,
    name: "Manali",
    location: "India",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    price: "6,499",
    desc: "Mountains • Snow • Adventure",
  },
];

export default function PopularDestinations() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Top Destinations
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Explore Popular Places
            </h2>

            <p className="mt-3 max-w-xl text-slate-500">
              Discover breathtaking destinations loved by millions of
              travelers worldwide.
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

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {destinations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/flights?to=${item.name}`)}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-blue-600 shadow">
                  From ₹{item.price}
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin size={14} />
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    {item.location}
                  </span>

                  <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Explore
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

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={() => navigate("/flights")}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
          >
            View All Destinations
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}