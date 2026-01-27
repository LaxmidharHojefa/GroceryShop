import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import slide1 from "../assets/Property 1=Slide1.png";
import slide2 from "../assets/Property 1=Slide2.png";
import slide3 from "../assets/Property 1=Slide3.png";

const images = [
  slide1,
  slide2,
  slide3,
];

function Slider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };
  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  
  return (
    <>
      <div className="max-w-[1320px] mx-auto h-[400px] flex justify-center items-center">
        <div>
          <button className="absolute top-[42.5%] ml-5 text-white" onClick={prevSlide}>
            <GrFormPrevious size={28} />
          </button>
          <img
            className="w-[1000px]"
            src={images[current]}
            alt="slide-photo-1"
            srcset=""
          />
          <button
            className="absolute ml-[955px] top-[42.5%] mr-4 text-white"
            onClick={nextSlide}
          >
            <GrFormNext size={28} />
          </button>
        </div>
      </div>
    </>
  );
}

export default Slider;


