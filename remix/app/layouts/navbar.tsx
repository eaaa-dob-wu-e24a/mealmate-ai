import { NavLink, Outlet } from "react-router";

import { FaRegCircleUser } from "react-icons/fa6";
import { FiHome } from "react-icons/fi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import { FaRegBookmark } from "react-icons/fa";

export default function BottomNav() {
  const navItems = [
    { icon: <FiHome size={24} />, to: "/" },
    {
      icon: <IoChatbubbleEllipsesOutline size={28} />,
      to: "/chatbot",
    },
    { icon: <FaRegBookmark size={24} />, to: "/recipe-archive" },
    { icon: <FaRegCircleUser size={24} />, to: "/profile" },
  ];

  return (
    <>
      <div>
        <Outlet />
      </div>

      <nav className="sticky z-30 bottom-0  bg-[#F8F5EF] py-3 border-t border-gray-300">
        <ul className="flex justify-around items-center max-w-md mx-auto list-none p-0 m-0">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-center p-2 ${
                    isActive ? "text-green-700" : "text-gray-600"
                  }`
                }
              >
                {item.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
