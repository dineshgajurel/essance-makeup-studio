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

  // Prevent scroll when menu is open
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
          ? "bg-white/90 backdrop-blur-xl shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="relative z-[110]">
          <Image
            src="/logo.png"
            alt="Essence Logo"
            width={140}
            height={60}
            className={`h-10 sm:h-12 w-auto object-contain transition-all duration-500 ${isScrolled ? 'brightness-100' : 'brightness-0 invert'}`}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.name === "Contact" ? (
                <Link
                  href={link.href}
                  className="bg-primary text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                >
                  Book / Contact
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className={`font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:text-primary ${isScrolled ? 'text-black' : 'text-white'}`}
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
            <X size={32} className="text-black" />
          ) : (
            <Menu size={32} className={isScrolled ? 'text-black' : 'text-white'} />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-white z-[105] flex flex-col items-center justify-center p-10"
            >
              <div className="absolute top-10 left-10 opacity-10">
                <Image src="/logo.png" alt="Essence" width={200} height={80} className="grayscale" />
              </div>

              <ul className="flex flex-col gap-10 text-center">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.name === "Contact" ? (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="bg-primary text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] inline-block shadow-2xl shadow-primary/30 mt-4"
                      >
                        Book / Contact
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-black uppercase tracking-[0.4em] text-black hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="absolute bottom-10 text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">
                Essence Unisex Studio
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
