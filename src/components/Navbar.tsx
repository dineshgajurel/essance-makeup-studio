"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg py-4"
          : "bg-black/20 backdrop-blur-sm py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="relative z-[110]">
          <Image
            src="/logo.png"
            alt="Essence Logo"
            width={160}
            height={70}
            className="h-10 sm:h-14 w-auto object-contain transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 lg:gap-14">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.name === "Contact" ? (
                <Link
                  href={link.href}
                  className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl ${
                    isScrolled 
                      ? "bg-primary text-black shadow-primary/20" 
                      : "bg-white text-black shadow-white/10"
                  }`}
                >
                  Book / Contact
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className={`font-bold text-xs lg:text-sm uppercase tracking-[0.2em] transition-all hover:text-primary ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-[110] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X size={28} className="text-black" />
          ) : (
            <Menu size={28} className={isScrolled ? 'text-black' : 'text-white'} />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white z-[105] flex flex-col h-[100dvh] w-screen"
            >
              <div className="flex-1 flex flex-col items-center justify-center p-10">
                <ul className="flex flex-col gap-8 text-center w-full">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full"
                    >
                      {link.name === "Contact" ? (
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="bg-primary text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.3em] inline-block shadow-2xl shadow-primary/30 mt-4 w-full max-w-[280px]"
                        >
                          Book / Contact
                        </Link>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-xl font-black uppercase tracking-[0.4em] text-black hover:text-primary transition-colors block py-2"
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="p-10 text-center">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">
                  Essence Unisex Studio
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
