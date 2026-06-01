'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  ArrowRight, 
  Star, 
  MapPin, 
  Clock, 
  Activity, 
  UserCheck, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  Stethoscope,
  Heart,
  TrendingUp,
  Award
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Data Lists
const SPECIALITIES = [
  { 
    name: 'Cardio Respiratory Physiotherapist', 
    image: '/images/rehab_session.png', 
    description: 'Targeted breathing exercises and conditioning to rebuild lung capacity, improve oxygenation, and boost cardiac endurance.',
    href: '#appointment'
  },
  { 
    name: 'Chiropractor Adjustments', 
    image: '/images/chiropractic.png', 
    description: 'Expert spinal manipulations and skeletal adjustments to correct alignments, relieve nerve pressure, and restore posture.',
    href: '#appointment'
  },
  { 
    name: 'Ergonomics Specialist', 
    image: '/images/sports_injury.png', 
    description: 'Workspace analysis and biomechanical posture training to prevent repetitive strain injuries and eliminate daily muscle stiffness.',
    href: '#appointment'
  },
  { 
    name: 'Functional Strength Expert', 
    image: '/images/sports_injury.png', 
    isFunctional: true,
    description: 'Custom muscle activation and load training to reinforce joint integrity, correct muscular imbalances, and prevent injury recurrence.',
    href: '#appointment'
  },
  { 
    name: 'Geriatric Physiotherapist', 
    image: '/images/rehab_session.png', 
    description: 'Gentle mobilizations, balance exercises, and coordination therapies to help seniors maintain independence and prevent falls.',
    href: '#appointment'
  },
  { 
    name: 'Home Physiotherapist', 
    image: '/images/hero_clinic.png', 
    description: 'One-on-one professional therapy delivered directly to your doorstep with all necessary clinical gear and exercises.',
    href: '#appointment'
  }
];

const EXPERTS = [
  {
    name: 'Dr. Garima Sharma',
    role: 'Senior Physiotherapist & Clinical Head',
    spec: 'BPT, MIAP',
    experience: '4 Years Experience',
    desc: 'Highly skilled physical therapist specializing in advanced orthopedic care, musculoskeletal rehabilitation, pain relief therapies, and posture corrections.',
    image: '/images/dr_garima.png'
  }
];

const CLINICS = [
  {
    name: 'Gayatri Physiotherapy Clinic',
    city: 'Delhi NCR',
    rating: '5.0',
    reviews: '128',
    address: 'Gayatri Physiotherapy Clinic, 1st Floor, Main Center Metro Complex, Delhi NCR, India',
    phone: '01140846393',
    hours: '8am to 8pm',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400&h=250'
  }
];

const CONDITIONS = [
  'Shoulder Arthropathy',
  'Cuboid Syndrome',
  'Median Nerve Injury',
  'Hemangioma',
  'Raynaud\'s Disease',
  'Lumbar Spondylosis',
  'Herniated Disk or Slipped Disc',
  'Cervical Spondylosis',
  'Sciatica',
  'Osteoarthritis Knee',
  'Frozen Shoulder (Adhesive Capsulitis)',
  'Ankylosing Spondylitis',
  'Fibromyalgia',
  'Hemiplegia / Stroke Rehab'
];

const SYMPTOMS = [
  'Loss Of Balance',
  'Inflammation',
  'Headache',
  'Shortness Of Breath',
  'Sprains And Strains',
  'Lower Back Pain',
  'Neck Stiffness',
  'Radiating Leg Pain',
  'Shoulder Mobility Loss',
  'Joint Pain & Swelling',
  'Muscle Weakness',
  'Postural Headaches',
  'Numbness & Tingling'
];

const THERAPIES = [
  'Dry Needling Therapy',
  'Thermotherapy(Heat Therapy)',
  'Transcutaneous Electrical Nerve Stimulation(Tens) Therapy',
  'Lymphatic Drainage Massage',
  'Overhead Track Harness Therapy',
  'Kinesiology Taping',
  'Joint Mobilization & Manipulation',
  'Spinal Decompression Therapy',
  'High-Frequency Laser Therapy',
  'Ultrasound Therapy',
  'Shockwave Pain Therapy'
];

const SERVICES = [
  'Chiropractor Treatment',
  'Sports Physiotherapy',
  'Pediatric Physiotherapy',
  'Home Care Physiotherapy',
  'Neuro Physiotherapy – Rehab',
  'Cardio Respiratory Rehab',
  'Geriatric Rehabilitation',
  'Post-Pregnancy Rehab',
  'Post-Surgery Rehabilitation'
];

const FAQS = [
  {
    question: 'What is Gayatri precision care for pain-free mobility?',
    answer: 'Precision Care for Pain-Free Mobility is our technology-integrated clinical approach. It uses advanced physical assessments combined with data tracking to design target-specific treatments. Whether at our advanced clinics, at home, or remotely, this ensures effective pain relief and recovery.'
  },
  {
    question: 'How do I book a session for home physiotherapy services?',
    answer: 'You can easily request a home session by filling out our Book Appointment form, clicking the WhatsApp button, or calling our clinic number directly. Our clinical coordinator will assign an expert physiotherapist near your locality for a home assessment.'
  },
  {
    question: 'Are your doctors certified and experienced?',
    answer: 'Yes! All physiotherapists and chiropractors at Gayatri Physiotherapy hold clinical degrees (BPT/MPT) and have years of hospital or clinic experience. They undergo thorough background verification and internal clinical audits to maintain high quality care.'
  },
  {
    question: 'Do you treat sports injuries and perform chiropractic alignments?',
    answer: 'Absolutely. We have specialized sports rehab protocols for athletes, covering ligament tears, sprains, and post-surgery recovery. We also have certified manual therapists and chiropractors for joint adjustments and spine corrections.'
  },
  {
    question: 'What is the duration of a standard treatment session?',
    answer: 'A standard physiotherapy session lasts between 45 to 60 minutes, depending on the severity of the condition and the modalities used (such as manual therapy, dry needling, ultrasound, or laser).'
  }
];

