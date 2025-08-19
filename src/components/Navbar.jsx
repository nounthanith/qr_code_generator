import React, { useState } from "react";
import { QrCode, Barcode, Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom"; // if using React Router

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Generate QR Code", href: "/", icon: <QrCode className="w-4 h-4" /> },
    { name: "Generate Barcode", href: "/barcode", icon: <Barcode className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-6 left-6 right-6 z-50">
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl px-6 py-4 border border-indigo-100">
        {/* Logo */}
        <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-xl">
          <QrCode className="w-6 h-6" />
          CodeGen
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <a
                key={index}
                href={item.href}
                className={`relative flex items-center gap-2 text-sm font-medium transition duration-300 ${
                  isActive
                    ? "text-indigo-700"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                {item.icon}
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] rounded-full transition-all duration-300 ${
                    isActive ? "w-full bg-indigo-600" : "w-0 group-hover:w-full bg-indigo-400"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-indigo-700 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg p-4 border border-indigo-100">
          <div className="flex flex-col gap-4">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // close menu on click
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition duration-300 ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
