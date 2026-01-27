import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import logo from "../assets/logo.png";
import payment from "../assets/payment.png";

const Footer = () => {
  return (
    <footer className="bg-green-100 text-gray-700">
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* LOGO + ABOUT */}
        <div className="md:col-span-1">
          <div className="flex mb-2 items-center gap-2">
            <img src={logo} alt="Logo" className="h-8" />
          </div>
  
          <p className="text-sm leading-relaxed mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>

          <div className="flex gap-3 text-gray-600">
            <FaFacebookF className="cursor-pointer hover:text-green-600" />
            <FaTwitter className="cursor-pointer hover:text-green-600" />
            <FaInstagram className="cursor-pointer hover:text-green-600" />
            <FaLinkedinIn className="cursor-pointer hover:text-green-600" />
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-600 cursor-pointer"><a href="/about">About Us</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Contact Us</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="/blog">Blog</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">FAQ</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* MY ACCOUNT */}
        <div>
          <h4 className="font-semibold mb-4">My Account</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-600 cursor-pointer"><a href="/login">Login</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="/my-account">My Account</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Orders</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Checkout</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Wishlist</a></li>
          </ul>
        </div>

        {/* INFORMATION */}
        <div>
          <h4 className="font-semibold mb-4">Information</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Shipping Policy</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Return Policy</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Terms & Condition</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Payment Methods</a></li>
            <li className="hover:text-green-600 cursor-pointer"><a href="#">Order Tracking</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">
            Subscribe to our weekly Newsletter and receive updates via email.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter Your Email here..."
              className="px-4 py-2 w-full rounded-l-full border border-gray-300 outline-none text-sm"
            />
            <button className="bg-green-500 text-white px-5 rounded-r-full text-sm font-medium hover:bg-green-600">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-green-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p>
            All Rights Reserved <FaRegCopyright className="inline h-4 w-4" /> Company 2023. Design & Develop by{" "}
            <span className="text-green-600 font-medium">Vicssoft LLP</span>
          </p>

          <div className="flex items-center gap-3">
            <span className="text-gray-600">We Accept</span>
             <img src={payment} alt="Payment Methods" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
