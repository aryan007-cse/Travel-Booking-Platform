import {
  Plane,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const TwitterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Flights", path: "/flights" },
  { name: "Hotels", path: "/hotels" },
  { name: "My Bookings", path: "/my-bookings" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Login", path: "/login" },
];

const services = [
  "Flight Booking",
  "Hotel Booking",
  "Holiday Packages",
  "Travel Insurance",
  "Refund Management",
];

const socials = [
  { icon: TwitterIcon, href: "#" },
  { icon: InstagramIcon, href: "#" },
  { icon: LinkedinIcon, href: "#" },
  { icon: YoutubeIcon, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">

      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Plane size={20} />
              </div>

              <h2 className="text-2xl font-extrabold">
                Travel
                <span className="text-blue-400">Go</span>
              </h2>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              TravelGo helps you book flights, hotels and
              unforgettable vacations at the best prices with
              secure and reliable service.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition hover:bg-blue-600 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Services
            </h3>

            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm text-slate-400"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-300">
              Contact Us
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-blue-400"
                />
                Pune, Maharashtra, India
              </li>

              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone
                  size={16}
                  className="shrink-0 text-blue-400"
                />
                +91 9876543210
              </li>

              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail
                  size={16}
                  className="shrink-0 text-blue-400"
                />
                support@travelgo.com
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="mb-2 text-sm text-slate-400">
                Subscribe for travel deals
              </p>

              <div className="flex overflow-hidden rounded-xl border border-slate-700">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-slate-800 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <button className="bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-8 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} TravelGo. All Rights Reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Cookies
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}