import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Plane,
  Clock3,
  Calendar,
  MapPin,
  Users,
  BadgeIndianRupee,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { getFlightById } from "../services/flightServices";

export default function FlightDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlight();
  }, []);

  async function loadFlight() {
    try {
      const data = await getFlightById(id);
      setFlight(data.flight);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function formatDuration(minutes) {
    if (!minutes) return "N/A";

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs === 0) return `${mins}m`;

    return `${hrs}h ${mins}m`;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold">
        Loading Flight Details...
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-semibold text-red-600">
        Flight Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 lg:grid-cols-3"
        >

          {/* Flight Information */}

          <div className="lg:col-span-2">

            <div className="rounded-3xl bg-white p-8 shadow-xl">

              <div className="flex items-center justify-between">

                <div>

                  <h1 className="text-4xl font-bold">
                    {flight.airline}
                  </h1>

                  <p className="mt-2 text-slate-500">
                    Flight No : {flight.flightNumber}
                  </p>

                </div>

                <Plane className="h-12 w-12 text-blue-600" />

              </div>

              <hr className="my-8" />

              <div className="grid gap-8 md:grid-cols-3">

                <div>

                  <p className="text-sm text-slate-500">
                    Departure
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {flight.departureTime}
                  </h2>

                  <p className="mt-2 flex items-center gap-2">
                    <MapPin size={16} />
                    {flight.from}
                  </p>

                </div>

                <div className="text-center">

                  <Clock3
                    size={34}
                    className="mx-auto text-blue-600"
                  />

                  <p className="mt-2 font-semibold">
                    {formatDuration(flight.duration)}
                  </p>

                  <div className="mt-3 h-[2px] bg-slate-300"></div>

                  <p className="mt-3 text-sm text-green-600">
                    Non Stop
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-500">
                    Arrival
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {flight.arrivalTime}
                  </h2>

                  <p className="mt-2 flex items-center justify-end gap-2">
                    <MapPin size={16} />
                    {flight.to}
                  </p>

                </div>

              </div>

            </div>

            {/* Additional Details */}

            <div className="mt-8 rounded-3xl bg-white p-8 shadow-xl">

              <h2 className="mb-6 text-2xl font-bold">
                Flight Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                <div className="flex items-center gap-3">

                  <Calendar className="text-blue-600" />

                  <div>

                    <p className="text-slate-500">
                      Departure Date
                    </p>

                    <p className="font-semibold">
                      {new Date(
                        flight.departureDate
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Plane className="text-blue-600" />

                  <div>

                    <p className="text-slate-500">
                      Aircraft
                    </p>

                    <p className="font-semibold">
                      {flight.aircraft}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Users className="text-blue-600" />

                  <div>

                    <p className="text-slate-500">
                      Available Seats
                    </p>

                    <p className="font-semibold">
                      {flight.availableSeats}
                    </p>

                  </div>

                </div>

                <div>

                  <p className="text-slate-500">
                    Flight Status
                  </p>

                  <span className="mt-2 inline-block rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
                    {flight.status}
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Fare Summary */}

          <div>

            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-xl">

              <h2 className="mb-8 text-2xl font-bold">
                Fare Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">

                  <span>Base Fare</span>

                  <span>
                    ₹{flight.price}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Taxes</span>

                  <span>
                    ₹499
                  </span>

                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span>
                    ₹{flight.price + 499}
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  navigate(`/passenger/${flight._id}`)
                }
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
              >
                Continue

                <ArrowRight size={20} />

              </button>

            </div>

          </div>

        </motion.div>

      </div>
    </div>
  );
}