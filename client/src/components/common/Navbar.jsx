import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Plane,
  Hotel,
  BookOpen,
  LayoutDashboard,
  LogOut,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `transition font-medium px-3 py-2 rounded-xl text-sm ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-lg">
            <Plane size={22} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Travel<span className="text-blue-600">Go</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/flights" className={linkClass}>
            <span className="flex items-center gap-2">
              <Plane size={16} />
              Flights
            </span>
          </NavLink>

          <NavLink to="/hotels" className={linkClass}>
            <span className="flex items-center gap-2">
              <Hotel size={16} />
              Hotels
            </span>
          </NavLink>

          <NavLink to="/my-bookings" className={linkClass}>
            <span className="flex items-center gap-2">
              <BookOpen size={16} />
              My Bookings
            </span>
          </NavLink>

          {user && (
            <NavLink to="/dashboard" className={linkClass}>
              <span className="flex items-center gap-2">
                <LayoutDashboard size={16} />
                Dashboard
              </span>
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} />
                Admin
              </span>
            </NavLink>
          )}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 lg:flex">
          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-2 text-sm font-semibold text-white shadow transition hover:scale-105"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="space-y-1 p-4">
            <NavLink
              to="/flights"
              onClick={() => setMobileOpen(false)}
              className={linkClass}
            >
              Flights
            </NavLink>

            <NavLink
              to="/hotels"
              onClick={() => setMobileOpen(false)}
              className={linkClass}
            >
              Hotels
            </NavLink>

            <NavLink
              to="/my-bookings"
              onClick={() => setMobileOpen(false)}
              className={linkClass}
            >
              My Bookings
            </NavLink>

            {user && (
              <NavLink
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={linkClass}
              >
                Dashboard
              </NavLink>
            )}

            <div className="border-t border-slate-100 pt-3">
              {!user ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl border border-blue-600 py-3 text-center text-sm font-semibold text-blue-600"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="rounded-xl bg-slate-50 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}