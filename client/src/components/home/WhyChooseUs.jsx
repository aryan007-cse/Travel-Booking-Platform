import {
  ShieldCheck,
  Wallet,
  Clock3,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Book flights and hotels safely with encrypted and secure payments.",
  },
  {
    icon: Wallet,
    title: "Best Price Guarantee",
    description:
      "We compare prices to ensure you always get the best available deal.",
  },
  {
    icon: Clock3,
    title: "Instant Confirmation",
    description:
      "Receive your booking confirmation instantly after successful payment.",
  },
  {
    icon: Headphones,
    title: "24 × 7 Support",
    description:
      "Our support team is available anytime to help with your travel needs.",
  },
];

const stats = [
  { value: "500+", label: "Destinations" },
  { value: "1M+", label: "Happy Travellers" },
  { value: "50+", label: "Awards Won" },
  { value: "98%", label: "Satisfaction" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Why Choose Us
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Travel Smarter With TravelGo
          </h2>

          <p className="mt-4 text-slate-500">
            We provide secure booking, premium travel experiences,
            affordable prices and dedicated customer support for every
            journey.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:border-blue-100 hover:bg-white hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <Icon size={22} />
                </div>

                <h3 className="mb-2 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-8 rounded-2xl bg-blue-600 p-10 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-extrabold text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-blue-100">{stat.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}