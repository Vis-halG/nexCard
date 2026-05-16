"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X, ChevronLeft, ChevronRight, Share2, CreditCard, Sparkles, Smartphone, MoveVertical } from "lucide-react";

export default function FloatingNav({ data, primaryColor = "#4f46e5" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isJoystickActive, setIsJoystickActive] = useState(false);
  const [qrIndex, setQrIndex] = useState(0);
  const scrollInterval = useRef(null);
  const joystickRef = useRef(null);

  // Initialize qrIndex based on preference
  useEffect(() => {
    if (data?.theme?.defaultQr === 'payment') {
      setQrIndex(1);
    } else {
      setQrIndex(0);
    }
  }, [data?.theme?.defaultQr]);

  // 🕹️ JOYSTICK SCROLL LOGIC
  const handleJoystickMove = (event, info) => {
    const y = info.offset.y;
    // Clear any existing interval
    if (scrollInterval.current) clearInterval(scrollInterval.current);

    if (Math.abs(y) > 10) {
      setIsJoystickActive(true);
      const direction = y > 0 ? 1 : -1;
      const speed = Math.min(Math.abs(y) / 5, 20); // Velocity based on drag distance
      
      scrollInterval.current = setInterval(() => {
        window.scrollBy(0, direction * speed);
      }, 16);
    } else {
      setIsJoystickActive(false);
    }
  };

  const handleJoystickEnd = (event, info) => {
    if (scrollInterval.current) clearInterval(scrollInterval.current);
    
    // If it was just a tap (small movement), open the QR modal
    if (Math.abs(info.offset.y) < 10 && Math.abs(info.offset.x) < 10) {
      setIsOpen(true);
    }
    
    setIsJoystickActive(false);
  };

  const qrs = [
    {
      id: 'share',
      title: 'NexCard Profile',
      desc: 'Scan to view my digital card',
      icon: <Smartphone className="w-4 h-4" />,
      value: typeof window !== 'undefined' ? window.location.href : 'https://nexcard.app'
    },
    {
      id: 'payment',
      title: 'Payment Terminal',
      desc: 'Scan to pay via UPI',
      icon: <CreditCard className="w-4 h-4" />,
      type: 'upi',
      value: `upi://pay?pa=${encodeURIComponent(data?.payment?.upi || '')}&pn=${encodeURIComponent(data?.name || 'User')}&cu=INR`
    }
  ];

  const currentQr = qrs[qrIndex];

  return (
    <>
      {/* 🕹️ FLOATING JOYSTICK BUTTON */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-center">
        <AnimatePresence>
            {isJoystickActive && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    className="absolute -top-16 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10 shadow-2xl flex items-center gap-2"
                >
                    <MoveVertical className="w-3 h-3 animate-bounce" />
                    Scrolling Mode
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
          dragElastic={0.8}
          onPan={handleJoystickMove}
          onPanEnd={handleJoystickEnd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-grab active:cursor-grabbing z-[101] relative overflow-hidden group border-4 border-white/20"
          style={{ backgroundColor: primaryColor }}
        >
           <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="relative flex flex-col items-center">
              <Share2 className="w-6 h-6 text-white" />
              <div className="w-1 h-1 bg-white rounded-full mt-1 animate-pulse"></div>
           </div>
           
           {/* Visual Guide Ring */}
           <div className={`absolute inset-0 border-2 border-white/40 rounded-full transition-transform duration-300 ${isJoystickActive ? 'scale-90' : 'scale-110 opacity-0'}`}></div>
        </motion.div>
        
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-3 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200">
           {isJoystickActive ? 'Joystick' : 'Hold to Scroll'}
        </p>
      </div>

      {/* 🖼️ QR CAROUSEL MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-white rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative z-10"
            >
              {/* Modal Header */}
              <div className="px-8 pt-8 pb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                        {currentQr.icon}
                    </div>
                    <div>
                        <h3 className="font-black text-slate-900 uppercase tracking-tight text-lg leading-none">{currentQr.title}</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{currentQr.desc}</p>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                    <X className="w-5 h-5" />
                </button>
              </div>

              {/* Carousel Area */}
              <div className="px-8 pb-8 flex flex-col items-center">
                <div className="relative w-full aspect-square bg-slate-50 rounded-[2.5rem] flex items-center justify-center p-8 border border-slate-100 shadow-inner group">
                  
                  {/* Left Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setQrIndex(prev => (prev === 0 ? qrs.length - 1 : prev - 1)); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-900 z-20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <motion.div 
                    key={qrIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="relative z-10"
                  >
                     {currentQr.id === 'payment' && data?.payment?.qrCode ? (
                        <img src={data.payment.qrCode} alt="Payment QR" className="w-full h-full object-contain" />
                     ) : (
                        <QRCodeSVG 
                            value={currentQr.value} 
                            size={240} 
                            level="H" 
                            fgColor="#0F172A"
                            includeMargin={false}
                        />
                     )}
                  </motion.div>

                  {/* Right Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setQrIndex(prev => (prev === qrs.length - 1 ? 0 : prev + 1)); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-slate-900 z-20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-2 mt-8">
                  {qrs.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 transition-all duration-300 rounded-full ${qrIndex === i ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'}`}
                    />
                  ))}
                </div>

                {/* Footer Action */}
                <div className="mt-10 w-full">
                    <button 
                        onClick={() => {
                            navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
                            alert('Profile link copied!');
                        }}
                        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                        <Share2 className="w-4 h-4" /> Copy Direct Link
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">
                        Swipe or use arrows to switch between QRs
                    </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
