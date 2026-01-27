import { useState, useEffect } from "react";

const bgColors = [
  "#D8FFF8",
  "#FFE5D1",
  "#D1E8FF",
  "#E0D1FF",
  "#FFD1E0",
  "#FFF8D1",
];


const ITEMS_VISIBLE = 5;

const CategorySlider = () => {
  const [index, setIndex] = useState(0);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // Fetch data from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories");
        const json = await res.json();
        setCategories(json.data);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const nextSlide = () => {
    if (index < categories.length - ITEMS_VISIBLE) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  // Loading & error handling
  if (loading) return <p className="text-center">Loading categories...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="max-w-[1320px] mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold w-[330px] h-[30px] font-poppins">Shop By Category</h2>

        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={index === 0}
            className="w-[37px] h-[37.2px] flex items-center justify-center border rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-40"
          >
            ❮
          </button>
          
          <button
            onClick={nextSlide}
            disabled={index >= categories.length - ITEMS_VISIBLE} // 🔴 CHANGED
            className="w-8 h-8 flex items-center justify-center border rounded-full disabled:opacity-40"
          >
            ❯
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * 220}px)`,
          }}
        >
          {categories.map((cat, index) => (
            <div
              key={cat._id}
              style={{
                backgroundColor: bgColors[index % bgColors.length], 
              }}
              className="min-w-[200px] h-[193.63px] p-4 rounded-xl flex flex-col items-center text-center"
            >
              <img
                src={`http://localhost:3000${cat.image}`}
                alt={cat.name}
                className="w-[100px] h-[92.1px] object-contain mb-3"
              />
              <h3 className="font-medium text-sm">{cat.name}</h3>
              <p className="text-xs text-gray-500">{cat.totalItems} Items</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
