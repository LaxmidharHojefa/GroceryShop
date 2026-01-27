import logo from "../assets/logo.png";

const Login = () => {
  return (
    <>
      {/* BREADCRUMB BAR */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-600">
          <span className="text-green-600 font-medium">Home</span>
          <span className="mx-2">|</span>
          <span>Login</span>
        </div>
      </div>

      {/* LOGIN SECTION */}
      <section className="bg-white px-4 py-12 pt-[100px]">
        <div className="max-w-7xl mx-auto flex justify-center">

          {/* LOGIN CARD */}
          <div className="w-full max-w-sm bg-white border rounded-lg shadow-sm p-6">

            {/* LOGO */}
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Logo" className="h-10" />
            </div>

            {/* FORM */}
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Email / Phone No"
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition"
              >
                Login
              </button>
            </form>

            {/* FORGOT PASSWORD */}
            <p className="text-center text-sm text-green-600 mt-3 cursor-pointer hover:underline">
              Forgot Password?
            </p>

            {/* SIGN UP LINK */}
            <button className="w-full mt-3 bg-green-500/90 text-white py-2 rounded-md text-sm hover:bg-green-600 transition">
              Don&apos;t have an account? Sign Up
            </button>

            {/* COPYRIGHT */}
            <p className="text-center text-xs text-gray-400 mt-4">
              Copyright 2022 supermarket. All rights reserved
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
