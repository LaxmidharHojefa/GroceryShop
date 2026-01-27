import F11 from "../assets/F11.png";
import F12 from "../assets/F12.png";
import F21 from "../assets/F21.png";
import F22 from "../assets/F22.png";

function Adv() {
  return (
    <>
      <div className="flex">
        <div className="mt-[80px] ml-auto flex justify-end">
          <div className="relative flex bg-[#E7EAF3] w-[648px] h-[300px] rounded-[20px] overflow-hidden">
            <img
              className="absolute top-[17px] left-[32px] w-[29px] h-[34px]"
              src={F12}
              alt=""
            />

            <img
              className="absolute bottom-[17.99px] left-[26px] w-[20px] h-[23px] rotate-[47deg]"
              src={F12}
              alt=""
            />

            <img
              className="absolute top-[24px] left-[262.8px] w-[20px] h-[23px] rotate-[45deg]"
              src={F12}
              alt=""
            />

            <img
              className="absolute top-[24px] left-[350px] mt-[210px] bottom-[16px] w-[29px] h-[34px] "
              src={F12}
              alt=""
            />

            <div className="pl-[45px] pt-[60px]">
              <h3 className="font-pacifico text-[#F34A1A] text-[30px]">
                Flat 30% OFF
              </h3>

              <p className="font-jost leading-[46px] text-black text-[36px] mt-[10px]">
                Hurry Up <br /> This Weekend
              </p>

              <button className="mt-[25px] font-jost font-semibold bg-[#F34A1A] text-white rounded-[5px] text-[18px] w-[126px] h-[44px]">
                Buy Now
              </button>
            </div>

            <img
              className="absolute right-[-20px] top-0 w-[339px] h-[300px]"
              src={F11}
              alt="Vegetables"
            />
          </div>
        </div>

        <div
          className="relative flex ml-[24px] mr-[auto] bg-[#F8F5EA] mt-[80px] w-[648px] rounded-[20px] h-[300px] overflow-hidden"
        >
          <img
            className="absolute right-[95.88px] left-[80px] top-0 h-full object-contain pointer-events-none  opacity-50"
            src={F22}
            alt=""
          />
          <div className="relative z-10 ml-[32px] font-nerko text-[#30B44A] mt-[32px] text-[50px] ">
            Flat 30% OFF
            <p className="font-josefin font-bold leading-[50px] text-black text-[46px]">
              Hurry Up <br /> This Weekend
            </p>
            <button className="font-jost font-semibold bg-[#F34A1A] text-white rounded-[5px] text-[18px] w-[126px] h-[44px] mt-[0px]">
              Buy Now
            </button>
          </div>
          <img
            className="relative z-10 flex ml-auto mt-[20px] w-[259.30242919921875px] h-[280px] mr-[30.7px] mb-0"
            src={F21}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Adv;


