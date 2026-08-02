const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Flight = require("../models/Flight");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const airlines = [
  "Air India",
  "IndiGo",
  "SpiceJet",
  "Akasa Air",
  "Vistara",
];

const cities = [
  "Pune",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Goa",
  "Jaipur",
];

const aircrafts = [
  "Airbus A320",
  "Boeing 737",
  "Airbus A321",
  "Boeing 787",
];

const statusList = [
  "On Time",
  "Delayed",
  "Cancelled",
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomTime() {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);

  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

function randomDate() {
  const today = new Date();

  today.setDate(today.getDate() + Math.floor(Math.random() * 30));

  return today;
}

async function seedFlights() {
  try {
    await Flight.deleteMany();

    const flights = [];

    for (let i = 1; i <= 100; i++) {
      let from = randomItem(cities);
      let to = randomItem(cities);

      while (from === to) {
        to = randomItem(cities);
      }

      flights.push({
        flightNumber: `AI${1000 + i}`,

        airline: randomItem(airlines),

        from,

        to,

        departureDate: randomDate(),

        departureTime: randomTime(),

        arrivalTime: randomTime(),

        duration: Math.floor(Math.random() * 240) + 60,

        price: Math.floor(Math.random() * 8000) + 2500,

        availableSeats: Math.floor(Math.random() * 180) + 20,

        aircraft: randomItem(aircrafts),

        status: randomItem(statusList),
      });
    }

    await Flight.insertMany(flights);

    console.log("✅ 100 Flights Inserted Successfully");

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
}

seedFlights();