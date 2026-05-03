


import { useEffect, useRef, useState, } from "react";

// ── CONSTANTS ──
const WA_NUMBER = "9779846613962";
const WA_MSG = encodeURIComponent("Hello, is this Dr. Sushil ?");
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

// ── SMOOTH SCROLL ──
function goTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── DATA ──
const SERVICES = [
  { icon: "🦷", name: "Dental Implants", subtitle: "Permanent Tooth Replacement", desc: "Dental implants are titanium posts surgically placed into the jawbone, acting as artificial tooth roots. They provide a permanent, stable base for crowns, bridges, or dentures — restoring full chewing function and a natural-looking smile. With proper care, implants can last a lifetime.", features: ["Single Tooth Implant", "Full Arch Implants", "Implant-Supported Bridges", "Same-Day Consultations", "3D Treatment Planning"] },
  { icon: "🔧", name: "Orthodontics", subtitle: "Smile Alignment & Correction", desc: "Our orthodontic treatments correct misaligned teeth and improper bites using advanced braces and clear aligners. Straightening your teeth not only transforms your appearance but also improves oral hygiene, chewing function, and prevents long-term dental problems.", features: ["Metal Braces", "Clear Aligners", "Retainers", "Bite Correction", "Invisalign-Style Aligners"] },
  { icon: "👑", name: "Dental Crowns & Bridges", subtitle: "Restoration & Replacement", desc: "Crowns are tooth-shaped caps that restore damaged, weakened, or misshapen teeth to their original form. Bridges replace one or more missing teeth by anchoring to surrounding teeth, restoring your bite symmetry and smile aesthetics.", features: ["Porcelain Crowns", "Zirconia Crowns", "Fixed Bridges", "Implant Crowns", "Same-Day Impressions"] },
  { icon: "🩺", name: "Root Canal Treatment", subtitle: "Infection Relief & Tooth Preservation", desc: "Root canal treatment removes infected or damaged pulp from inside a tooth, eliminating pain and saving the tooth from extraction. Modern techniques and effective anesthetics make the procedure comfortable — most patients report it feels no worse than a routine filling.", features: ["Single-Visit RCT", "Microscopic Precision", "Post & Core Buildup", "Crown Placement", "Painless Technique"] },
  { icon: "✨", name: "Teeth Whitening", subtitle: "Professional Cosmetic Brightening", desc: "Achieve a noticeably brighter smile with our professional teeth whitening treatments. We use clinically proven whitening agents that can lighten teeth by several shades in a single session — far more effective and safer than over-the-counter alternatives.", features: ["In-Office Bleaching", "Custom Take-Home Trays", "Stain Removal", "Shade Assessment", "Long-Lasting Results"] },
  { icon: "🪥", name: "Scaling & Cleaning", subtitle: "Preventive Oral Hygiene", desc: "Professional scaling removes hardened plaque (tartar) and calculus buildup that brushing alone cannot eliminate. Regular cleaning sessions prevent gum disease, reduce bad breath, and form the foundation of good long-term oral health.", features: ["Ultrasonic Scaling", "Polish & Buff", "Gum Health Assessment", "Bad Breath Treatment", "Fluoride Application"] },
  { icon: "🎨", name: "Cosmetic Dentistry", subtitle: "Smile Design & Aesthetics", desc: "Transform your smile with our comprehensive cosmetic dentistry services. From dental veneers that reshape and recolor your teeth, to bonding that corrects minor chips and gaps — we artistically craft the confident smile you deserve.", features: ["Porcelain Veneers", "Dental Bonding", "Smile Makeover", "Gum Contouring", "Digital Smile Design"] },
  { icon: "🧒", name: "Pediatric Dentistry", subtitle: "Gentle Care for Young Smiles", desc: "We provide a warm, child-friendly environment to ensure positive dental experiences for young patients. Early dental care builds lifelong healthy habits, and our gentle approach helps children feel safe and comfortable during every visit.", features: ["Milk Tooth Treatments", "Fluoride Therapy", "Dental Sealants", "Space Maintainers", "Habit-Breaking Appliances"] },
  { icon: "🏗️", name: "Dentures", subtitle: "Full & Partial Tooth Replacement", desc: "Modern dentures restore the ability to eat, speak, and smile naturally when multiple teeth are lost. Our full and partial dentures are precisely fitted for comfort and aesthetics, and implant-supported options provide the most secure, natural-feeling result.", features: ["Full Dentures", "Partial Dentures", "Implant-Supported", "Flexible Dentures", "Precision Fitting"] },
  { icon: "🔍", name: "Dental X-rays & Diagnostics", subtitle: "Advanced Imaging & Assessment", desc: "Accurate diagnosis is the foundation of great dental treatment. We use modern digital X-ray systems and thorough clinical examinations to detect cavities, bone loss, impacted teeth, and other issues early — enabling faster, more effective treatment.", features: ["Digital X-rays", "OPG Panoramic X-ray", "Cavity Detection", "Bone Assessment", "Comprehensive Exam"] },
  { icon: "💊", name: "Tooth Extraction", subtitle: "Safe & Gentle Removal", desc: "When a tooth is severely decayed, infected, or impacted, extraction may be the best solution. We perform extractions — including wisdom tooth removal — with precision and care, using effective anesthesia to ensure you remain completely comfortable.", features: ["Simple Extraction", "Wisdom Tooth Removal", "Surgical Extraction", "Post-Op Care", "Replacement Planning"] },
  { icon: "🛡️", name: "Gum Treatment", subtitle: "Periodontal Health & Therapy", desc: "Healthy gums are the foundation of a healthy smile. We diagnose and treat gum disease at every stage — from gingivitis to advanced periodontitis — using deep cleaning, curettage, and other evidence-based periodontal therapies.", features: ["Deep Cleaning (SRP)", "Gum Curettage", "Periodontal Surgery", "Gum Grafting", "Maintenance Program"] },
];



