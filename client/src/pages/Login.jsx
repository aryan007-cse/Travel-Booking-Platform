import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Plane } from "lucide-react";
import { loginUser } from "../services/authServices";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(form);

      login(data.user, data.token);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen bg-slate-100">

      {/* Left */}
      <div className="hidden w-1/2 bg-gradient-to-br from-blue-700 to-sky-500 lg:flex flex-col justify-center p-16 text-white">

        <div className="flex items-center gap-3">
          <Plane size={36} />
          <h1 className="text-4xl font-extrabold">
            TravelGo
          </h1>
        </div>

        <h2 className="mt-16 text-5xl font-bold leading-tight">
          Welcome Back
        </h2>

        <p className="mt-6 max-w-md text-lg text-blue-100">
          Sign in to continue booking flights, hotels and
          managing your travel plans.
        </p>

      </div>

      {/* Right */}
      <div className="flex flex-1 items-center justify-center p-6">

        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

          <h2 className="text-3xl font-bold text-slate-900">
            Login
          </h2>

          <p className="mt-2 text-slate-500">
            Sign in to your account
          </p>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

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
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-4 outline-none transition focus:border-blue-600"
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
                  className="h-12 w-full rounded-xl border border-slate-300 pl-11 pr-12 outline-none transition focus:border-blue-600"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            <button
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Login"}
            </button>

          </form>

          <p className="mt-8 text-center text-sm text-slate-500">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-blue-600"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}