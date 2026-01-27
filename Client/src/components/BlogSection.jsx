import blogData from "../data/blogData";
import ReadMore from "./ReadMore";

const BlogSection = ({ limit = blogData.length, showHeader = true }) => {
  const visibleBlog = blogData.slice(0, limit);

  return (
    <section className="max-w-[1320px] mx-auto px-4 py-12">
      
      {showHeader && (
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-semibold text-gray-800">
            Our Latest News & Blog
          </h2>

          <button className="bg-orange-500 text-white text-sm px-4 py-2 rounded hover:bg-orange-600 transition">
            See All
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleBlog.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            {/* 🔹 CHANGED: Removed fixed width/height */}
            {/* 🔹 CHANGED: aspect-[4/3] keeps image ratio perfect */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                By{" "}
                <span className="text-green-600 font-medium">
                  {item.author}
                </span>{" "}
                / {item.date}
              </p>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed flex-1">
                {item.description}
              </p>

              <ReadMore />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
