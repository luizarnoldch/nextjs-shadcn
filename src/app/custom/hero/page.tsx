import DefaultHero from "./_components/DefaultHero";
import MetricHero from "./_components/MetricHero";

const HeroSection = () => {
  return (
    <div className="w-full">
      <DefaultHero />
      <MetricHero />
    </div>
  );
};

export default HeroSection;
