import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { CiMobile4 } from "react-icons/ci";
import { LuGift } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white sticky top-0 left-0 z-50">

      {/* TOP BAR */}
      <div className="w-full mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8" />
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for Products ..."
              className="w-full border rounded-full py-2 pl-4 pr-10 text-sm outline-none"
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6 text-gray-700">

          <div className="hidden md:flex items-center gap-2 text-sm">
            <CiMobile4 className="h-5 w-5" />
            <span>+11800-000-000</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-sm">
            <LuGift className="h-5 w-5" />
            <span>Offers</span>
          </div>

          <div className="relative">
            <FiHeart className="text-xl cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              2
            </span>
          </div>

          <BsPerson className="text-xl cursor-pointer" />
        </div>
      </div>

      {/* BOTTOM MENU */}
      <div className="border-t">
        <div className="w-full mx-auto px-4 py-3 flex items-center gap-6 text-sm font-medium">

          {/* Categories */}
          <button className="flex items-center border-r-2 gap-2 ml-0 bg-white-600 text-black pr-4 py-2 rounded">
            <BiCategory className="h-5 w-5" />
            Select Categories
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-gray-700">

            <span className="cursor-pointer hover:text-green-600">Home</span>
            <span className="cursor-pointer hover:text-green-600">New Products</span>
            <span className="cursor-pointer hover:text-green-600">Featured Products</span>
            <span className="cursor-pointer hover:text-green-600">Shop</span>

            {/* Pages Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 cursor-pointer hover:text-green-600">
                Pages <FaAngleDown className="text-xs" />
              </button>

              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded w-44 z-50 top-full left-0 border border-gray-200">
                <a href="/about" className="block px-4 py-2 hover:bg-gray-100">About</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Checkout</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Cart</a>
                <a href="/my-account" className="block px-4 py-2 hover:bg-gray-100">My Account</a>
                <a href="/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Contact</a>
              </div>
            </div>

            <span className="cursor-pointer hover:text-green-600">Contact</span>
          </nav>

          {/* Cart Button */}
          <button className="ml-auto flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded">
            <FiShoppingCart />
            Cart (5)
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
