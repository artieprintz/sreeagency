export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  badge?: string;
  features: string[];
  whatsappMessage: string;
}

export const BUSINESS_CONFIG = {
  name: "SREE Agency",
  tagline: "Secure Today, Safe Tomorrow!",
  secondaryTagline: "Complete Security Solutions",
  location: "Pammal, Chennai, Tamil Nadu, India",
  locality: "Pammal",
  city: "Chennai",
  state: "Tamil Nadu",
  country: "India",
  primaryPhone: "9500100061",
  secondaryPhone: "8939450061",
  primaryPhoneFormatted: "+91 95001 00061",
  secondaryPhoneFormatted: "+91 89394 50061",
  whatsappNumber: "919500100061", // International format without '+' for wa.me links
  email: "sreeagencycctv@gmail.com",
  coordinates: {
    lat: 12.9753406,
    lng: 80.1327223,
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/Sree+Agency+CCTV+CAMERA+installation+and+service/@12.9753377,80.13265,17z/data=!4m15!1m8!3m7!1s0x3a525f0569002d97:0x37c956058c7cfa3f!2sSree+Agency+CCTV+CAMERA+installation+and+service!8m2!3d12.9753406!4d80.1327223!10e1!16s%2Fg%2F11nj1llmq6!3m5!1s0x3a525f0569002d97:0x37c956058c7cfa3f!8m2!3d12.9753406!4d80.1327223!16s%2Fg%2F11nj1llmq6",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=12.9753406,80.1327223",
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJly0AadVfUjoRP3p8jAVWyTc",
  serviceArea: "Chennai and surrounding areas",
  businessHoursNote: "Monday - Saturday: 9:00 AM - 8:00 PM (Emergency support available)",
  brandColors: {
    deepNavy: "#031D49",
    darkBlue: "#082D68",
    gold: "#FFC400",
    white: "#FFFFFF",
    lightBg: "#F5F7FA",
    redAccent: "#E21B23",
    darkText: "#14213D",
  },
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "cctv-installation",
    name: "CCTV Camera Installation",
    shortDescription:
      "Professional CCTV solutions for homes, shops, offices, and commercial properties, including suitable HD and IP camera systems.",
    fullDescription:
      "End-to-end security camera system installation for domestic, commercial, and industrial facilities. We evaluate line-of-sight, lighting conditions, and cabling requirements to position HD analog, IP, and dome/bullet cameras for optimal perimeter surveillance.",
    image: "/src/assets/images/service_cctv_installation_1791636382857.jpg",
    features: [
      "HD & 4K IP Camera Systems",
      "Night Vision & Infrared Clarity",
      "DVR/NVR Recording & Storage Setup",
      "Neat Conduit & Cable Management",
    ],
    whatsappMessage:
      "Hello SREE Agency, I would like to enquire about CCTV camera installation. Please share the available options and quotation.",
  },
  {
    id: "wifi-camera-setup",
    name: "Wi-Fi Camera Setup",
    shortDescription:
      "Convenient surveillance with supported mobile live viewing, remote access, and camera configuration.",
    fullDescription:
      "Smart wireless camera setups ideal for apartments, individual residences, and small retail establishments. Includes cloud & local SD card configuration, two-way audio setup, motion alert calibration, and multi-device mobile app linking.",
    image: "/src/assets/images/service_wifi_camera_1791636394226.jpg",
    features: [
      "360° Pan-Tilt-Zoom (PTZ) Wireless Cameras",
      "Instant Smartphone Live Streaming & Alerts",
      "Two-Way Audio Talkback",
      "Simple Plug & Play Integration",
    ],
    whatsappMessage:
      "Hello SREE Agency, I would like to enquire about Wi-Fi camera setup. Please share the available camera models and pricing.",
  },
  {
    id: "gate-automation",
    name: "Gate Automation",
    shortDescription:
      "Sliding and swing gate automation solutions for suitable residential and commercial properties.",
    fullDescription:
      "Modern motorized automated gate solutions designed for residential villas, apartment gates, and factory entrances. Features robust motor drives, safety infrared sensors, remote control fobs, and manual bypass during power outages.",
    image: "/src/assets/images/service_gate_automation_1791636407541.jpg",
    features: [
      "Sliding & Swing Gate Motor Mechanisms",
      "Remote Key Fob & RFID Access",
      "Safety Obstacle Detection Sensors",
      "Heavy-Duty Weather-Resistant Build",
    ],
    whatsappMessage:
      "Hello SREE Agency, I would like to enquire about gate automation systems. Please share suitable options for my property.",
  },
  {
    id: "solar-panel-installation",
    name: "Solar Panel Installation",
    shortDescription:
      "Solar panel installation solutions tailored to property requirements and energy needs.",
    fullDescription:
      "High-efficiency rooftop solar photovoltaic systems for homes and commercial establishments. Tailored sizing, high-grade solar panels, reliable inverters, and clean mounting structures to lower electricity bills.",
    image: "/src/assets/images/service_solar_installation_1791636417432.jpg",
    features: [
      "Rooftop Solar PV Design & Sizing",
      "On-Grid & Hybrid Inverter Solutions",
      "Corrosion-Resistant Mounting Hardware",
      "Long-Term Energy Yield & Monitoring",
    ],
    whatsappMessage:
      "Hello SREE Agency, I would like to enquire about solar panel installation. Please share quotation details based on my property needs.",
  },
  {
    id: "repair-and-maintenance",
    name: "Repair and Maintenance",
    shortDescription:
      "Troubleshooting, maintenance, repairs, servicing, and AMC options for supported security equipment.",
    fullDescription:
      "Comprehensive diagnostic and repair service for malfunctioning cameras, power supplies, video loss, hard drive recording errors, gate motors, and periodic preventative AMC health checks across Chennai.",
    image: "/src/assets/images/about_technician_service_1791636428379.jpg",
    features: [
      "Rapid Fault Diagnosis & Cable Testing",
      "DVR/NVR Hard Drive & Power Supply Repairs",
      "Camera Realignment & Lens Cleaning",
      "Annual Maintenance Contract (AMC) Plans",
    ],
    whatsappMessage:
      "Hello SREE Agency, I need repair or maintenance service for my existing security equipment. Please contact me.",
  },
];

