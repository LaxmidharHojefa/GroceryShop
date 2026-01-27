import { FaHeadset, FaShieldAlt, FaTags, FaStore } from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaHeadset />,
    title: "24 Customer Support",
    desc: "We will connect with 24 hours",
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Secure Payment",
    desc: "We will connect with 24 hours",
  },
  {
    id: 3,
    icon: <FaTags />,
    title: "Best Price & Offers",
    desc: "We will connect with 24 hours",
  },
  {
    id: 4,
    icon: <FaStore />,
    title: "Genuine Products Store",
    desc: "We will connect with 24 hours",
  },
];

const ServiceHighlights = () => {
  return (
    <section className="border-t border-dashed border-black bg-white">
      <div className="max-w-[1320px] ml-[130px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-100 text-green-600 text-xl">
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
