import { FileSignatureIcon } from "lucide-react";

const features = [
  {
    icon: <FileSignatureIcon name="target" size={24} />,
    title: "Product Strategy",
    description:
      "Holistic understanding of what the user expects, wants and needs from a product.",
  },
  {
    icon: <FileSignatureIcon name="pen-tool" size={24} />,
    title: "Design & UX",
    description:
      "Driven by research insights we turn ideas into innovative product solutions.",
  },
  {
    icon: <FileSignatureIcon name="code" size={24} />,
    title: "Web Development",
    description:
      "Our development team excels at building high-performance websites and apps.",
  },
  {
    icon: <FileSignatureIcon name="smartphone" size={24} />,
    title: "Mobile Development",
    description:
      "Once we take over the idea, we give it a new form, building a robust digital experience.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Like an agency, unlike any agency
        </h2>
        <p className="text-gray-600 mb-12">
          We shape our core capabilities around lean product teams capable of
          delivering immense value to organizations worldwide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center shadow-lg rounded-lg overflow-hidden bg-white transition-transform transform hover:scale-105 hover:shadow-2xl p-6"
            >
              <div className="flex items-center justify-center h-16 w-16 bg-blue-500 text-white rounded-full mb-4">
                {feature.icon}
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