const TEAM = [
  { initials: "SP", img: "/team-0.jpeg", name: "Dr. Sushil Pokharel", role: "Prosthodontist", bio: "Dr. Sushil Pokharel is a highly qualified Prosthodontist with specialized expertise in the restoration and replacement of teeth. He brings advanced clinical skills in dental implants, crowns, bridges, and full-mouth rehabilitation. His precision-focused approach and artistic sensibility help patients achieve both functional and aesthetically outstanding results. Dr. Pokharel is dedicated to providing the highest standard of care in a calm, reassuring environment.", tags: ["Dental Implants", "Prosthodontics", "Full-Mouth Rehab", "Crowns & Bridges", "Smile Design", "Dentures"] },
  { initials: "KP", img: "/team-1.jpeg", name: "Dr. Kajal Parajuli", role: "BDS, General Dentist", bio: "Dr. Kajal Parajuli holds a Bachelor of Dental Surgery (BDS) and specializes in general and preventive dentistry. With a gentle chairside manner and meticulous attention to detail, she excels in routine checkups, root canal treatments and tooth extractions. Dr. Parajuli is especially known for creating a comfortable, anxiety-free experience for patients of all ages.", tags: ["General Dentistry", "Root Canal", "Orthodontics", "Pediatric Care", "Scaling & Cleaning", "Tooth Extraction"] },
  { initials: "AN", img: "/team-2.jpeg", name: "Sushmita B.K(Dental Nurse)", role: "Senior Dental Nurse", bio: "Sushmita is our experienced Senior Dental Nurse with over 5 years of dedicated practice at Doctor Tooth. She assists our doctors with clinical procedures, ensures all instruments meet our strict sterilization standards, and is the familiar, reassuring face that greets every patient. Her warmth and professionalism set the tone for the entire clinic experience.", tags: ["Patient Care", "Clinical Assistance", "Sterilization Protocols", "Dental Radiology", "First Aid"] },
  { initials: "RP", img: "/team-3.jpeg", name: "Binita Magar (Receptionist)", role: "Clinic Coordinator", bio: "Binita is the organizational backbone of Doctor Tooth Dental Care. As our dedicated Clinic Coordinator, she manages appointments, handles patient inquiries, and ensures the clinic runs smoothly from opening to closing. Her friendly and professional demeanor makes every patient feel welcomed from the moment they walk through our doors.", tags: ["Appointment Management", "Patient Relations", "Insurance Assistance", "Billing & Records", "Queue Management"] },
];

const GALLERY = [
  { case: "Case 01"},
  { case: "Case 02" },
  { case: "Case 03" },
  { case: "Case 04" },
  { case: "Case 05" },
  { case: "Case 06" },
  { case: "Case 07" },
  { case: "Case 08" },
];

const GAL_COLORS = [
  ["#f0e0d0", "#d4b89a"], ["#e8e0d8", "#c8b8a8"],
  ["#dde8e0", "#b8d0c0"], ["#e8dce0", "#d0b8c0"],
  ["#e4e0d8", "#c4bca8"], ["#f0e8d8", "#d8c4a8"],
  ["#e0e8f0", "#b8c8d8"], ["#ece0d8", "#d0b8a8"],
];

const WHY_ITEMS = [
  { n: "01", icon: "🏆", title: "Expert Specialists", text: "Led by Dr. Sushil Pokharel, a qualified Prosthodontist, and Dr. Kajal Parajuli (BDS) — our team brings specialized expertise to every procedure." },
  { n: "02", icon: "🔬", title: "Advanced Technology", text: "We invest in the latest dental technology and sterilization protocols, ensuring precise treatments and your complete safety at every visit." },
  { n: "03", icon: "🤝", title: "Personalized Care", text: "Every patient receives a customized treatment plan. We listen carefully, explain thoroughly, and make sure you're comfortable at every step." },
  { n: "04", icon: "✨", title: "Aesthetic Excellence", text: "We blend clinical precision with artistic skill — crafting smiles that are not just healthy, but truly beautiful and natural-looking." },
  { n: "05", icon: "💉", title: "Painless Procedures", text: "We use the most effective modern anesthetics and gentle techniques so that even complex treatments can be performed with minimal discomfort." },
  { n: "06", icon: "📍", title: "Prime Location", text: "Conveniently located at Big Bazar, Second Floor, Mahendrapool — right in the heart of Pokhara, easily accessible from anywhere in the city." },
];

// ── GLOBAL CSS ──
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; background: #FFFFFF; color: #1A1714; overflow-x: hidden; }

:root {
  --orange: #E8650A; --orange-light: #F5873A; --orange-dark: #C4510A;
  --orange-pale: #FFF3EA; --white: #FFFFFF; --off-white: #FAFAF8;
  --cream: #FDF6EE; --charcoal: #1A1714; --mid: #4A3F35; --muted: #8A7A6E;
  --border: rgba(232,101,10,0.15);
  --shadow: 0 20px 60px rgba(26,23,20,0.12);
  --shadow-orange: 0 8px 32px rgba(232,101,10,0.25);
}

/* CURSOR */
.cursor-dot { width:8px;height:8px;background:var(--orange);border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform 0.1s; }
.cursor-ring { width:36px;height:36px;border:1.5px solid var(--orange);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:transform 0.15s ease,width 0.3s,height 0.3s,opacity 0.3s;opacity:0.5; }

