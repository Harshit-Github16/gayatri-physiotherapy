'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, MapPin, Globe } from 'lucide-react';

export default function Navbar({ onOpenCityModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '#about' },
    {
      name: 'Our Offerings',
      submenu: [
        { name: 'Therapies Offered', href: '#therapies' },
        { name: 'Services Offered', href: '#services' }
      ]
    },
    { name: 'FAQ', href: '#faq' },
    {
      name: 'Patient Education',
      submenu: [
        { name: 'Conditions We Treat', href: '#what-we-treat' },
        { name: 'Symptoms We Treat', href: '#what-we-treat' },
        { name: 'Clinic Specialities', href: '#specialities' }
      ]
    },
    {
      name: 'Work With Us',
      submenu: [
        { name: 'For Physiotherapists', href: '#careers' },
        { name: 'For Corporates', href: '#contact' },
        { name: 'For Investors', href: '#contact' }
      ]
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 shrink-0">
              <img src="/images/logo.jpg" alt="Gayatri Physiotherapy Logo" className="h-16 w-auto object-contain rounded-xl shadow-sm" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item, idx) => {
                if (item.submenu) {
                  return (
                    <div key={idx} className="relative group self-center py-2">
                      <button className="flex items-center space-x-1 text-sm font-semibold text-stone-600 hover:text-teal-700 transition-colors duration-200">
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4 text-stone-400 group-hover:text-teal-700 transition-transform duration-200 group-hover:rotate-180" />
                      </button>
                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 w-52 rounded-xl bg-white border border-stone-100 shadow-lg p-2 mt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                        {item.submenu.map((sub, sIdx) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className="block px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-teal-700 hover:bg-teal-50/50 rounded-lg transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="self-center text-sm font-semibold text-stone-600 hover:text-teal-700 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => onOpenCityModal('city')}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-stone-200 text-stone-700 text-sm font-semibold hover:border-teal-600 hover:text-teal-700 hover:bg-teal-50/20 transition-all duration-300"
              >
                <MapPin className="h-4 w-4 text-teal-600 animate-pulse" />
                <span>Select Location</span>
              </button>
              <Link
                href="#appointment"
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-md shadow-teal-700/10 hover:shadow-teal-800/20 transition-all duration-300 transform active:scale-95"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Actions and Trigger */}
            <div className="flex items-center lg:hidden space-x-3">
              <button
                onClick={() => onOpenCityModal('city')}
                className="p-2 rounded-xl bg-stone-50 border border-stone-200 text-stone-700"
                aria-label="Location"
              >
                <MapPin className="h-5 w-5 text-teal-700" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-stone-600 hover:text-stone-900 focus:outline-none"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl flex flex-col justify-between animate-slide-right ml-auto">
            <div>
              {/* Header */}
              <div className="flex justify-between items-center pb-6 border-b border-stone-100">
                <div className="flex items-center space-x-2">
                  <img src="/images/logo.jpg" alt="Gayatri Physiotherapy Logo" className="h-12 w-auto object-contain rounded-lg shadow-sm" />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-6 space-y-2">
                {navItems.map((item, idx) => {
                  if (item.submenu) {
                    return (
                      <div key={idx} className="space-y-1">
                        <button
                          onClick={() => toggleDropdown(idx)}
                          className="flex justify-between items-center w-full px-4 py-3 text-sm font-bold text-stone-800 hover:bg-stone-50 rounded-xl"
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`h-4 w-4 text-stone-500 transition-transform duration-200 ${
                              activeDropdown === idx ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {activeDropdown === idx && (
                          <div className="pl-6 space-y-1">
                            {item.submenu.map((sub, sIdx) => (
                              <Link
                                key={sIdx}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-4 py-2 text-xs font-semibold text-stone-600 hover:text-teal-700 rounded-lg"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-bold text-stone-800 hover:bg-stone-50 rounded-xl"
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Mobile Footer Buttons */}
            <div className="pt-6 border-t border-stone-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCityModal('city');
                }}
                className="w-full flex justify-center items-center space-x-2 py-3 rounded-xl border border-stone-200 text-stone-800 text-sm font-bold"
              >
                <MapPin className="h-4 w-4 text-teal-700" />
                <span>Select Location</span>
              </button>
              <Link
                href="#appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex justify-center items-center py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-md shadow-teal-700/10"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
