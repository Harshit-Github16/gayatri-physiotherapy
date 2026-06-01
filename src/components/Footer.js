'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer({ onOpenCityModal }) {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/logo.jpg" alt="Gayatri Physiotherapy Logo" className="h-16 w-auto object-contain rounded-xl bg-white p-1.5 shadow-sm" />
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              New-age physiotherapy care delivering high-quality, personalized treatments by seamlessly integrating modern clinic tech, home visits, and expert tele-rehabilitation.
            </p>
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="https://facebook.com"
                className="flex items-center justify-center h-8 w-8 rounded-lg bg-stone-800 hover:bg-teal-600 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                className="flex items-center justify-center h-8 w-8 rounded-lg bg-stone-800 hover:bg-teal-600 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                className="flex items-center justify-center h-8 w-8 rounded-lg bg-stone-800 hover:bg-teal-600 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                className="flex items-center justify-center h-8 w-8 rounded-lg bg-stone-800 hover:bg-teal-600 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Offerings */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Specialized Care
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#services" className="hover:text-teal-400 transition-colors">
                  Orthopedic Physiotherapy
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-teal-400 transition-colors">
                  Spine Injury Rehabilitation
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-teal-400 transition-colors">
                  Sports Injury Recovery
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-teal-400 transition-colors">
                  Chiropractic Adjustments
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-teal-400 transition-colors">
                  Geriatric / Pediatric Rehab
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#about" className="hover:text-teal-400 transition-colors">
                  About Our Clinic
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-teal-400 transition-colors">
                  Frequently Asked FAQs
                </Link>
              </li>
              <li>
                <button
                  onClick={() => onOpenCityModal('city')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Locate Near Me
                </button>
              </li>
              <li>
                <Link href="#careers" className="hover:text-teal-400 transition-colors">
                  Join As Physiotherapist
                </Link>
              </li>
              <li>
                <Link href="#appointment" className="hover:text-teal-400 transition-colors">
                  Request Call Back
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                <span className="text-stone-400 leading-relaxed">
                  Gayatri Physiotherapy Clinic, 1st Floor, Main Center Metro Complex, Delhi NCR, India
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal-500 shrink-0" />
                <a href="tel:01140846393" className="hover:text-white transition-colors">
                  011-40846393
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-teal-500 shrink-0" />
                <a href="mailto:info@gayatrisportsphysio.in" className="hover:text-white transition-colors">
                  info@gayatrisportsphysio.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-800 my-10" />

        {/* Bottom copyright and legal */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Gayatri Healthcare Services Pvt. Ltd. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#terms" className="hover:text-stone-400 transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="#privacy" className="hover:text-stone-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#faq" className="hover:text-stone-400 transition-colors">
              Help Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
