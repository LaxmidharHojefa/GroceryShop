import Sketcherss from "../assets/Sketcherss.png";

const AboutPage = () => {
  return (
    <>
      {/* BREADCRUMB */}
      <div className="w-full bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
          <span className="text-green-600 font-medium">Home</span>
          <span className="mx-2">|</span>
          <span>About Us</span>
        </div>
      </div>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-4">
          About Grosary Super Market
        </h1>

        {/* INTRO TEXT */}
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry’s standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        {/* IMAGE */}
        <div className="flex justify-center mb-10">
            <img
              src={Sketcherss}
              alt="About Store"
              className="w-[403.97] h-[280px] object-cover"
            />
        </div>

        {/* PARAGRAPHS */}
        <div className="text-left space-y-6 text-sm text-gray-600 leading-relaxed">
          <p>
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>

          <p>
            Lorem ipsum has been the industry’s standard dummy text ever since
            the 1500s when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. Lorem ipsum has been the industry’s
            standard dummy text ever since the 1500s.
          </p>

          <p>
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>

          <p>
            Lorem ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
