"use client";
import { useEffect, useState } from "react";
import { PiArrowLeft, PiEye, PiEyeSlash, PiLock, PiUser } from "react-icons/pi";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function Login() {
  const [formdata, setFormdata] = useState({ loginId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      router.push("/admin/listings");
    }
  }, []);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const LoginUser = async () => {
    setLoading(true);

    const bodyFormData = new FormData();
    bodyFormData.append("loginId", formdata.loginId);
    bodyFormData.append("password", formdata.password);

    try {
      const result = await axios.post(`${baseUrl}/login`, bodyFormData);

      if (result.data.success && result.data.data.token) {
        const token = result.data.data.token;
        localStorage.setItem("auth-token", token);

        toast.success("Login Successful!");
        router.push("/admin/listings");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginUser();
  };

  return (
    <>
      <div className="w-full min-h-screen px-[20px] md:px-[50px] lg:px-[100px] py-5 text-black flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, rgba(202, 30, 46, 1), rgba(202, 30, 46, 0.6), rgba(202, 30, 46, 0.2), rgba(202, 30, 46, 0.6), rgba(202, 30, 46, 1)"
        }}>
        {/* <div className="h-[50px]"></div> */}
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src="/logo.png"
            alt="Red State logo"
            width={150}
            height={0} // Temporary placeholder, not needed with layout="intrinsic"
            layout="intrinsic"
          />
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">Welcome</h1>
          <p className="font-normal">Login to your account to manage the listings!</p>
          <div className="flex w-full my-5 flex flex-col gap-4 w-[300px]">

            <h4 className="text-start text-md px-5">Sign in</h4>

            <form onSubmit={handleSubmit} className="flex flex-col px-5 gap-4">
              <div className="relative w-full">
                <span className="absolute left-3 top-3">
                  <PiUser size={18} className="text-primary" />
                </span>
                <input
                  type="text"
                  placeholder="Login ID"
                  value={formdata.loginId}
                  onChange={(e) => setFormdata({ ...formdata, loginId: e.target.value })}
                  required
                  className="w-full py-2 px-10 rounded-md bg-transparent border border-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
              </div>

              <div className="relative w-full">
                <span className="absolute left-3 top-3">
                  <PiLock size={18} className="text-primary" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formdata.password}
                  onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
                  required
                  className="w-full py-2 px-10 rounded-md bg-transparent border border-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600"
                />
                <button
                  type="button"
                  onClick={handleClickShowPassword}
                  className="absolute right-3 top-2"
                >
                  {showPassword ? (
                    <PiEye size={18} className="text-primary" />
                  ) : (
                    <PiEyeSlash size={18} className="text-primary" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center mb-5">
                <button
                  type="submit"
                  disabled={loading}
                  className={`disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center rounded-xl py-2 px-24 text-white font-bold w-max bg-primary`}
                >
                  <span>{loading ? "Signing in..." : "Sign in"}</span>
                </button>
              </div>
            </form>
          </div>

          <a href="/" className="my-5 text-center flex items-center justify-center gap-2">
            <PiArrowLeft size={20} />
            <span>Go back to the site</span>
          </a>
        </div>


        {/* </div> */}
      </div>
    </>
  );
}
