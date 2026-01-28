import { useEffect, useState } from "react";
import axios from "axios";
import { FiUser, FiLogOut, FiMapPin, FiHeart } from "react-icons/fi";
import { BsBox } from "react-icons/bs";

const MyAccount = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "test@gmail.com",
    phone: "",
    gender: "",
    address: "",
  });

  /* =========================
     FETCH USER DATA (AUTO FILL)
     ========================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(res.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load profile", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
     ========================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     UPDATE PROFILE
     ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Update failed", error);
      alert("Update failed");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <>
      {/* BREADCRUMB */}
      <div className="w-full bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm">
          <span className="text-green-600">Home</span> | My Account
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* LEFT MENU */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <MenuItem icon={<FiUser />} label="Account Info" active />
          <MenuItem icon={<BsBox />} label="My Orders" />
          <MenuItem icon={<FiHeart />} label="My Favourite" />
          <MenuItem icon={<FiMapPin />} label="My Address" />
          <MenuItem icon={<FiLogOut />} label="Logout" danger />
        </div>

        {/* RIGHT FORM */}
        <div className="md:col-span-3 bg-white border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Account Information</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Email"
              name="email"
              value={formData.email}
              disabled
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Input
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyAccount;

/* =========================
   REUSABLE COMPONENTS
   ========================= */

const MenuItem = ({ icon, label, active, danger }) => (
  <div
    className={`flex items-center gap-3 px-5 py-3 cursor-pointer text-sm
      ${active ? "bg-green-500 text-white" : "hover:bg-gray-50"}
      ${danger ? "text-red-500" : ""}`}
  >
    {icon}
    {label}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
);
