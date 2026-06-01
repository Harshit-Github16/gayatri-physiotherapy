'use client';

import React, { useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CityModal from '@/components/CityModal';
import FloatingWidgets from '@/components/FloatingWidgets';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState('city');

  const openCityModal = (type = 'city') => {
    setModalActionType(type);
    setModalOpen(true);
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <title>Gayatri Physiotherapy | Advanced AI-Powered Physio Rehab & Chiropractic</title>
        <meta name="description" content="Experience AI-driven precision physiotherapy for pain-free mobility. Professional clinic treatments, orthopedic rehab, chiropractic alignment, and sports injury therapy." />
        <meta name="keywords" content="physiotherapy clinic, spine adjustment, chiropractor, sports injury rehab, physical therapy, home physiotherapy, Gayatri Physiotherapy" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 selection:bg-teal-700 selection:text-white">
        {/* Topbar */}
        <Topbar onOpenCityModal={openCityModal} />

        {/* Navbar */}
        <Navbar onOpenCityModal={openCityModal} />

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <Footer onOpenCityModal={openCityModal} />

        {/* Floating Widgets */}
        <FloatingWidgets onOpenCityModal={openCityModal} />

        {/* City Modal Popup */}
        <CityModal
          isOpen={modalOpen}
          actionType={modalActionType}
          onClose={() => setModalOpen(false)}
        />
      </body>
    </html>
  );
}
