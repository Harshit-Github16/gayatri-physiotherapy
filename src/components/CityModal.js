'use client';

import React from 'react';
import { X, MapPin } from 'lucide-react';

const CITIES = [
  { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=200&h=200', phone: '08047093099', whatsapp: '911140846393' },
  { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=200&h=200', phone: '01140846393', whatsapp: '919821966696' },
  { name: 'Gurgaon', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=200&h=200', phone: '01140846393', whatsapp: '919821966696' },
  { name: 'Noida', image: 'https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?auto=format&fit=crop&q=80&w=200&h=200', phone: '01140846393', whatsapp: '919821966696' },
  { name: 'Faridabad', image: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=200&h=200', phone: '01140846393', whatsapp: '919821966696' },
  { name: 'Ghaziabad', image: 'https://images.unsplash.com/photo-1568849676085-51415703900f?auto=format&fit=crop&q=80&w=200&h=200', phone: '01140846393', whatsapp: '919821966696' },
  { name: 'Jammu & Kashmir', image: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&q=80&w=200&h=200', phone: '08082666216', whatsapp: '918082666216' },
  { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1605007493699-af65834f8a00?auto=format&fit=crop&q=80&w=200&h=200', phone: '04045210121', whatsapp: '911140846393' }
];

export default function CityModal({ isOpen, onClose, actionType }) {
  if (!isOpen) return null;

  const handleCitySelect = (city) => {
    if (actionType === 'phone') {
      window.location.href = `tel:${city.phone}`;
    } else if (actionType === 'whatsapp') {
      window.location.href = `https://wa.me/${city.whatsapp}?text=Hi%2C%20I%20need%20Physiotherapy%20Service%20in%20${city.name}`;
    } else {
      alert(`Selected Gayatri Physiotherapy Services in ${city.name}`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700">
            <MapPin className="h-6 w-6 animate-bounce" />
          </div>
          <h3 className="text-xl font-bold text-stone-800 md:text-2xl">
            Select Your City
          </h3>
          <p className="text-sm text-stone-500 mt-1">
            {actionType === 'phone'
              ? 'Choose a location to call our nearest expert center'
              : actionType === 'whatsapp'
              ? 'Select city to connect via WhatsApp'
              : 'Find physiotherapy sessions near you'}
          </p>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 max-h-[350px] overflow-y-auto p-1">
          {CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCitySelect(city)}
              className="flex flex-col items-center p-3 rounded-xl border border-stone-200 hover:border-teal-500 hover:bg-teal-50/30 transition-all duration-300 group"
            >
              <div className="relative mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-stone-100 group-hover:border-teal-600 transition-all duration-300">
                <img
                  src={city.image}
                  alt={city.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-semibold text-stone-700 group-hover:text-teal-700 text-center transition-colors">
                {city.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
