import Hero from "../components/home/Hero";

import PopularDestinations from "../components/home/PopularDestinations";
import FeaturedHotels from "../components/home/FeaturedHotels";
import FlightDeals from "../components/home/FlightDeals";
import WhyChooseUs from "../components/home/WhyChooseUs";

export default function Home() {
  return (
    <main className="bg-slate-50">
      <Hero />
      <PopularDestinations />
      <FeaturedHotels />
      <FlightDeals />
      <WhyChooseUs />
    </main>
  );
}