/* NAVBAR */
nav { position:fixed;top:0;left:0;right:0;z-index:1000;padding:0 5%;display:flex;align-items:center;justify-content:space-between;height:72px;background:rgba(255,255,255,0.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);transition:all 0.4s ease; }
nav.scrolled { height:60px;box-shadow:0 4px 30px rgba(26,23,20,0.08); }
.nav-logo { display:flex;align-items:center;gap:10px;text-decoration:none;cursor:pointer; }
.nav-logo-icon { width:38px;height:38px;background:linear-gradient(135deg,var(--orange),var(--orange-dark));border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 4px 12px rgba(232,101,10,0.3); }
.nav-logo-text { display:flex;flex-direction:column;line-height:1; }
.nav-logo-text span:first-child { font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;color:var(--charcoal);letter-spacing:0.02em; }
.nav-logo-text span:last-child { font-size:10px;color:var(--orange);letter-spacing:0.15em;text-transform:uppercase;font-weight:500; }
.nav-links { display:flex;align-items:center;gap:2px;list-style:none; }
.nav-links a { text-decoration:none;padding:8px 16px;font-size:13.5px;font-weight:500;color:var(--mid);letter-spacing:0.03em;border-radius:8px;transition:all 0.25s;position:relative;cursor:pointer; }
.nav-links a::after { content:'';position:absolute;bottom:4px;left:50%;right:50%;height:2px;background:var(--orange);border-radius:2px;transition:all 0.3s ease; }
.nav-links a:hover { color:var(--orange);background:var(--orange-pale); }
.nav-links a:hover::after { left:16px;right:16px; }
.nav-cta { background:var(--orange)!important;color:white!important;border-radius:10px!important;padding:10px 22px!important;box-shadow:0 4px 16px rgba(232,101,10,0.3);transition:all 0.3s!important; }
.nav-cta:hover { background:var(--orange-dark)!important;transform:translateY(-1px);box-shadow:0 6px 20px rgba(232,101,10,0.4)!important; }
.nav-cta::after { display:none!important; }

/* HERO */
#home { min-height:100vh;padding-top:72px;position:relative;overflow:hidden;background:linear-gradient(160deg,var(--cream) 0%,var(--off-white) 60%,var(--orange-pale) 100%); }
.hero-bg-circle { position:absolute;border-radius:50%;background:radial-gradient(circle,rgba(232,101,10,0.08) 0%,transparent 70%);pointer-events:none; }
.hero-bg-circle.c1 { width:800px;height:800px;top:-200px;right:-200px; }
.hero-bg-circle.c2 { width:400px;height:400px;bottom:100px;left:-100px; }
.hero-inner { max-width:1200px;margin:0 auto;padding:80px 5% 60px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;min-height:calc(100vh - 72px); }
.hero-text { position:relative;z-index:2; }
.hero-badge { display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:100px;background:var(--orange-pale);border:1px solid rgba(232,101,10,0.25);font-size:12px;font-weight:600;color:var(--orange);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:28px;animation:fadeSlideUp 0.7s ease both; }
.hero-badge::before { content:'●';font-size:8px;animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
@keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)} }
.hero-title { font-family:'Cormorant Garamond',serif;font-size:clamp(40px,5vw,68px);font-weight:600;line-height:1.1;color:var(--charcoal);margin-bottom:24px;animation:fadeSlideUp 0.7s 0.15s ease both; }
.hero-title em { font-style:normal;color:var(--orange); }
.hero-desc { font-size:16px;color:var(--mid);line-height:1.7;max-width:440px;margin-bottom:40px;animation:fadeSlideUp 0.7s 0.25s ease both; }
.hero-actions { display:flex;gap:14px;flex-wrap:wrap;animation:fadeSlideUp 0.7s 0.35s ease both; }
.btn-primary { padding:14px 32px;background:linear-gradient(135deg,var(--orange),var(--orange-dark));color:white;border:none;border-radius:12px;font-size:14px;font-weight:600;letter-spacing:0.05em;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;box-shadow:0 6px 24px rgba(232,101,10,0.35);transition:all 0.3s ease; }
.btn-primary:hover { transform:translateY(-2px);box-shadow:0 10px 32px rgba(232,101,10,0.45); }
.btn-outline { padding:14px 32px;background:transparent;color:var(--charcoal);border:1.5px solid rgba(26,23,20,0.2);border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all 0.3s ease; }
.btn-outline:hover { border-color:var(--orange);color:var(--orange);background:var(--orange-pale); }
.hero-stats { display:flex;gap:32px;margin-top:48px;animation:fadeSlideUp 0.7s 0.45s ease both; }
.stat { display:flex;flex-direction:column; }
.stat-num { font-family:'Cormorant Garamond',serif;font-size:34px;font-weight:700;color:var(--orange);line-height:1; }
.stat-label { font-size:12px;color:var(--muted);margin-top:4px;font-weight:500; }
.hero-image-wrap { position:relative;z-index:2;animation:fadeSlideUp 0.9s 0.2s ease both; }
.hero-image-card { width:100%;aspect-ratio:4/5;background:linear-gradient(135deg,#f0e8e0 0%,#e8d5c0 100%);border-radius:24px;overflow:hidden;box-shadow:var(--shadow);position:relative; }
.hero-image-placeholder { width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted);gap:12px; }
.hero-image-placeholder svg { opacity:0.3; }
.hero-image-placeholder p { font-size:13px;opacity:0.5;letter-spacing:0.05em; }
.hero-float-card { position:absolute;bottom:-20px;left:-30px;background:white;border-radius:16px;padding:16px 20px;box-shadow:0 16px 48px rgba(26,23,20,0.12);display:flex;align-items:center;gap:14px;min-width:200px;animation:float 4s ease-in-out infinite; }
@keyframes float { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }
.hero-float-icon { width:44px;height:44px;background:var(--orange-pale);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px; }
.hero-float-text strong { display:block;font-size:14px;color:var(--charcoal); }
.hero-float-text span { font-size:12px;color:var(--muted); }
.hero-float-card2 { position:absolute;top:30px;right:-20px;background:var(--orange);border-radius:16px;padding:14px 18px;color:white;box-shadow:0 10px 32px rgba(232,101,10,0.4);animation:float 4s 2s ease-in-out infinite; }
.hero-float-card2 strong { display:block;font-size:22px;font-weight:700;font-family:'Cormorant Garamond',serif; }
.hero-float-card2 span { font-size:11px;opacity:0.85;letter-spacing:0.05em; }

/* SECTIONS */
section { padding:100px 5%; }
.section-inner { max-width:1200px;margin:0 auto; }
.section-label { font-size:11px;font-weight:700;color:var(--orange);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:12px;display:flex;align-items:center;gap:10px; }
.section-label::before { content:'';width:24px;height:2px;background:var(--orange);border-radius:2px; }
.section-title { font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,52px);font-weight:600;color:var(--charcoal);line-height:1.15;margin-bottom:16px; }
.section-desc { font-size:16px;color:var(--mid);line-height:1.7;max-width:540px; }

