import { Bell, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

const NavBar = () => {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "TV Shows", path: "/tv" },
    { label: "Movies", path: "/movies" },
    { label: "New & Popular", path: "/latest" },
    { label: "My List", path: "/my-list" },
    { label: "Browse by Languages", path: "/original-audio" },
  ];
  return (
    <nav className="h-20 w-full flex items-center justify-between px-4 py-2 text-white">
      <div className="flex items-center space-x-8">
        <Link to="/">
          <img
            className="h-[60px] w-[120px]"
            src="src/assets/netflix-logo.png"
            alt="netflix-logo"
          />
        </Link>
        <ul className="flex space-x-6">
          {menuItems.map((item) => (
            <li
              key={item.label}
              className="text-sm hover:text-gray-300 cursor-pointer"
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-6">
        <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <span className="text-sm cursor-pointer hover:text-gray-300">
          Children
        </span>
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <button
            type="button"
            onClick={logout}
            className="w-20 h-8 bg-red-600 hover:bg-red-700 rounded "
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