const TESTIMONIALS_ROW1 = [
  { name: 'Rahul Mehta', text: 'Dr. Garima identified the root cause of my spondylosis and helped me recover from a severe slip disc without surgery.', recovery: 'Slip Disc Recovery', initials: 'RM' },
  { name: 'Priya Sharma', text: 'I had frozen shoulder stiffness for 6 months. Within 4 sessions here, I regained full range of motion. Highly recommended!', recovery: 'Frozen Shoulder', initials: 'PS' },
  { name: 'Amit Verma', text: 'Excellent sports injury rehab. I sprained my knee ligament and Dr. Garima\'s exercise plans got me running in weeks.', recovery: 'Knee Sprain Rehab', initials: 'AV' },
  { name: 'Sanjay Dutt', text: 'Outstanding clinical expertise. The customized dry needling therapy relieved my chronic neck pain instantly.', recovery: 'Cervical Pain Cured', initials: 'SD' },
  { name: 'Sneha Reddy', text: 'Very systematic approach with milestone testing. Excellent guidance for postural alignment and core correction.', recovery: 'Posture Correction', initials: 'SR' }
];

const TESTIMONIALS_ROW2 = [
  { name: 'Anjali Desai', text: 'Dr. Garima is exceptionally skilled. She resolved my persistent lumbar back strain with target exercises.', recovery: 'Back Pain Relief', initials: 'AD' },
  { name: 'Vikram Malhotra', text: 'ACL recovery was a breeze here. The data tracking kept me motivated and the clinical setup is world-class.', recovery: 'ACL Post-Surg Rehab', initials: 'VM' },
  { name: 'Meera Sen', text: 'Post-pregnancy backaches were making daily tasks difficult. The therapeutic mobilizations worked wonders for me.', recovery: 'Post-Pregnancy Rehab', initials: 'MS' },
  { name: 'Rohan Gupta', text: 'Effective treatment for Sciatica. The radiating pain in my leg vanished after a week of targeted physical therapy.', recovery: 'Sciatica Relief', initials: 'RG' },
  { name: 'Karan Johar', text: 'Highly professional, sanitized clinic. The standard of clinical audits and treatment plans is top notch.', recovery: 'Joint Pain Mobility', initials: 'KJ' }
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('conditions');
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Delhi',
    service: 'Orthopedic Physiotherapy',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // GSAP animation refs
  const pageRef = useRef(null);

  useEffect(() => {
    // Staggered animations on load and scroll
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-desc',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-ctas',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' }
      );

      // Scroll triggered animations for sections
      const sections = gsap.utils.toArray('.scroll-reveal');
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Stagger reveal on cards
      gsap.fromTo(
        '.stagger-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stagger-trigger',
            start: 'top 75%'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in your Name and Phone number.');
      return;
    }
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        city: 'Delhi',
        service: 'Orthopedic Physiotherapy',
        message: ''
      });
    }, 1500);
  };

  return (
    <div ref={pageRef} className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-stone-950 text-white pt-10">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_clinic.png"
            alt="Gayatri Clinic Interior"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-full text-teal-400 text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <span>India&apos;s Leading Rehab Specialists</span>
            </div>
            
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase">
              Integrated Care <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                with AI Precision
              </span>
            </h1>
            
            <p className="hero-desc text-stone-300 text-base sm:text-lg leading-relaxed mt-6 max-w-lg">
              Clinically guided, data-optimized care for permanent pain relief, orthopaedic recovery, spinal adjustments, and long-term athletic mobility.
            </p>

            <div className="hero-ctas flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
              <Link
                href="#appointment"
                className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-600/30 hover:shadow-teal-700/40 transition-all duration-300 transform active:scale-95"
              >
                <span>Book Appointment</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:01140846393"
                className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl border border-white/20 hover:border-white/50 text-white font-bold text-sm bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <span>Call Coordinator</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Home Contact Info Cards (3 Columns) */}
      <section className="relative z-25 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xl premium-shadow-hover flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold mb-6">
                <Stethoscope className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-extrabold text-stone-900 mb-3">Advanced Clinics</h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                Modern clinical setup equipped with high-frequency laser, shockwave therapy, traction tables, and top physiotherapy doctors near you.
              </p>
            </div>
            <Link href="#services" className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 mt-6 group">
              <span>View Services</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xl premium-shadow-hover flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold mb-6">
                <Heart className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-extrabold text-stone-900 mb-3">Professional Home Care</h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                Licensed physical therapists visit your home with required equipment, delivering personalized rehab programs with continuous monitoring.
              </p>
            </div>
            <Link href="#appointment" className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 mt-6 group">
              <span>Schedule Home Visit</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-xl premium-shadow-hover flex flex-col justify-between">
            <div>
              <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold mb-6">
                <Activity className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-extrabold text-stone-900 mb-3">Tele / Remote Rehab</h2>
              <p className="text-stone-500 text-sm leading-relaxed">
                Stay consistent with home exercise programs via video assessments, real-time posture analysis, and step-by-step counselor support.
              </p>
            </div>
            <Link href="#appointment" className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 mt-6 group">
              <span>Book Online Session</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Therapy Process Section (AI Precision Recovery) */}
      <section className="py-24 bg-stone-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Our Method</span>
            <h2 className="text-4xl font-black text-stone-900 uppercase mt-2">
              AI Precision Recovery
            </h2>
            <div className="h-1 w-20 bg-teal-600 mx-auto mt-4" />
          </div>

          <div className="relative flex flex-col md:flex-row items-stretch justify-between gap-12 md:gap-4 mt-16 max-w-6xl mx-auto before:content-[''] before:absolute before:left-[50%] before:top-[40px] before:bottom-[40px] before:w-[2px] before:border-l-2 before:border-dashed before:border-teal-500/20 before:md:hidden stagger-trigger">
            
            {/* Connector Arrow 1 */}
            <div className="hidden md:block absolute top-[30px] left-[20%] w-[12%] h-[30px]">
              <svg viewBox="0 0 100 30" fill="none" className="w-full h-full text-teal-600/40">
                <path d="M5,25 Q50,0 95,20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                <path d="M88,20 L96,21 L91,13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Connector Arrow 2 */}
            <div className="hidden md:block absolute top-[30px] left-[45%] w-[12%] h-[30px]">
              <svg viewBox="0 0 100 30" fill="none" className="w-full h-full text-teal-600/40">
                <path d="M5,25 Q50,0 95,20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                <path d="M88,20 L96,21 L91,13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Connector Arrow 3 */}
            <div className="hidden md:block absolute top-[30px] left-[70%] w-[12%] h-[30px]">
              <svg viewBox="0 0 100 30" fill="none" className="w-full h-full text-teal-600/40">
                <path d="M5,25 Q50,0 95,20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                <path d="M88,20 L96,21 L91,13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 1 */}
            <div className="stagger-card flex-1 flex flex-col items-center text-center px-4 relative z-10">
              <div className="h-20 w-20 rounded-full bg-white text-teal-700 flex items-center justify-center mb-6 border border-stone-200 shadow-md">
                <svg viewBox="0 0 100 100" className="w-11 h-11 text-teal-700" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="40" className="stroke-teal-600/30 fill-teal-50/10" strokeWidth="1" />
                  <circle cx="50" cy="28" r="6" className="fill-teal-700 stroke-none" />
                  <path d="M43,38 C43,38 40,43 38,48 C36,53 38,55 40,55 C42,55 44,45 44,45 L44,68 L47,68 L47,88 L53,88 L53,68 L56,68 L56,45 C56,45 58,55 60,55 C62,55 64,53 62,48 C60,43 57,38 57,38" className="fill-teal-700 stroke-none" />
                  <circle cx="62" cy="62" r="10" className="stroke-emerald-600 fill-white" strokeWidth="2" />
                  <line x1="69" y1="69" x2="80" y2="80" className="stroke-emerald-600" strokeWidth="2.5" />
                  <line x1="25" y1="48" x2="75" y2="48" className="stroke-teal-400/80" strokeWidth="1.5" strokeDasharray="4 2" />
                </svg>
              </div>
              <h3 className="text-base font-black text-stone-900 uppercase tracking-tight">Assess</h3>
              <p className="text-stone-700 font-bold text-xs uppercase tracking-wider mt-0.5 mb-3">(Root-Cause)</p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                <span className="font-bold text-stone-850">AI + Physio Precision:</span> Our Physios uncover the <span className="font-bold text-stone-850">root cause of your problem</span> through advanced AI assessments – so treatments can deliver long-lasting relief &amp; improved function.
              </p>
            </div>

            {/* Step 2 */}
            <div className="stagger-card flex-1 flex flex-col items-center text-center px-4 relative z-10">
              <div className="h-20 w-20 rounded-full bg-white text-teal-700 flex items-center justify-center mb-6 border border-stone-200 shadow-md">
                <svg viewBox="0 0 100 100" className="w-11 h-11 text-teal-700" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="40" className="stroke-teal-600/30 fill-teal-50/10" strokeWidth="1" />
                  <path d="M42,25 C32,25 28,34 32,45 C28,52 32,62 42,65 C44,65 44,67 45,71 C46,75 54,75 55,71 C56,67 56,65 58,65 C68,62 72,52 68,45 C72,34 68,25 58,25 Z" className="fill-white stroke-none" />
                  <path d="M50,25 L50,73 M42,25 C32,25 28,34 32,45 C28,52 32,62 42,65 M58,25 C68,25 72,34 68,45 C72,52 68,62 58,65" className="stroke-teal-700" strokeWidth="2" />
                  <circle cx="38" cy="35" r="2" className="fill-teal-600 stroke-none" />
                  <path d="M38,35 L44,39" className="stroke-teal-500" strokeWidth="1" />
                  <circle cx="44" cy="50" r="2" className="fill-teal-600 stroke-none" />
                  <path d="M44,50 L40,55" className="stroke-teal-500" strokeWidth="1" />
                  <circle cx="62" cy="35" r="2" className="fill-emerald-600 stroke-none" />
                  <path d="M62,35 L56,39" className="stroke-emerald-500" strokeWidth="1" />
                  <circle cx="56" cy="50" r="2" className="fill-emerald-600 stroke-none" />
                  <path d="M56,50 L60,55" className="stroke-emerald-500" strokeWidth="1" />
                </svg>
              </div>
              <h3 className="text-base font-black text-stone-900 uppercase tracking-tight">Plan</h3>
              <p className="text-stone-700 font-bold text-xs uppercase tracking-wider mt-0.5 mb-3">(Smart-Goals)</p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                <span className="font-bold text-stone-850">Personalized Recovery Map:</span> Your recovery roadmap aligned with your health needs is structured around SMART Goals &amp; Milestones. You&apos;ll know exactly what progress to expect, and when.
              </p>
            </div>

            {/* Step 3 */}
            <div className="stagger-card flex-1 flex flex-col items-center text-center px-4 relative z-10">
              <div className="h-20 w-20 rounded-full bg-white text-teal-700 flex items-center justify-center mb-6 border border-stone-200 shadow-md">
                <svg viewBox="0 0 100 100" className="w-11 h-11 text-teal-700" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="40" className="stroke-teal-600/30 fill-teal-50/10" strokeWidth="1" />
                  <rect x="34" y="26" width="32" height="42" rx="3" className="fill-white stroke-teal-700" strokeWidth="2" />
                  <line x1="42" y1="36" x2="58" y2="36" className="stroke-teal-450" strokeWidth="1.5" />
                  <line x1="42" y1="46" x2="58" y2="46" className="stroke-teal-450" strokeWidth="1.5" />
                  <line x1="42" y1="56" x2="50" y2="56" className="stroke-teal-450" strokeWidth="1.5" />
                  <path d="M28,66 L44,52 L54,60 L74,38" className="stroke-emerald-600" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="74" cy="38" r="3" className="fill-emerald-600 stroke-none" />
                </svg>
              </div>
              <h3 className="text-base font-black text-stone-900 uppercase tracking-tight">Track</h3>
              <p className="text-stone-700 font-bold text-xs uppercase tracking-wider mt-0.5 mb-3">(Progress)</p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                <span className="font-bold text-stone-850">Proof of Recovery:</span> A data-driven system that measures progress at every milestone—optimizing treatment and keeping you motivated for the road ahead.
              </p>
            </div>

            {/* Step 4 */}
            <div className="stagger-card flex-1 flex flex-col items-center text-center px-4 relative z-10">
              <div className="h-20 w-20 rounded-full bg-white text-teal-700 flex items-center justify-center mb-6 border border-stone-200 shadow-md">
                <svg viewBox="0 0 100 100" className="w-11 h-11 text-teal-700" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="50" cy="50" r="40" className="stroke-teal-600/30 fill-teal-50/10" strokeWidth="1" />
                  <rect x="36" y="24" width="28" height="52" rx="4" className="fill-white stroke-teal-700" strokeWidth="2" />
                  <line x1="46" y1="28" x2="54" y2="28" className="stroke-teal-700" strokeWidth="1" />
                  <circle cx="50" cy="70" r="2" className="fill-teal-700 stroke-none" />
                  <circle cx="48" cy="38" r="3" className="fill-emerald-600 stroke-none" />
                  <path d="M43,45 L48,43 L53,46 L55,54" className="stroke-emerald-600" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M48,43 L46,52 L50,52 L47,62" className="stroke-emerald-600" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M68,34 C72,38 72,44 68,48" className="stroke-teal-500" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M72,30 C78,36 78,46 72,52" className="stroke-teal-500" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-base font-black text-stone-900 uppercase tracking-tight">Advance</h3>
              <p className="text-stone-700 font-bold text-xs uppercase tracking-wider mt-0.5 mb-3">(Recovery)</p>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                <span className="font-bold text-stone-850">Care Beyond Clinic:</span> With guided exercise programs, adherence tracking and expert follow-ups, you can maintain progress, prevent relapse and keep moving forward.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Specialties Section (3x2 Premium Interactive Grid) */}
      <section id="specialities" className="py-24 bg-stone-100 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Our Offerings</span>
            <h2 className="text-4xl font-black text-stone-900 uppercase mt-2">
              Gayatri Specialities
            </h2>
            <div className="h-1 w-20 bg-teal-600 mx-auto mt-4" />
            <p className="text-stone-500 text-sm leading-relaxed mt-4">
              Explore our clinical specialities. We deliver highly customized physical therapy programs to address your specific symptoms and recovery goals.
            </p>
          </div>

          {/* Premium 3x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {SPECIALITIES.map((spec, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-[2rem] border border-stone-205 p-5 shadow-sm premium-shadow-hover transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-[220px] w-full rounded-2xl overflow-hidden bg-stone-50 mb-5">
                    <div className="shine-effect w-full h-full">
                      <img
                        src={spec.image}
                        alt={spec.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Floating Branding Badge for Functional Strength Expert */}
                    {spec.isFunctional && (
                      <div className="absolute top-4 right-4 bg-white/95 border border-stone-200 p-2.5 rounded-full shadow-md flex items-center justify-center backdrop-blur-sm">
                        <svg viewBox="0 0 120 120" className="w-8 h-8" fill="none" stroke="currentColor">
                          {/* Green head */}
                          <circle cx="60" cy="24" r="9" className="fill-lime-500 stroke-none" />
                          {/* Teal torso and arms */}
                          <path d="M42,57 C45,52 50,47 60,47 C72,47 80,55 84,65" className="stroke-teal-600" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                          {/* Lime green legs */}
                          <path d="M60,47 L53,75 L68,75 L59,96" className="stroke-lime-500" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-black text-stone-900 group-hover:text-teal-700 transition-colors uppercase tracking-tight mb-2 px-1">
                    {spec.name}
                  </h3>

                  {/* Description */}
                  <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mb-4 px-1 line-clamp-3">
                    {spec.description}
                  </p>
                </div>

                {/* Consult Link */}
                <Link
                  href={spec.href}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 group-hover:text-teal-900 transition-colors pt-3 border-t border-stone-100 w-full"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Clinical Expert Profile Section */}
      <section id="about" className="py-24 bg-stone-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Clinical Lead</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 uppercase mt-2">
              Meet Our Expert
            </h2>
            <div className="h-1 w-20 bg-teal-600 mx-auto mt-4" />
            <p className="text-stone-500 text-sm leading-relaxed mt-4">
              Dedicated clinical leadership ensuring high quality diagnosis and personalized recovery plans.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden p-8 lg:p-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Image side */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute inset-0 bg-teal-700/10 rounded-2xl transform translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300" />
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100 aspect-[4/5] max-w-sm mx-auto">
                  <img
                    src="/images/dr_garima.png"
                    alt="Dr. Garima Sharma"
                    className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-teal-700 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-md">
                    4 Years Experience
                  </div>
                </div>
              </div>

              {/* Bio Details side */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold text-teal-650 uppercase tracking-widest bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-500/10">
                    BPT, MIAP
                  </span>
                  <h3 className="text-3xl font-black text-stone-900 uppercase tracking-tight mt-3">
                    Dr. Garima Sharma
                  </h3>
                  <p className="text-stone-500 font-bold text-sm">
                    Senior Physiotherapist &amp; Clinical Head
                  </p>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed">
                  Dr. Garima Sharma is a highly dedicated and credentialed physical therapy expert. With a strong clinical foundation as a member of the Indian Association of Physiotherapists (IAP), she specializes in diagnosing and treating complex musculoskeletal issues, correcting spinal alignment, and conducting structured rehabilitation programs that deliver long-lasting recovery.
                </p>

                {/* Specialties Bullet Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2.5 text-stone-755">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <CheckCircle className="h-3.5 w-3.5 fill-teal-50" />
                    </div>
                    <span className="text-sm font-semibold">Orthopaedic &amp; Joint Care</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-stone-755">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <CheckCircle className="h-3.5 w-3.5 fill-teal-50" />
                    </div>
                    <span className="text-sm font-semibold">Spine &amp; Posture Correction</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-stone-755">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <CheckCircle className="h-3.5 w-3.5 fill-teal-50" />
                    </div>
                    <span className="text-sm font-semibold">Sports Injury Rehabilitation</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-stone-755">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <CheckCircle className="h-3.5 w-3.5 fill-teal-50" />
                    </div>
                    <span className="text-sm font-semibold">Manual Soft-Tissue Mobilisation</span>
                  </div>
                </div>

                {/* Footer and CTA */}
                <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-stone-500">
                    <Award className="h-5 w-5 text-teal-650" />
                    <span className="text-xs font-semibold">IAP Registered Clinician</span>
                  </div>
                  <Link
                    href="#appointment"
                    className="flex items-center justify-center space-x-1.5 px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-teal-700/20 transition-all duration-300"
                  >
                    <span>Consult Dr. Garima</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Advanced Physiotherapy Clinic Showcase */}
      <section className="py-24 bg-stone-100 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Our Center</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 uppercase mt-2">
              Advanced Clinical Facilities
            </h2>
            <div className="h-1 w-20 bg-teal-600 mx-auto mt-4" />
            <p className="text-stone-500 text-sm leading-relaxed mt-4">
              Equipped with modern orthopedic devices, chiropractic drop-tables, and clean, supportive spaces.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden max-w-5xl mx-auto p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Info & Facility list side */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-teal-50 px-2.5 py-1 rounded-md text-teal-750 text-xs font-bold uppercase mb-3 border border-teal-500/10">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Delhi NCR Flagship Clinic</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-black text-stone-900 uppercase leading-snug">
                    Gayatri Physiotherapy Clinic
                  </h3>
                  <div className="flex items-center space-x-1.5 mt-2">
                    <div className="flex text-amber-500">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                    </div>
                    <span className="text-xs font-bold text-stone-600">5.0 (128 Reviews)</span>
                  </div>
                </div>

                <p className="text-stone-500 text-sm leading-relaxed">
                  Our flagship center is structured to provide an expert rehabilitation environment. Outfitted with diagnostic posture trackers, clinical decompression accessories, and modern therapeutic modalities, we ensure comfortable and recovery-focused care.
                </p>

                {/* Facility Features */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm uppercase">Convenient Scheduling</h4>
                      <p className="text-stone-500 text-xs mt-0.5">Open daily from 8:00 AM to 8:00 PM. Flexible appointment bookings.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm uppercase">Advanced Modalities</h4>
                      <p className="text-stone-500 text-xs mt-0.5">High-frequency electrotherapy, advanced joint traction, and recovery kits.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm uppercase">Accessible Address</h4>
                      <p className="text-stone-500 text-xs mt-0.5">Gayatri Physiotherapy Clinic, 1st Floor, Main Center Metro Complex, Delhi NCR, India.</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center gap-4">
                  <a
                    href="tel:01140846393"
                    className="flex items-center justify-center space-x-1.5 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md hover:shadow-teal-700/20 transition-all duration-300 animate-pulse"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Coordinator</span>
                  </a>
                  <a
                    href="https://wa.me/919821966696?text=Hi%2C%20I%20need%20Physiotherapy%2520Service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1.5 px-6 py-3 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-colors"
                  >
                    <span>Connect on WhatsApp</span>
                  </a>
                </div>

              </div>

              {/* Image side */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute inset-0 bg-teal-700/10 rounded-2xl transform -translate-x-3 translate-y-3 group-hover:-translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-300" />
                <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100 aspect-[4/3] w-full">
                  <img
                    src="/images/hero_clinic.png"
                    alt="Gayatri Clinic Facility"
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-stone-50 overflow-hidden scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 uppercase mt-2">
              Stories of Recovery
            </h2>
            <div className="h-1 w-20 bg-teal-600 mx-auto mt-4" />
            <p className="text-stone-500 text-sm leading-relaxed mt-4">
              Read how Dr. Garima Sharma helped patients overcome severe pain and restore active mobility.
            </p>
          </div>
        </div>

        {/* Marquee Ticker Rows Wrapper */}
        <div className="marquee-container space-y-8 select-none font-sans">
          
          {/* Row 1: Left to Right */}
          <div className="overflow-hidden w-full relative">
            {/* Edge gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee-ltr flex gap-6 py-4">
              {[...TESTIMONIALS_ROW1, ...TESTIMONIALS_ROW1].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[350px] bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between shrink-0 hover:border-teal-500 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="flex text-amber-500 mb-3">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-stone-100">
                    <div className="h-9 w-9 rounded-full bg-teal-50 text-teal-700 font-extrabold flex items-center justify-center text-xs border border-teal-500/10 shrink-0">
                      {item.initials}
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="font-extrabold text-stone-900 text-xs truncate">{item.name}</h4>
                      <p className="text-[9px] font-bold text-teal-650 uppercase tracking-wider mt-0.5 truncate">{item.recovery}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="overflow-hidden w-full relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />
            
            <div className="animate-marquee-rtl flex gap-6 py-4">
              {[...TESTIMONIALS_ROW2, ...TESTIMONIALS_ROW2].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[350px] bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col justify-between shrink-0 hover:border-teal-500 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="flex text-amber-500 mb-3">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500" />
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-stone-100">
                    <div className="h-9 w-9 rounded-full bg-teal-50 text-teal-700 font-extrabold flex items-center justify-center text-xs border border-teal-500/10 shrink-0">
                      {item.initials}
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="font-extrabold text-stone-900 text-xs truncate">{item.name}</h4>
                      <p className="text-[9px] font-bold text-teal-650 uppercase tracking-wider mt-0.5 truncate">{item.recovery}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. What We Treat (Interactive Category Dashboard - No Internal Scrollbars) */}
      <section id="what-we-treat" className="py-24 bg-stone-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Pain Management</span>
            <h2 className="text-4xl font-black text-stone-900 uppercase mt-2">
              What We Treat
            </h2>
            <div className="h-1 w-20 bg-teal-600 mx-auto mt-4" />
            <p className="text-stone-500 text-sm leading-relaxed mt-4 max-w-2xl mx-auto">
              Select a category to view how our clinically guided rehab protocols relieve pain, correct postures, and restore active mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
            {/* Left side selectors: Stack of 4 category tabs */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
              {/* Category 1: Conditions */}
              <button
                onClick={() => setActiveTab('conditions')}
                className={`flex-none snap-start w-[210px] sm:w-[240px] lg:w-full text-left p-3.5 sm:p-4 lg:p-5 rounded-2xl border transition-all duration-300 flex items-center space-x-3 lg:space-x-4 ${
                  activeTab === 'conditions'
                    ? 'bg-white border-teal-600 shadow-lg shadow-teal-700/5 lg:translate-x-1'
                    : 'bg-stone-50/50 border-stone-200 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className={`h-9 w-9 lg:h-11 lg:w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  activeTab === 'conditions' ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  <Stethoscope className="h-4.5 w-4.5 lg:h-5.5 lg:w-5.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-stone-900 text-xs lg:text-sm uppercase truncate">Conditions We Treat</h4>
                  <p className="text-stone-450 text-[10px] lg:text-xs mt-0.5 hidden lg:block truncate">Spine, bone, and joint disorders.</p>
                </div>
              </button>

              {/* Category 2: Symptoms */}
              <button
                onClick={() => setActiveTab('symptoms')}
                className={`flex-none snap-start w-[210px] sm:w-[240px] lg:w-full text-left p-3.5 sm:p-4 lg:p-5 rounded-2xl border transition-all duration-300 flex items-center space-x-3 lg:space-x-4 ${
                  activeTab === 'symptoms'
                    ? 'bg-white border-teal-600 shadow-lg shadow-teal-700/5 lg:translate-x-1'
                    : 'bg-stone-50/50 border-stone-200 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className={`h-9 w-9 lg:h-11 lg:w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  activeTab === 'symptoms' ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  <Activity className="h-4.5 w-4.5 lg:h-5.5 lg:w-5.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-stone-900 text-xs lg:text-sm uppercase truncate">Symptoms We Relieve</h4>
                  <p className="text-stone-450 text-[10px] lg:text-xs mt-0.5 hidden lg:block truncate">Common pain and mobility limit points.</p>
                </div>
              </button>

              {/* Category 3: Therapies */}
              <button
                onClick={() => setActiveTab('therapies')}
                className={`flex-none snap-start w-[210px] sm:w-[240px] lg:w-full text-left p-3.5 sm:p-4 lg:p-5 rounded-2xl border transition-all duration-300 flex items-center space-x-3 lg:space-x-4 ${
                  activeTab === 'therapies'
                    ? 'bg-white border-teal-600 shadow-lg shadow-teal-700/5 lg:translate-x-1'
                    : 'bg-stone-50/50 border-stone-200 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className={`h-9 w-9 lg:h-11 lg:w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  activeTab === 'therapies' ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  <Award className="h-4.5 w-4.5 lg:h-5.5 lg:w-5.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-stone-900 text-xs lg:text-sm uppercase truncate">Therapies Offered</h4>
                  <p className="text-stone-450 text-[10px] lg:text-xs mt-0.5 hidden lg:block truncate">High-end medical recovery modalities.</p>
                </div>
              </button>

              {/* Category 4: Services */}
              <button
                onClick={() => setActiveTab('services')}
                className={`flex-none snap-start w-[210px] sm:w-[240px] lg:w-full text-left p-3.5 sm:p-4 lg:p-5 rounded-2xl border transition-all duration-300 flex items-center space-x-3 lg:space-x-4 ${
                  activeTab === 'services'
                    ? 'bg-white border-teal-600 shadow-lg shadow-teal-700/5 lg:translate-x-1'
                    : 'bg-stone-50/50 border-stone-200 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className={`h-9 w-9 lg:h-11 lg:w-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  activeTab === 'services' ? 'bg-teal-700 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  <UserCheck className="h-4.5 w-4.5 lg:h-5.5 lg:w-5.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-stone-900 text-xs lg:text-sm uppercase truncate">Services Offered</h4>
                  <p className="text-stone-450 text-[10px] lg:text-xs mt-0.5 hidden lg:block truncate">Clinical, home, and post-op care programs.</p>
                </div>
              </button>
            </div>

            {/* Right side Display Panel: Flex wrap grid of badges (No scrollbars) */}
            <div className="lg:col-span-8 w-full bg-white rounded-3xl border border-stone-200 shadow-xl p-5 sm:p-8 lg:p-10 min-h-[320px] sm:min-h-[360px] flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-4 sm:pb-5 mb-6 gap-3">
                  <h3 className="text-base sm:text-lg font-black text-stone-900 uppercase tracking-tight min-w-0">
                    {activeTab === 'conditions' && 'Orthopedic Conditions We Treat'}
                    {activeTab === 'symptoms' && 'Pain & Symptoms We Relieve'}
                    {activeTab === 'therapies' && 'Advanced Therapies We Offer'}
                    {activeTab === 'services' && 'Clinical & Home Rehab Services'}
                  </h3>
                  <span className="self-start sm:self-auto bg-teal-50 border border-teal-500/10 text-teal-750 text-xs font-bold px-3 py-1 rounded-full shrink-0">
                    {activeTab === 'conditions' && `${CONDITIONS.length} Items`}
                    {activeTab === 'symptoms' && `${SYMPTOMS.length} Items`}
                    {activeTab === 'therapies' && `${THERAPIES.length} Items`}
                    {activeTab === 'services' && `${SERVICES.length} Items`}
                  </span>
                </div>

                {/* Tags Board */}
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {activeTab === 'conditions' && CONDITIONS.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center space-x-2 sm:space-x-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-stone-50 border border-stone-200 text-stone-700 hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default group"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-650 text-white group-hover:bg-white group-hover:text-teal-700 transition-colors">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="font-bold text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}

                  {activeTab === 'symptoms' && SYMPTOMS.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center space-x-2 sm:space-x-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-stone-50 border border-stone-200 text-stone-700 hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default group"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-650 text-white group-hover:bg-white group-hover:text-teal-700 transition-colors">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="font-bold text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}

                  {activeTab === 'therapies' && THERAPIES.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center space-x-2 sm:space-x-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-stone-50 border border-stone-200 text-stone-700 hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default group"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-650 text-white group-hover:bg-white group-hover:text-teal-700 transition-colors">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="font-bold text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}

                  {activeTab === 'services' && SERVICES.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center space-x-2 sm:space-x-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-stone-50 border border-stone-200 text-stone-700 hover:bg-teal-700 hover:text-white hover:border-teal-700 transition-all duration-300 transform hover:-translate-y-0.5 cursor-default group"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-650 text-white group-hover:bg-white group-hover:text-teal-700 transition-colors">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="font-bold text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Link */}
              <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-500 text-center sm:text-left">
                  Schedule a precision evaluation session for post-surgery or pain recovery.
                </p>
                <Link
                  href="#appointment"
                  className="w-full sm:w-auto flex items-center justify-center space-x-1.5 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-teal-700/20 transition-all duration-300"
                >
                  <span>Request Assessment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Latest Blogs Section */}
      <section className="py-24 bg-stone-100 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Patient Guide</span>
              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 uppercase mt-2">
                Latest Clinical Blogs
              </h2>
            </div>
            <Link
              href="#appointment"
              className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-sm font-bold text-teal-700 hover:text-teal-900 transition-colors"
            >
              <span>View All Blogs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog 1 */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="shine-effect relative h-52 w-full bg-stone-150">
                  <img
                    src="/images/rehab_session.png"
                    alt="Blog Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Ergonomics</span>
                  <h3 className="text-base font-extrabold text-stone-850 mt-2 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">
                    Why Young Professionals Develop Musculoskeletal Pain Earlier Than Previous Generations
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                    Increasing desk hours, posture slouching, and laptop usage are triggering early spine stiffness in adults aged 22 to 35. Learn key ergonomics fixes.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link href="#appointment" className="text-xs font-bold text-teal-700 group-hover:text-teal-900 transition-colors">
                  Read Article &rarr;
                </Link>
              </div>
            </div>

            {/* Blog 2 */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="shine-effect relative h-52 w-full bg-stone-150">
                  <img
                    src="/images/chiropractic.png"
                    alt="Blog Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Chiropractic</span>
                  <h3 className="text-base font-extrabold text-stone-850 mt-2 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">
                    Understanding Spinal Decompression and Chiropractic adjustments
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                    How non-surgical manual adjustments align vertebra and relieve pressure from pinched nerves. A clinical guide to decompression therapy.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link href="#appointment" className="text-xs font-bold text-teal-700 group-hover:text-teal-900 transition-colors">
                  Read Article &rarr;
                </Link>
              </div>
            </div>

            {/* Blog 3 */}
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="shine-effect relative h-52 w-full bg-stone-150">
                  <img
                    src="/images/sports_injury.png"
                    alt="Blog Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Sports Recovery</span>
                  <h3 className="text-base font-extrabold text-stone-850 mt-2 mb-3 group-hover:text-teal-700 transition-colors line-clamp-2">
                    Stretching vs. Strengthening: What Does Your Ligament Recovery Need?
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                    Most athletes misjudge ligament recovery and over-stretch weak joints. Learn the clinical timeline for tear rehabilitation.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <Link href="#appointment" className="text-xs font-bold text-teal-700 group-hover:text-teal-900 transition-colors">
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section id="faq" className="py-24 bg-stone-50 scroll-reveal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest">Questions</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 uppercase mt-2">
              Frequently Asked FAQs
            </h2>
            <div className="h-1 w-20 bg-teal-600 mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="flex justify-between items-center w-full px-6 py-4.5 text-left font-bold text-stone-800 hover:text-teal-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-teal-700 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-stone-500 leading-relaxed border-t border-stone-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Interactive Appointment booking form */}
      <section id="appointment" className="py-24 bg-stone-900 text-white relative">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_clinic.png"
            alt="Clinic interior"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-stone-950/90" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Get Appointed</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white leading-tight">
                Connect With Our <br />
                Clinical Coordinator
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                Submit your phone number and locality. Our Clinical Coordinator will connect with you to review symptoms, verify insurance, and book your closest expert visit.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">ISO Certified Care</h4>
                    <p className="text-stone-400 text-xs">Standardized sterile clinics.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">AI Progress Audits</h4>
                    <p className="text-stone-400 text-xs">Clinical checks every 3rd session.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                
                {isSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-scale-up">
                    <div className="mx-auto h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-2">
                      <CheckCircle className="h-10 w-10 fill-emerald-500/10" />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-white">Callback Requested!</h3>
                    <p className="text-stone-300 text-sm max-w-md mx-auto">
                      Thank you. Our Clinical Coordinator will call you shortly on the provided number to coordinate your session.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl border border-stone-700 text-stone-300 text-xs font-bold hover:bg-stone-800 hover:text-white transition-colors"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-450 uppercase">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Dr. / Mr. / Ms."
                          className="w-full bg-stone-950/80 border border-stone-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 transition-colors"
                        />
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-450 uppercase">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-stone-950/80 border border-stone-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* City Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-450 uppercase">Select Locality</label>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-stone-950/80 border border-stone-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                        >
                          <option value="Delhi">Delhi NCR</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Gurgaon">Gurgaon</option>
                          <option value="Noida">Noida</option>
                          <option value="Hyderabad">Hyderabad</option>
                          <option value="Jammu">Jammu &amp; Kashmir</option>
                        </select>
                      </div>

                      {/* Speciality Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-450 uppercase">Treatment Needed</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full bg-stone-950/80 border border-stone-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                        >
                          <option value="Orthopedic Physiotherapy">Orthopedic Physiotherapy</option>
                          <option value="Spine Injury Rehab">Spine Injury Rehab</option>
                          <option value="Chiropractic Adjustment">Chiropractic Adjustment</option>
                          <option value="Sports Injury Recovery">Sports Recovery</option>
                          <option value="Geriatric / Pediatric Care">Geriatric / Pediatric Rehab</option>
                        </select>
                      </div>
                    </div>

                    {/* Brief message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-450 uppercase">Brief Ailment Description (Optional)</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Describe your back pain, injury details, or surgery timeline..."
                        className="w-full bg-stone-950/80 border border-stone-800 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-stone-600 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-600/25 active:scale-95 transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center space-x-2">
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          <span>Requesting Coordinator...</span>
                        </span>
                      ) : (
                        <span>Request Free Callback Call</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