/* SERVICES */
#services { background:var(--off-white); }
.services-header { margin-bottom:60px; }
.services-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px; }
.service-card { background:white;border-radius:20px;padding:32px 28px;cursor:pointer;border:1px solid var(--border);transition:all 0.35s cubic-bezier(0.23,1,0.32,1);position:relative;overflow:hidden; }
.service-card::before { content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--orange-pale) 0%,transparent 60%);opacity:0;transition:opacity 0.35s; }
.service-card:hover { transform:translateY(-6px);box-shadow:var(--shadow-orange);border-color:rgba(232,101,10,0.3); }
.service-card:hover::before { opacity:1; }
.service-icon { width:56px;height:56px;background:var(--orange-pale);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px;transition:transform 0.3s; }
.service-card:hover .service-icon { transform:scale(1.1) rotate(-5deg); }
.service-name { font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:var(--charcoal);margin-bottom:10px; }
.service-brief { font-size:14px;color:var(--muted);line-height:1.6; }
.service-arrow { position:absolute;bottom:24px;right:24px;width:32px;height:32px;background:var(--orange-pale);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--orange);transform:translateX(-4px);opacity:0;transition:all 0.3s; }
.service-card:hover .service-arrow { opacity:1;transform:translateX(0); }

/* SERVICE POPUP */
.popup-overlay { position:fixed;inset:0;z-index:2000;background:rgba(26,23,20,0.6);backdrop-filter:blur(6px);display:flex;align-items:flex-end;opacity:0;pointer-events:none;transition:opacity 0.35s ease; }
.popup-overlay.active { opacity:1;pointer-events:all; }
.popup-panel { width:100%;max-height:55vh;background:white;border-radius:28px 28px 0 0;padding:40px 5%;transform:translateY(100%);transition:transform 0.45s cubic-bezier(0.23,1,0.32,1);overflow-y:auto;position:relative; }
.popup-overlay.active .popup-panel { transform:translateY(0); }
.popup-handle { width:40px;height:4px;background:#e0d8d0;border-radius:2px;margin:-16px auto 28px; }
.popup-inner { max-width:800px;margin:0 auto; }
.popup-head { display:flex;align-items:center;gap:20px;margin-bottom:24px; }
.popup-icon { width:64px;height:64px;background:var(--orange-pale);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0; }
.popup-title { font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;color:var(--charcoal); }
.popup-subtitle { font-size:13px;color:var(--orange);font-weight:600;letter-spacing:0.08em; }
.popup-body { font-size:15px;color:var(--mid);line-height:1.8; }
.popup-features { display:flex;flex-wrap:wrap;gap:10px;margin-top:20px; }
.popup-tag { padding:6px 14px;background:var(--orange-pale);color:var(--orange);border-radius:100px;font-size:12.5px;font-weight:600; }
.popup-close { position:absolute;top:20px;right:5%;width:40px;height:40px;border-radius:50%;background:var(--off-white);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--mid);transition:all 0.2s; }
.popup-close:hover { background:var(--orange-pale);color:var(--orange); }

/* WHY US */
#why-us { background:linear-gradient(160deg,var(--charcoal) 0%,#2d2420 100%);color:white;position:relative;overflow:hidden; }
#why-us::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 80% 50%,rgba(232,101,10,0.12) 0%,transparent 60%); }
#why-us .section-title { color:white; }
#why-us .section-desc { color:rgba(255,255,255,0.6); }
.why-grid { display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:60px; }
.why-item { padding:36px;border:1px solid rgba(255,255,255,0.06);position:relative;overflow:hidden;transition:all 0.3s; }
.why-item:hover { background:rgba(232,101,10,0.06); }
.why-num { font-family:'Cormorant Garamond',serif;font-size:56px;font-weight:700;color:rgba(232,101,10,0.18);line-height:1;position:absolute;top:20px;right:28px; }
.why-icon { font-size:32px;margin-bottom:16px; }
.why-title { font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:white;margin-bottom:10px; }
.why-text { font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7; }



