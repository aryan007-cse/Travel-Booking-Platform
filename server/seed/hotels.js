const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Hotel = require("../models/Hotel");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const hotelNames = [
  "Grand Palace",
  "Royal Residency",
  "Skyline Suites",
  "Blue Lagoon",
  "Green Valley",
  "Ocean Pearl",
  "Sunrise Inn",
  "Golden Crown",
  "Silver Oak",
  "The Elite",
  "Mountain View",
  "City Central",
  "River Side",
  "Airport Residency",
  "The Imperial",
  "Comfort Stay",
  "Urban Nest",
  "Lake View",
  "Palm Resort",
  "Heritage Palace"
];

const cities = [
  "Mumbai",
  "Pune",
  "Delhi",
  "Goa",
  "Jaipur",
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Lucknow",
  "Indore",
  "Nagpur",
  "Surat",
  "Shimla",
  "Manali",
  "Rishikesh",
  "Udaipur",
  "Mysore",
  "Kochi"
];

const amenitiesList = [
  "WiFi",
  "Swimming Pool",
  "Gym",
  "Spa",
  "Restaurant",
  "Parking",
  "Bar",
  "Room Service",
  "Airport Shuttle",
  "Pet Friendly"
];

const roomTypes = [
  "Single",
  "Double",
  "Deluxe",
  "Suite"
];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomAmenities() {
  return amenitiesList
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
}

function generateRooms() {
  return roomTypes.map(type => ({
    roomType: type,
    price: Math.floor(Math.random() * 7000) + 2000,
    totalRooms: Math.floor(Math.random() * 30) + 10,
    availableRooms: Math.floor(Math.random() * 20) + 5,
    capacity:
      type === "Single"
        ? 1
        : type === "Double"
        ? 2
        : type === "Deluxe"
        ? 3
        : 4
  }));
}

async function seedHotels() {
  try {
    await Hotel.deleteMany();

    const hotels = [];

    for (let i = 1; i <= 50; i++) {
      hotels.push({
        hotelName: `${random(hotelNames)} ${i}`,
        city: random(cities),
        address: `${Math.floor(Math.random() * 300) + 1}, Main Road`,
        description: "Luxury hotel with modern facilities and comfortable stay.",
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
        amenities: randomAmenities(),
        images: [
          "https://picsum.photos/800/600?random=1",
          "https://picsum.photos/800/600?random=2",
          "https://picsum.photos/800/600?random=3"
        ],
        rooms: generateRooms()
      });
    }

    await Hotel.insertMany(hotels);

    console.log("✅ 50 Hotels Inserted Successfully");

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedHotels();