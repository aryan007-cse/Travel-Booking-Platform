import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Plane,
} from "lucide-react";

import { registerUser } from "../services/authServices";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen bg-slate-100">

      {/* Left Side */}
      <div className="hidden w-1/2 bg-gradient-to-br from-blue-700 to-sky-500 lg:flex flex-col justify-center p-16 text-white">

        <div className="flex items-center gap-3">
          <Plane size={36} />
          <h1 className="text-4xl font-extrabold">
            TravelGo
          </h1>
        </div>

        <h2 className="mt-16 text-5xl font-bold leading-tight">
          Create Account
        </h2>

        <p className="mt-6 max-w-md text-lg text-blue-100">
          Join thousands of travellers booking flights and
          hotels with confidence.
        </p>

      </div>

      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-slate-900">
            Register
          </h2>

          <p className="mt-2 text-slate-500">
            Create your TravelGo account
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-xl bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Name */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 outline-none focus:border-blue-600"
                />

              </div>

            </div>

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 outline-none focus:border-blue-600"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-12 outline-none focus:border-blue-600"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm Password */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>

              <input
                type={
                  showPassword ? "text" : "password"
                }
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
              />

            </div>

            <button
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <p className="mt-8 text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-blue-600"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}