/* TEAM */
#team { background:var(--white); }
.team-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:28px;margin-top:60px; }
.team-card { border-radius:20px;overflow:hidden;border:1px solid var(--border);cursor:pointer;transition:all 0.35s cubic-bezier(0.23,1,0.32,1);background:white; }
.team-card:hover { transform:translateY(-8px);box-shadow:var(--shadow-orange); }
.team-photo { width:100%;aspect-ratio:3/4;background:linear-gradient(135deg,#f5ede4 0%,#e8d4c0 100%);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:72px;font-weight:300;color:var(--orange);position:relative;overflow:hidden; }
.team-photo::after { content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 50%,rgba(26,23,20,0.6));opacity:0;transition:opacity 0.35s; }
.team-card:hover .team-photo::after { opacity:1; }
.team-view-btn { position:absolute;bottom:20px;left:50%;transform:translateX(-50%) translateY(10px);background:white;color:var(--orange);border:none;padding:8px 20px;border-radius:20px;font-size:12px;font-weight:600;opacity:0;z-index:2;transition:all 0.35s;white-space:nowrap;pointer-events:none; }
.team-card:hover .team-view-btn { opacity:1;transform:translateX(-50%) translateY(0); }
.team-info { padding:20px 22px; }
.team-name { font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:var(--charcoal); }
.team-role { font-size:12px;color:var(--orange);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-top:4px; }

/* TEAM POPUP */
.team-popup-overlay { position:fixed;inset:0;z-index:2000;background:rgba(26,23,20,0.7);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:5%;opacity:0;pointer-events:none;transition:opacity 0.3s ease; }
.team-popup-overlay.active { opacity:1;pointer-events:all; }
.team-popup-card { background:white;border-radius:28px;max-width:580px;width:100%;overflow:hidden;transform:scale(0.9) translateY(20px);transition:transform 0.4s cubic-bezier(0.23,1,0.32,1);box-shadow:0 32px 80px rgba(26,23,20,0.25); }
.team-popup-overlay.active .team-popup-card { transform:scale(1) translateY(0); }
.team-popup-header { background:linear-gradient(135deg,var(--charcoal),#2d2420);padding:40px;display:flex;gap:24px;align-items:center;position:relative; }
.team-popup-avatar { width:90px;height:90px;border-radius:20px;background:var(--orange-pale);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:44px;color:var(--orange);flex-shrink:0;border:3px solid rgba(232,101,10,0.3); }
.team-popup-name { font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;color:white; }
.team-popup-role { color:var(--orange-light);font-size:13px;font-weight:600;letter-spacing:0.08em;margin-top:4px; }
.team-popup-body { padding:36px 40px; }
.team-popup-bio { font-size:15px;color:var(--mid);line-height:1.8;margin-bottom:24px; }
.team-popup-tags { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px; }
.team-popup-tag { padding:6px 14px;background:var(--orange-pale);color:var(--orange);border-radius:100px;font-size:12px;font-weight:600; }
.team-popup-close { position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.1);border:none;color:white;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s; }
.team-popup-close:hover { background:rgba(255,255,255,0.2); }

/* GALLERY */
#gallery { background:var(--off-white); }
.gallery-wrap { margin-top:60px;position:relative; }
.gallery-slider { overflow:hidden;border-radius:20px; }
.gallery-track { display:flex;transition:transform 0.6s cubic-bezier(0.23,1,0.32,1); }
.gallery-slide { flex-shrink:0;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:3px; }
.gallery-img { aspect-ratio:4/3;overflow:hidden;position:relative; }
.gallery-img:first-child { border-radius:18px 0 0 18px; }
.gallery-img:last-child { border-radius:0 18px 18px 0; }
.gallery-label { position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(26,23,20,0.75) 0%,transparent);padding:28px 20px 16px;color:white;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase; }
.gallery-badge { position:absolute;top:14px;left:14px;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase; }
.gallery-badge.before { background:rgba(26,23,20,0.6);color:white; }
.gallery-badge.after { background:var(--orange);color:white; }
.gallery-placeholder { width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted);gap:8px;font-size:13px; }
.gallery-nav-row { display:flex;align-items:center;justify-content:center;gap:16px;margin-top:28px; }
.gallery-btn { width:44px;height:44px;border-radius:50%;background:white;border:1.5px solid var(--border);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--mid);transition:all 0.25s; }
.gallery-btn:hover { background:var(--orange);color:white;border-color:var(--orange); }
.gallery-dots { display:flex;gap:8px; }
.gdot { width:10px;height:10px;border-radius:50%;background:rgba(232,101,10,0.2);cursor:pointer;transition:all 0.3s;border:none;padding:0; }
.gdot.active { background:var(--orange);transform:scale(1.2); }

/* CONTACT */
#contact { background:var(--cream); }
.contact-grid { display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-top:60px; }
.contact-item { display:flex;gap:18px;margin-bottom:32px;align-items:flex-start; }
.contact-icon { width:52px;height:52px;border-radius:14px;background:var(--orange-pale);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid rgba(232,101,10,0.2); }
.contact-label { font-size:11px;color:var(--orange);font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px; }
.contact-value { font-size:16px;color:var(--charcoal);font-weight:500; }
.contact-map { width:100%;height:100%;min-height:320px;border-radius:20px;overflow:hidden;border:1px solid var(--border);box-shadow:var(--shadow); }
.contact-map iframe { width:100%;height:100%;border:none;min-height:320px; }