export const BRANDS_DATA = [
  {
    name: "Hikvision",
    tagline: "Leading Video Surveillance Equipment",
    description: "Industry-standard IP cameras, ColorVu technology, and NVR surveillance recorders.",
  },
  {
    name: "CP Plus",
    tagline: "India's Trusted Security Brand",
    description: "Comprehensive analog HD cameras, Wi-Fi security devices, and digital recording solutions.",
  },
  {
    name: "Dahua Technology",
    tagline: "Advanced Smart Security Systems",
    description: "AI-enhanced surveillance cameras, perimeter detection, and smart storage units.",
  },
  {
    name: "Hi-Focus",
    tagline: "High Resolution Monitoring Systems",
    description: "Robust electronic surveillance, PTZ optical cameras, and enterprise CCTV solutions.",
  },
];

export const WHY_CHOOSE_US_DATA = [
  {
    title: "Quality Products",
    description: "We configure certified high-definition cameras, robust gate motors, and durable solar modules from reputed manufacturers.",
    iconName: "ShieldCheck",
  },
  {
    title: "Expert Technicians",
    description: "Our installation specialists ensure clean wiring, optimal camera angles, and proper system testing on every project.",
    iconName: "Wrench",
  },
  {
    title: "Trusted Service",
    description: "Prompt local support across Pammal and Chennai with genuine commitment to your premises' safety.",
    iconName: "Award",
  },
  {
    title: "Affordable Pricing",
    description: "Transparent quotes with no hidden charges, tailored to match your specific property size and budget.",
    iconName: "BadgePercent",
  },
  {
    title: "Fast & Reliable Support",
    description: "Quick turnaround for urgent repairs, configuration adjustments, and maintenance requests.",
    iconName: "Clock",
  },
  {
    title: "Customized Solutions",
    description: "Property-specific evaluations for residences, commercial shops, educational institutions, and warehouses.",
    iconName: "Sliders",
  },
];

export const PROCESS_STEPS_DATA = [
  {
    step: "01",
    title: "Contact Us",
    description: "Tell us about your security requirements through a phone call, WhatsApp, or our quick callback form.",
  },
  {
    step: "02",
    title: "Discuss Your Needs",
    description: "We understand your property layout, identify key surveillance angles, and recommend suitable equipment.",
  },
  {
    step: "03",
    title: "Installation",
    description: "Our technicians arrange prompt installation, clean conduit wiring, and mobile app configuration.",
  },
  {
    step: "04",
    title: "Ongoing Support",
    description: "Reach our local Pammal team whenever you need periodic maintenance, troubleshooting, or system upgrades.",
  },
];

