import { 
  FaStore, 
  FaTruck, 
  FaBoxOpen, 
  FaShoppingBasket 
} from "react-icons/fa";
import Background from "../assets/Background.png";

const achievements = [
  {
    icon: <FaStore />,
    value: "10 +",
    label: "Stores",
  },
  {
    icon: <FaTruck />,
    value: "20 K",
    label: "Delivery",
  },
  {
    icon: <FaBoxOpen />,
    value: "10 K",
    label: "Products",
  },
  {
    icon: <FaShoppingBasket />,
    value: "1000 +",
    label: "Brands",
  },
];

const OurAchievement = () => {
  return (
    <section
      className="relative z-0 py-20 px-4"
      style={{
        backgroundImage: `url(${Background})`,           
        backgroundPosition: "center",
        backgroundSize: "contain",
        opacity: 0.5,
      }}
    >
      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-14 text-gray-800">
          Our Achievement
        </h2>

        {/* ACHIEVEMENT ITEMS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-gray-800"
            >
              <div className="text-4xl mb-4 text-gray-700">
                {item.icon}
              </div>

              <p className="text-lg font-semibold">{item.value}</p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievement;
