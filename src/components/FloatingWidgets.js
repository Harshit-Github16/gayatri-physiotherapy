'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingWidgets({ onOpenCityModal }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* WhatsApp Button */}
      <button
        onClick={() => onOpenCityModal('whatsapp')}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 group active:scale-95"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="h-7 w-7 fill-white/20 group-hover:scale-110 transition-transform" />
      </button>

      {/* Phone Call Button */}
      <button
        onClick={() => onOpenCityModal('phone')}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-teal-600/30 transition-all duration-300 hover:-translate-y-1 group active:scale-95"
        aria-label="Call clinic"
      >
        <Phone className="h-6 w-6 group-hover:scale-110 transition-transform animate-pulse" />
      </button>
    </div>
  );
}