export function buildWhatsAppUrl(message?: string): string {
  const text = message || "Hello SREE Agency, I would like to enquire about your security and CCTV services.";
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function buildTelUrl(phoneNumber: string): string {
  return `tel:+91${phoneNumber.replace(/\D/g, "")}`;
}

export interface VerifiedGoogleReview {
  authorName: string;
  badge?: string;
  rating: number;
  relativeTime: string;
  text: string;
  avatarInitial: string;
  avatarBg?: string;
  highlightText?: string;
}

export const VERIFIED_GOOGLE_REVIEWS: VerifiedGoogleReview[] = [
  {
    authorName: "Sunil Dharan",
    badge: "Local Guide · 10 reviews · 12 photos",
    rating: 5,
    relativeTime: "5 months ago",
    text: "We recently installed a new CCTV camera system for our quarry through Sree Agency, Pammal, and we are very satisfied with their service.\n\nThe team completed the entire installation in a very neat and professional manner. Their wiring work was clean, well-organized, and properly planned for long-term usage in our quarry environment. They used good quality branded cameras and explained all the features clearly, including mobile live view and playback options.\n\nThe technicians arrived on time, completed the work without delay, and ensured every camera angle was perfectly covered for maximum security and monitoring. Their service was friendly, professional, and reasonably priced.\n\nWe truly appreciate the dedication and support provided by Sree Agency. We highly recommend them for CCTV camera installation, WiFi cameras, gate automation, and security solutions.\n\n⭐⭐⭐⭐⭐\nExcellent workmanship, reliable service, and professional support!",
    avatarInitial: "S",
    avatarBg: "#0F766E",
    highlightText: "Excellent workmanship, reliable service, and professional support!",
  },
  {
    authorName: "Manish Kaushik",
    badge: "4 reviews · 2 photos",
    rating: 5,
    relativeTime: "2 months ago",
    text: "Had Sree Agency (Aravind & Kavi) install CCTV for our apartment.\n\nFrom planning to execution, everything was neat, clean, and on time.\nNo mess, no shortcuts. Felt more professional than the big brands.\n\nGreat work, great attitude. Highly recommended!",
    avatarInitial: "M",
    avatarBg: "#B45309",
    highlightText: "Felt more professional than the big brands. Great work, great attitude.",
  },
  {
    authorName: "Saravanan Sri",
    badge: "Local Guide · 11 reviews · 13 photos",
    rating: 5,
    relativeTime: "4 months ago",
    text: "Great service and professional installation. Good camera quality, reasonable pricing, and excellent customer support. Highly recommended.",
    avatarInitial: "S",
    avatarBg: "#1D4ED8",
    highlightText: "Good camera quality, reasonable pricing, and excellent customer support.",
  },
  {
    authorName: "Ruby Freya",
    badge: "Local Guide · 15 reviews",
    rating: 5,
    relativeTime: "4 months ago",
    text: "I am very satisfied with the CCTV installation service. The pricing was affordable, and the work was done very neatly and professionally. The team completed everything on time and explained the system clearly. Overall, a good experience, and I would definitely recommend the service to others.",
    avatarInitial: "R",
    avatarBg: "#BE185D",
    highlightText: "Affordable pricing, neat and professional work, completed on time.",
  },
  {
    authorName: "Rec Bringhtim",
    badge: "1 review",
    rating: 5,
    relativeTime: "4 months ago",
    text: "“I recently installed a Hikvision 8 Channel CCTV Camera System with Night Vision and Mic through Sree Agency. The video clarity is excellent both day and night, and the audio recording feature works perfectly. The installation was done professionally with clean wiring and proper setup. The team explained mobile viewing and playback clearly. Very satisfied with the service, pricing, and support provided by Sree Agency. Highly recommended for CCTV and security solutions.”",
    avatarInitial: "R",
    avatarBg: "#4338CA",
    highlightText: "Hikvision 8 Channel with Night Vision & Mic. Excellent video clarity both day and night.",
  },
];