/* FOOTER */
footer { background:var(--charcoal);color:white;padding:60px 5% 32px; }
.footer-inner { max-width:1200px;margin:0 auto; }
.footer-top { display:grid;grid-template-columns:2fr 1fr 1fr;gap:60px;margin-bottom:48px; }
.footer-brand-name { font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;margin-bottom:12px; }
.footer-brand-name span { color:var(--orange); }
.footer-tagline { font-size:14px;color:rgba(255,255,255,0.5);line-height:1.6;max-width:280px;margin-bottom:24px; }
.footer-socials { display:flex;gap:10px; }
.social-btn { width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;transition:all 0.25s;color:white;text-decoration:none; }
.social-btn:hover { background:var(--orange);border-color:var(--orange); }
.footer-col h4 { font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:18px; }
.footer-col ul { list-style:none; }
.footer-col ul li { margin-bottom:10px; }
.footer-col ul li a { color:rgba(255,255,255,0.65);text-decoration:none;font-size:14px;transition:color 0.2s;cursor:pointer; }
.footer-col ul li a:hover { color:var(--orange); }
.footer-divider { border:none;border-top:1px solid rgba(255,255,255,0.07);margin-bottom:24px; }
.footer-bottom { display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px; }
.footer-copy { font-size:13px;color:rgba(255,255,255,0.35); }
.footer-copy span { color:var(--orange); }
.floating-facebook {
  position: fixed;
  bottom: 90px;   /* adjust position above WhatsApp if you have it */
  left: 20px;
  width: 55px;
  height: 55px;
  background: #1877F2; /* Facebook blue */
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  text-decoration: none;
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
  z-index: 9999;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* hover effect */
.floating-facebook:hover {
  transform: scale(1.15);
  box-shadow: 0 10px 25px rgba(0,0,0,0.35);
}

/* WHATSAPP FAB */
.wa-fab { position:fixed;bottom:28px;right:28px;z-index:9990;width:58px;height:58px;border-radius:50%;background:#25D366;box-shadow:0 6px 24px rgba(37,211,102,0.45);display:flex;align-items:center;justify-content:center;text-decoration:none;transition:transform 0.2s,box-shadow 0.2s; }
.wa-fab:hover { transform:scale(1.1);box-shadow:0 10px 32px rgba(37,211,102,0.55); }

/* SCROLL REVEAL */
.reveal { opacity:0;transform:translateY(30px);transition:opacity 0.7s ease,transform 0.7s ease; }
.reveal.visible { opacity:1;transform:translateY(0); }

/* RESPONSIVE */
@media (max-width:900px) {
  .hero-inner { grid-template-columns:1fr;min-height:auto;padding:40px 5%; }
  .hero-image-wrap { order:-1; }
  .hero-image-card { aspect-ratio:16/9; }
  .why-grid { grid-template-columns:1fr; }
  .gallery-slide { grid-template-columns:1fr; }
  .gallery-img:first-child { border-radius:18px 18px 0 0; }
  .gallery-img:last-child { border-radius:0 0 18px 18px; }
  .contact-grid { grid-template-columns:1fr; }
  .footer-top { grid-template-columns:1fr;gap:32px; }
}
@media (max-width:768px) {
  .nav-links { display:none; }
  .hero-stats { gap:20px; }
  .cf-card { width:280px; }
  .team-grid { grid-template-columns:repeat(2,1fr); }
}
`;

// ── MAIN COMPONENT ──
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [servicePopup, setServicePopup] = useState(null);
  const [teamPopup, setTeamPopup] = useState(null);
  
  const [galActive, setGalActiveState] = useState(0);

 
  const galAutoRef = useRef(null);
  
  
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // ── CURSOR ──
  useEffect(() => {
    const onMove = (e) => {
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + "px"; ringRef.current.style.top = e.clientY + "px"; }
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  // cursor hover effect
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const onEnter = () => { ring.style.width = "56px"; ring.style.height = "56px"; ring.style.opacity = "0.7"; };
    const onLeave = () => { ring.style.width = "36px"; ring.style.height = "36px"; ring.style.opacity = "0.5"; };
    const targets = document.querySelectorAll("a,button,.service-card,.team-card");
    targets.forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });
    return () => targets.forEach(el => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
  });

  // ── SCROLL NAV ──
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── SCROLL REVEAL ──
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  // ── POPUP BODY LOCK ──
  useEffect(() => {
    document.body.style.overflow = (servicePopup || teamPopup) ? "hidden" : "";
  }, [servicePopup, teamPopup]);





  



  // gallery auto
  useEffect(() => {
    galAutoRef.current = setInterval(() => {
      setGalActiveState(prev => (prev + 1) % GALLERY.length);
    }, 4500);
    return () => clearInterval(galAutoRef.current);
  }, []);


  const stopGalAuto = () => clearInterval(galAutoRef.current);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* CURSOR */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* WHATSAPP FAB */}
      <a className="wa-fab" href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <svg width="30" height="30" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.737 5.469 2.027 7.774L0 32l8.437-2.01A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.277 13.277 0 01-6.77-1.854l-.485-.289-5.006 1.194 1.216-4.875-.317-.5A13.25 13.25 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.91c-.398-.2-2.356-1.162-2.72-1.295-.364-.133-.63-.2-.895.2-.265.398-1.028 1.295-1.26 1.561-.232.265-.464.298-.862.1-.398-.2-1.682-.62-3.204-1.977-1.184-1.056-1.984-2.36-2.216-2.758-.232-.398-.025-.613.174-.812.179-.178.398-.464.597-.696.2-.232.265-.398.398-.664.132-.265.066-.497-.033-.697-.1-.2-.895-2.158-1.227-2.955-.323-.776-.65-.671-.895-.683-.23-.01-.497-.013-.763-.013s-.697.1-.862.265c-.298.2-1.127.795-1.393 1.793-.265.999.066 2.093.232 2.458.166.365 2.093 3.192 5.071 4.482.709.307 1.262.49 1.692.626.711.227 1.359.195 1.87.118.57-.085 1.757-.718 2.005-1.412.249-.695.249-1.29.175-1.412-.074-.122-.265-.199-.563-.332z"/>
        </svg>
      </a>

      {/* NAVBAR */}
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => goTo("home")}>
          <div className="nav-logo-icon">🦷</div>
          <div className="nav-logo-text">
            <span>Doctor Tooth</span>
            <span>Dental Care</span>
          </div>
        </div>
        <ul className="nav-links">
          <li><a onClick={() => goTo("home")}>Home</a></li>
          <li><a onClick={() => goTo("team")}>About Our Team</a></li>
          <li><a onClick={() => goTo("gallery")}>Gallery</a></li>
          <li><a onClick={() => goTo("contact")}>Contact Us</a></li>
          <li>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="nav-cta">
              Book Appointment
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="home">
        <div className="hero-bg-circle c1" />
        <div className="hero-bg-circle c2" />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-badge">Pokhara's Premium Dental Care</div>
            <h1 className="hero-title">Your <em>Perfect Smile</em><br />Starts Here</h1>
            <p className="hero-desc">
             At Doctor Tooth Dental Care, we combine advanced dentistry with a warm, personal touch to create beautiful, confident smiles. Our clinic is led by a prosthodontist, Dr. Sushil Pokhrel, ensuring that complete dentures, dental implants, and all types of prosthetic rehabilitations are performed at a top-notch, highly precise level with a strong focus on quality and patient satisfaction.
            </p>
            <div className="hero-actions">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Book Appointment →</a>
              <a onClick={() => goTo("services")} className="btn-outline" style={{ cursor: "pointer" }}>Our Services</a>
            </div>
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">2+</span><span className="stat-label">Specialised Doctors</span></div>
              <div className="stat"><span className="stat-num">500+</span><span className="stat-label">Happy Patients</span></div>
              <div className="stat"><span className="stat-num">100+</span><span className="stat-label">Major Treatments</span></div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-image-card">
  <img
    src="/clinic.jpg"
    alt="Clinic"
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
              
              <div className="hero-image-placeholder">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="8" y="8" width="44" height="44" rx="8" stroke="#C4510A" strokeWidth="2" />
                  <circle cx="22" cy="24" r="6" stroke="#C4510A" strokeWidth="2" />
                  <path d="M8 44l14-12 10 8 10-10 10 14" stroke="#C4510A" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p>Clinic Interior Photo Coming Soon</p>
              </div>
            </div>
            <div className="hero-float-card">
              <div className="hero-float-icon">⭐</div>
              <div className="hero-float-text">
                <strong>Top Rated Clinic</strong>
                <span>Pokhara, Nepal</span>
              </div>
            </div>
            <div className="hero-float-card2">
              <strong>Our Commitment</strong>
              <span>Patient's Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="section-inner">
          <div className="services-header reveal">
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">World-Class Dental Treatments</h2>
            <p className="section-desc">From preventive care to advanced cosmetic procedures, we provide comprehensive dental solutions tailored to your unique needs.</p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="service-card reveal"
                style={{ transitionDelay: `${(i % 4) * 0.07}s` }}
                onClick={() => setServicePopup(s)}
              >
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <p className="service-brief">{s.desc.split(".")[0]}.</p>
                <div className="service-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Our Team</div>
            <h2 className="section-title">Meet the Experts Behind Your Smile</h2>
            <p className="section-desc">Our dedicated team of dental professionals combines years of experience with a passion for exceptional patient care.</p>
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={i} className="team-card reveal" onClick={() => setTeamPopup(m)}>
                <div className="team-photo">
  <img
    src={`/public/team-${i}.jpeg`}
    alt={m.name}
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
  <button className="team-view-btn">View Profile</button>
                  <button className="team-view-btn">View Profile</button>
                </div>
                <div className="team-info">
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label" style={{ color: "var(--orange-light)" }}>Why Choose Us</div>
            <h2 className="section-title">The Doctor Tooth Difference</h2>
            <p className="section-desc">We're not just treating teeth — we're building lasting relationships built on trust, expertise, and genuine care.</p>
          </div>
          <div className="why-grid reveal">
            {WHY_ITEMS.map((w, i) => (
              <div key={i} className="why-item">
                <span className="why-num">{w.n}</span>
                <div className="why-icon">{w.icon}</div>
                <div className="why-title">{w.title}</div>
                <p className="why-text">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* GALLERY */}
      <section id="gallery">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Our Work</div>
            <h2 className="section-title">Before &amp; After Gallery</h2>
            <p className="section-desc">Real results from real patients — witness the transformations we create every day at Doctor Tooth Dental Care.</p>
          </div>
          <div className="gallery-wrap reveal">
            <div className="gallery-slider">
              <div className="gallery-track" style={{ transform: `translateX(-${galActive * 100}%)` }}>
                {GALLERY.map((g, i) => {
                  const [c0, c1] = GAL_COLORS[i % GAL_COLORS.length];
                  return (
                    <div key={i} className="gallery-slide">
                      <div className="gallery-img">
  <img
  src={`/before-${i}.jpeg`}
  alt="Before"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
  onError={(e) => {
    if (!e.target.src.includes(".jpg")) {
      e.target.src = `/before-${i}.jpg`;
    } else {
      e.target.src = "https://via.placeholder.com/600x400?text=Before";
    }
  }}
/>
                        <div className="gallery-placeholder" style={{ background: `linear-gradient(135deg,${c0},${c1})` }}>
                          <span style={{ fontSize: "42px" }}>🦷</span>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "#8a7a6e" }}>{g.before}</span>
                        </div>
                        <span className="gallery-badge before">Before</span>
                        <div className="gallery-label">{g.case} — {g.before}</div>
                      </div>
                      <div className="gallery-img">
  <img
  src={`/after-${i}.jpeg`}
  alt="After"
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
  onError={(e) => {
    if (!e.target.src.includes(".jpg")) {
      e.target.src = `/after-${i}.jpg`;
    } else {
      e.target.src = "https://via.placeholder.com/600x400?text=After";
    }
  }}
/>
                        <div className="gallery-placeholder" style={{ background: "linear-gradient(135deg,#fff3ea,#f5d4b0)" }}>
                          <span style={{ fontSize: "42px" }}>✨</span>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "#8a7a6e" }}>{g.after}</span>
                        </div>
                        <span className="gallery-badge after">After</span>
                        <div className="gallery-label">{g.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="gallery-nav-row">
              <button className="gallery-btn" onClick={() => { stopGalAuto(); setGalActiveState(v => Math.max(0, v - 1)); }}>←</button>
              <div className="gallery-dots">
                {GALLERY.map((_, i) => (
                  <button key={i} className={`gdot${galActive === i ? " active" : ""}`} onClick={() => { stopGalAuto(); setGalActiveState(i); }} />
                ))}
              </div>
              <button className="gallery-btn" onClick={() => { stopGalAuto(); setGalActiveState(v => Math.min(GALLERY.length - 1, v + 1)); }}>→</button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Visit Doctor Tooth Dental Care</h2>
            <p className="section-desc">Ready to transform your smile? We'd love to hear from you. Walk in or book an appointment today.</p>
          </div>
          <div className="contact-grid reveal">
            <div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">Big Bazar, Second Floor<br />Mahendrapool, Pokhara, Nepal</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Phone / WhatsApp</div>
                  <div className="contact-value">+977-9846613962</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div>
                  <div className="contact-label">Clinic Hours</div>
                  <div className="contact-value">Sunday – Friday: 9:00 AM – 6:00 PM<br />Saturday: 10:00 AM – 1:00 PM</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">sushilprostho@gmail.com</div>
                </div>
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: "8px" }}>
                Book an Appointment →
              </a>
            </div>
            <div className="contact-map">
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.4522787939964!2d83.98763217615394!3d28.223949002516395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995944f329e37e5%3A0x812d4082e2f7c21b!2sDoctor%20Tooth%20Dental%20Care!5e0!3m2!1sen!2snp!4v1777638395895!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                width="100%" height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Doctor Tooth Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand-name">Doctor <span>Tooth</span> Dental Care</div>
              <p className="footer-tagline">Your trusted partner for premium dental care in Pokhara. Creating confident smiles since 2019. </p>
              <div className="footer-socials">
                <a
  href="https://www.facebook.com/doctortoothdental"
  target="_blank"
  rel="noopener noreferrer"
  className="floating-facebook"
>
  f
</a>
                
               
              </div>
            </div>
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                {[["home","Home"],["services","Services"],["why-us","Why Us"],["team","Our Team"],["gallery","Gallery"],["contact","Contact"]].map(([id, label]) => (
                  <li key={id}><a onClick={() => goTo(id)}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                {["Dental Implants","Orthodontics","Root Canal","Teeth Whitening","Dental Crowns","Cosmetic Dentistry"].map(s => (
                  <li key={s}><a onClick={() => goTo("services")}>{s}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="footer-divider" />
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 <span>Doctor Tooth Dental Care</span>. All rights reserved. | Big Bazar, Mahendrapool, Pokhara, Nepal</div>
            <div className="footer-copy">Designed by Shulabh Pokharel © </div>
          </div>
        </div>
      </footer>

      {/* SERVICE POPUP */}
      <div className={`popup-overlay${servicePopup ? " active" : ""}`} onClick={e => { if (e.target === e.currentTarget) setServicePopup(null); }}>
        <div className="popup-panel">
          <div className="popup-handle" />
          <button className="popup-close" onClick={() => setServicePopup(null)}>✕</button>
          {servicePopup && (
            <div className="popup-inner">
              <div className="popup-head">
                <div className="popup-icon">{servicePopup.icon}</div>
                <div>
                  <div className="popup-subtitle">{servicePopup.subtitle}</div>
                  <div className="popup-title">{servicePopup.name}</div>
                </div>
              </div>
              <div className="popup-body">{servicePopup.desc}</div>
              <div className="popup-features">
                {servicePopup.features.map(f => <span key={f} className="popup-tag">{f}</span>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TEAM POPUP */}
      <div className={`team-popup-overlay${teamPopup ? " active" : ""}`} onClick={e => { if (e.target === e.currentTarget) setTeamPopup(null); }}>
        <div className="team-popup-card">
          {teamPopup && (
            <>
              <div className="team-popup-header">
                <div className="team-popup-avatar">
  <img
    src={teamPopup.img}
    alt={teamPopup.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "20px"
    }}
    onError={(e) => {
      e.target.src = "https://via.placeholder.com/150?text=No+Image";
    }}
  /></div>
                <div>
                  <div className="team-popup-name">{teamPopup.name}</div>
                  <div className="team-popup-role">{teamPopup.role}</div>
                </div>
                <button className="team-popup-close" onClick={() => setTeamPopup(null)}>✕</button>
              </div>
              <div className="team-popup-body">
                <div className="team-popup-bio">{teamPopup.bio}</div>
                <div className="team-popup-tags">
                  {teamPopup.tags.map(t => <span key={t} className="team-popup-tag">{t}</span>)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}