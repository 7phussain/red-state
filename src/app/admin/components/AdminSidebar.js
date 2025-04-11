"use client";
import { useState } from "react";
import { PiHouse, PiScales, PiSignOut } from "react-icons/pi";
import Image from "next/image";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { BsDatabase, BsDatabaseAdd, BsHouseAdd, BsHouseDoor, BsList, BsWebcam, BsWindow, BsX } from "react-icons/bs";
import useIsMobile from "@/app/_functions/useIsMobile";

export default function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useIsMobile();

    const [openSidebar, setOpenSidebar] = useState(false);

    const navItems = [
        {
            label: "Listings",
            icon: <BsHouseDoor size={16} />,
            path: "/admin/listings",
        },
        {
            label: "Add Listings",
            icon: <BsHouseAdd size={16} />,
            path: "/admin/add-listings",
        },
        {
            label: "Developers",
            icon: <BsDatabase size={16} />,
            path: "/admin/developers",
        },
        {
            label: "Add Developers",
            icon: <BsDatabaseAdd size={16} />,
            path: "/admin/add-developers",
        },
        {
            label: "Website",
            icon: <BsWindow size={16} />,
            path: "/",
        },
    ];

    const handleNavigation = (path) => {
        router.push(path);
    };

    const isActive = (path) => pathname === path;

    const Sidebar = () => (
        <div className={`z-2 fixed w-[250px] min-h-screen p-4`}>
            <div
                className="relative w-full min-h-[93vh] bg-white p-1 rounded-xl shadow-sm flex flex-col justify-between"
            >
                <div
                    className="z-1 absolute top-0 left-0 w-full h-full rounded-xl shadow-sm"
                    style={{
                        background: "linear-gradient(to bottom left, rgba(202, 30, 46, 0.6), rgba(202, 30, 46, 0.2), rgba(202, 30, 46, 0.6)"
                    }}></div>
                <div className="z-2 flex flex-col gap-5 text-black">
                    <Image
                        src="/logo.png"
                        alt="Red State logo"
                        className="w-full p-5 z-2"
                        width={100}
                        height={0}
                        layout="intrinsic"
                    />
                    <div className="flex flex-col gap-2">
                        {navItems.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleNavigation(item.path)}
                                className={`grid grid-cols-6 gap-2 items-center rounded-md px-2 py-2 text-sm text-left ${isActive(item.path)
                                    ? "bg-primary text-white font-semibold"
                                    : "hover:bg-white/30"
                                    }`}
                            >
                                <div className="w-full flex justify-center">{item.icon}</div>
                                <div className="col-span-5">{item.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* LOG OUT */}
                <div className="z-2 flex flex-col p-2 gap-4">
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => {
                                localStorage.removeItem("auth-token");
                                router.push("/admin");
                            }}
                            className="cursor-pointer bg-white/50 text-primary text-xs rounded-full px-4 py-2 flex gap-2 items-center justify-center hover:opacity-80"
                        >
                            <PiSignOut size={16} />
                            Logout
                        </button>
                    </div>
                    <div className="text-xs text-center">
                        © DODEAL
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {isMobile && (
                <div
                    onClick={() => setOpenSidebar(!openSidebar)}
                    className="z-3 fixed top-0 left-0 bg-primary text-white rounded-br-full min-w-[40px] min-h-[40px] flex items-end justify-end p-3 w-fit h-fit"
                >
                    {openSidebar ? (
                        <BsX size={22} className="mr-2 mb-2" />
                    ) : (
                        <BsList size={22} className="mr-2 mb-2" />
                    )}
                </div>
            )}
            {isMobile && openSidebar && (
                <Sidebar />
            )}
            {!isMobile && (
                <Sidebar />
            )}
        </>
    );
}
