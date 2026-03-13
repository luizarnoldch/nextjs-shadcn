import { Button } from "@/components/ui/button";
import Image from "next/image";

const MetricHero = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-hero.png')" }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-6">
        <div className="text-left max-w-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Welcome to Our Platform
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Achieve your goals with our powerful tools and analytics.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-white">
              <h2 className="text-2xl font-semibold">120K+</h2>
              <p className="text-gray-400">Users Worldwide</p>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-semibold">95%</h2>
              <p className="text-gray-400">Satisfaction Rate</p>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-semibold">50+</h2>
              <p className="text-gray-400">Countries Served</p>
            </div>
          </div>
          <Button className="mt-6 px-6 py-3 bg-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Get Started
          </Button>
        </div>
        <div className="mt-8 md:mt-0 md:ml-6 w-full md:w-auto flex justify-center md:justify-end">
          <Image
            src="/images/hero.png"
            alt="Reference Image"
            width={430}
            height={392}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default MetricHero;
