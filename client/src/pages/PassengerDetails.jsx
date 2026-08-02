import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Plane, User, Calendar, MapPin } from "lucide-react";
import { getFlightById, bookFlight } from "../services/flightServices";

export default function PassengerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    seatNumber: "",
  });

  useEffect(() => {
    fetchFlight();
  }, []);

  const fetchFlight = async () => {
    try {
      const res = await getFlightById(id);
      setFlight(res.flight);
    } catch (err) {
      console.log(err);
      alert("Unable to load flight.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.seatNumber
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const booking = {
        flightId: id,
        passengers: [
          {
            name: formData.name,
            age: Number(formData.age),
            gender: formData.gender,
            seatNumber: formData.seatNumber,
          },
        ],
      };

      const res = await bookFlight(booking);

      navigate(`/payment/${res.booking._id}`);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message || "Booking failed."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold text-red-600">
        Flight Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto max-w-7xl px-6">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Passenger Form */}

          <div className="lg:col-span-2 rounded-2xl bg-white p-8 shadow-lg">

            <h1 className="mb-8 text-3xl font-bold">
              Passenger Details
            </h1>

            <form onSubmit={handleSubmit}>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-medium">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter passenger name"
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block font-medium">
                    Seat Number
                  </label>

                  <input
                    type="text"
                    name="seatNumber"
                    value={formData.seatNumber}
                    onChange={handleChange}
                    placeholder="A1"
                    className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
                  />
                </div>

              </div>
                            <div className="mt-8">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue to Payment
                </button>
              </div>

            </form>

          </div>

          {/* Flight Summary */}

          <div>

            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">

              <h2 className="mb-6 text-2xl font-bold">
                Flight Summary
              </h2>

              <div className="mb-6 flex items-center gap-3">

                <Plane className="text-blue-600" />

                <div>

                  <h3 className="font-bold text-lg">
                    {flight.airline}
                  </h3>

                  <p className="text-gray-500">
                    {flight.flightNumber}
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <MapPin className="text-blue-600" size={18} />

                  <div>

                    <p className="text-sm text-gray-500">
                      Route
                    </p>

                    <p className="font-semibold">
                      {flight.from} → {flight.to}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Calendar className="text-blue-600" size={18} />

                  <div>

                    <p className="text-sm text-gray-500">
                      Date
                    </p>

                    <p className="font-semibold">
                      {new Date(
                        flight.departureDate
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <User className="text-blue-600" size={18} />

                  <div>

                    <p className="text-sm text-gray-500">
                      Available Seats
                    </p>

                    <p className="font-semibold">
                      {flight.availableSeats}
                    </p>

                  </div>

                </div>

              </div>

              <hr className="my-6" />

              <div className="space-y-3">

                <div className="flex justify-between">

                  <span>Ticket Price</span>

                  <span>₹{flight.price}</span>

                </div>

                <div className="flex justify-between">

                  <span>Taxes</span>

                  <span>₹499</span>

                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold text-blue-600">

                  <span>Total</span>

                  <span>
                    ₹{flight.price + 499}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}