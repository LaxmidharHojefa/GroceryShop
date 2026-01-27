import Banner1 from "../assets/Banner1.jpg";
import Banner2 from "../assets/Banner2.png";
import Background from "../assets/Background.png";

import P1 from "../assets/P1.jpg";
import P2 from "../assets/P2.jpg";
import P3 from "../assets/P3.jpg";
import P4 from "../assets/P4.jpg";
import P5 from "../assets/P5.jpg";

const avatars = [
  P1,
  P2,
  P3,
  P4,
  P5,
];


const TestimonialsSection = () => {
  return (
    <section className="w-full">

      {/* ===== TOP BANNER SECTION ===== */}
      <div className="max-w-[1320px] mx-auto px-4 mt-10 z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT LARGE BANNER (2 columns) */}
        <div className="md:col-span-2 w-[850px] h-[300px] rounded-xl overflow-hidden z-10">
          <img
            src={Banner1}
            alt="Vegetables Offer"
            className="w-full h-full object-cover z-10"
          />
        </div>

        {/* RIGHT SMALL BANNER */}
        <div className="rounded-xl overflow-hidden z-10 w-[424px] h-[300px]">
          <img
            src={Banner2} 
            alt="Big Sale"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ===== TESTIMONIAL SECTION ===== */}
      <div
        className="relative z-0 py-20 px-4 -mt-24"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5
        }}
      >

        <div className="max-w-4xl mx-auto  mt-[90px] text-center text-gray-700">

          {/* Heading */}
          <h2 className="text-xl font-bold mb-8">
            What Our Client Say
          </h2>

            <div className="flex justify-center items-center mt-6">
                <img
                    src={avatars[0]}
                    alt="client"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white -mr-4"
                />

                <img
                    src={avatars[1]}
                    alt="client"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white -mr-4"
                />

                <img
                    src={avatars[2]}
                    alt="client"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white z-10"
                />

                <img
                    src={avatars[3]}
                    alt="client"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white -ml-4"
                />

                <img
                    src={avatars[4]}
                    alt="client"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white -ml-4"
                />

            </div>


          {/* Quote */}
          <p className="text-sm max-w-2xl font-semibold mx-auto leading-relaxed mb-6 text-gray-600">
            “Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.”
          </p>

          {/* Name */}
          <p className="font-medium text-bold text-sm mb-2">
            Mohesh Patel
          </p>

          {/* Rating */}
          <div className="flex justify-center gap-1 text-green-500">
            ★ ★ ★ ★ ★
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
