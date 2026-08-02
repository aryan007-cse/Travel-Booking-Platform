import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Plane,
  Clock3,
  Calendar,
  Users,
} from "lucide-react";

import { getFlights } from "../services/flightServices";

export default function Flights() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [flights, setFlights] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlights();
  }, [searchParams]);

  async function loadFlights() {
    try {
      const data = await getFlights({
        from: searchParams.get("from"),
        to: searchParams.get("to"),
        date: searchParams.get("date"),
      });

      setFlights(data.flights || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function formatDuration(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${h}h ${m}m`;
  }

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-2xl">
        Loading Flights...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 py-10">

      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-4xl font-bold">
          Available Flights
        </h1>

        {flights.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            No Flights Found
          </div>
        ) : (
          flights.map((flight) => (
            <div
              key={flight._id}
              className="mb-6 rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="flex flex-col justify-between gap-8 lg:flex-row">

                <div>
                  <Plane className="mb-3 text-blue-600" />

                  <h2 className="text-2xl font-bold">
                    {flight.airline}
                  </h2>

                  <p className="text-slate-500">
                    {flight.flightNumber}
                  </p>
                </div>

                <div className="flex gap-12">

                  <div>
                    <p className="text-sm text-gray-500">
                      From
                    </p>

                    <h3 className="text-xl font-bold">
                      {flight.from}
                    </h3>

                    <p>{flight.departureTime}</p>
                  </div>

                  <div className="text-center">
                    <Clock3 className="mx-auto" />

                    <p className="mt-2">
                      {formatDuration(flight.duration)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      To
                    </p>

                    <h3 className="text-xl font-bold">
                      {flight.to}
                    </h3>

                    <p>{flight.arrivalTime}</p>
                  </div>

                </div>

                <div className="text-right">

                  <h2 className="text-3xl font-bold text-blue-600">
                    ₹{flight.price}
                  </h2>

                  <p className="mt-2 flex items-center justify-end gap-2 text-sm">
                    <Calendar size={16} />
                    {new Date(
                      flight.departureDate
                    ).toLocaleDateString()}
                  </p>

                  <p className="mt-2 flex items-center justify-end gap-2 text-sm">
                    <Users size={16} />
                    {flight.availableSeats} Seats
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/flights/${flight._id}`)
                    }
                    className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                  >
                    Book Now
                  </button>

                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}