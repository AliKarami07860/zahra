/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';

// --- Bilingual Dictionary ---
const translations = {
  fa: {
    dir: 'rtl',
    lang: 'fa',
    brandTitle: 'Zahra’s Universe',
    brandSubtitle: 'دنیای زهرا',
    nav: {
      entrance: 'ورود',
      skyWishes: 'تبریک روز دختر',
      starLetter: 'نامه ستاره‌ها',
      constellations: 'صورت‌های فلکی',
      surprise: 'سورپرایز ویژه',
      timekeeper: 'ساعت فلکی',
      nightSky: 'آرامش شب',
    },
    scene1: {
      badge: 'تقدیم به زهرا • روز دختر',
      title: 'یه دنیای کوچیک، فقط برای تو، زهرا ✨',
      subtitle: 'بعضی آدم‌ها، حتی وسط شلوغ‌ترین روزها، دنیا رو قشنگ‌تر می‌کنن. این آسمان بیکران برای تجدید عهد با آرزوهای تو برپا شده.',
      cta: 'ورود به دنیای تو',
      skip: 'کاوش ستاره‌ها',
      scroll: 'به سمت افق کهکشان اسکرول کنید',
    },
    scene2: {
      tag: 'پیام آسمانی دخترانه',
      title: 'روز دختر مبارک، زهرا جان 💜',
      subtitle: 'امیدوارم همیشه به اندازه‌ی آسمون، برای آرزوهات جا داشته باشی. در این ایستگاه کهکشانی، هر شهاب نوری برای لبخند تو به حرکت درمی‌آید.',
      card1: {
        over: 'فرکانس اختصاصی',
        head: 'درخشش بدون مرز رویاها',
        body: 'جهان با قدم‌های شجاعانه دخترانی چون تو وسعت پیدا می‌کنه؛ دخترانی که روشنایی‌شان تاریک‌ترین افق‌ها رو رنگین‌کمانی از امید می‌کنه.',
      },
      wish: {
        prompt: 'آرزوی رهاشده در فضا:',
        shuffle: 'آرزوی نو',
      },
      art: {
        label: 'نور همیشه پایدار',
        desc: 'هر ستاره تجسمی از خنده‌ها و پیروزی‌های زیبای فرداهای توست.',
      },
    },
    letter: {
      tag: 'نامه‌ای زیر گنبد مینا',
      title: 'دست‌نوشته‌ای برای زهرا',
      subtitle: 'مهر و موم ستاره‌ای را لمس کن تا نامه‌ای که با خطوط نور نوشته شده گشوده شود.',
      envelope: {
        prompt: 'روی مهر ستاره‌ای کلیک کنید',
        hint: 'این نامه اختصاصاً برای چشمان تو رمزگشایی می‌شود.',
      },
      status: 'نامه بازگشایی شد • فرستاده شده از آسمان هفتم',
      edit: 'ویرایش نامه',
      view: 'مشاهده نامه',
      save: 'ذخیره تغییرات',
      editorLabel: 'متن دلخواه یا یادداشت شخصی را وارد کنید:',
      salutation: 'زهرا جان، روز دختر مبارک! 💜',
      para1: 'خواستم به‌جای یه تبریک ساده، یه گوشه‌ی کوچیک از اینترنت رو بهت هدیه بدم؛ یه جایی که فقط برای تو ساخته شده. رفاقت با آدم‌های خوب، یکی از قشنگی‌های زندگیه.',
      para2: 'امیدوارم همیشه برای چیزهایی که دوستشون داری وقت داشته باشی، با خیال راحت دنبال آرزوهات بری و هیچ‌وقت درخشش خودت رو فراموش نکنی.',
      para3: 'امیدوارم روزهای پیش روت پر از اتفاق‌های قشنگ، خنده‌های واقعی و فرصت‌های تازه باشن. خوشحالم که دوستمی. ✨',
      valediction: 'روزت مبارک، زهرا!',
      stamp: 'تمبر کهکشانی: مهر و محبت بی‌پایان',
      origin: 'مدار اردیبهشت، صورت فلکی دوستی',
    },
    scene4: {
      tag: 'نقشه تعاملی آسمان',
      title: 'ستاره‌های پنهان، پیام‌های مخفی',
      subtitle: 'شش ستاره‌ی رخشان بر گنبد آسمان قرار داده شده‌اند. هر ستاره را لمس کن تا راز الهام‌بخش آن برملا شود.',
      counterLabel: 'کشف شده:',
      counterTotal: 'از ۶ ستاره',
      unlockedBadge: 'کشف شد ✨',
    },
    stars: [
      { id: 1, title: 'ستاره اول', msg: 'یادت نره که تو هم لایق قشنگ‌ترین اتفاق‌هایی.', coords: 'RA 12h 44m / DEC +28°' },
      { id: 2, title: 'ستاره دوم', msg: 'همیشه برای یاد گرفتن چیزهای تازه به خودت فرصت بده.', coords: 'RA 15h 12m / DEC +44°' },
      { id: 3, title: 'ستاره سوم', msg: 'امیدوارم بیشتر از همیشه به خودت افتخار کنی.', coords: 'RA 18h 36m / DEC +38°' },
      { id: 4, title: 'ستاره چهارم', msg: 'دنیا هنوز پر از چیزهای قشنگیه که قراره کشفشون کنی.', coords: 'RA 21h 05m / DEC +12°' },
      { id: 5, title: 'ستاره پنجم', msg: 'یه لبخند کوچیک هم می‌تونه شروع یه روز بهتر باشه.', coords: 'RA 23h 48m / DEC -04°' },
      { id: 6, title: 'ستاره ششم ✨ (ویژه)', msg: 'درخشش تو مخصوص خودته؛ هیچ‌وقت نور خودت رو کم نکن! ✨', coords: 'RA 00h 19m / DEC +62°' },
    ],
    scene5: {
      tag: 'جعبه رازآلود کیهانی',
      title: 'یه سورپرایز کوچیک دیگه هم مونده...',
      subtitle: 'برای لمس این صندوقچه هدیه کهکشانی آماده‌ای؟ یک لبخند دیگر در انتظار توست.',
      cta: 'بازش کن ✨',
      revealed: {
        head: 'رویاهات تا همیشه درخشان!',
        body: '«به افتخار تو، زهرا؛ برای تمام رویاهایی که هنوز قراره به حقیقت تبدیل بشن! 💜»',
      },
      replay: 'دیدن دوباره سورپرایز',
    },
    scene6: {
      tag: 'گاه‌شمار کیهانی',
      title: 'ساعت فلکی و زمان‌سنج امید',
      subtitle: 'زمان در این جهان بی‌انتها با تپش آرزوهایت سنجیده می‌شود؛ رویدادهای شگفت‌انگیز در راهند.',
      mode: {
        timeless: 'حالت جاودانه (ساعت ستاره‌ای)',
        countdown: 'شمارش معکوس رویداد',
      },
      timeless: {
        quote: 'بهترین اتفاق‌ها هنوز می‌تونن در راه باشن.',
        sub: 'عقربه‌های کیهان نشان می‌دهند که هر ثانیه فرصتی دوباره برای درخشش و آغاز یک لبخند است.',
      },
      datepicker: {
        label: 'تنظیم تاریخ هدف:',
        apply: 'اعمال تاریخ',
      },
      timer: {
        days: 'روز',
        hours: 'ساعت',
        minutes: 'دقیقه',
        seconds: 'ثانیه',
      },
    },
    scene7: {
      title: 'همیشه بدرخش، زهرا جان. روز دخترت مبارک! 🌙',
      subtitle: 'این کهکشان کوچک همیشه در این گوشه از آسمان برای تو به یادگار خواهد ماند. هر زمان که نیازمند آرامش یا یادآوری درخشش خویش بودی، بازگرد.',
      replay: 'شروع دوباره سفر',
      footerCraft: 'ساخته شده با عشق و احترام، فقط برای زهرا',
      footerStarline: 'طراحی در انوار آسمان • ۲۰۲۵',
    },
    footer: {
      craft: 'Handcrafted for Zahra • In the glow of endless constellations',
      tagline: 'دنیای ابدی ستاره‌ها',
      year: '2025 Celestial Horizon',
    },
  },
  en: {
    dir: 'ltr',
    lang: 'en',
    brandTitle: 'Zahra’s Universe',
    brandSubtitle: 'Celestial World',
    nav: {
      entrance: 'Entrance',
      skyWishes: 'Sky Wishes',
      starLetter: 'Star Letter',
      constellations: 'Constellations',
      surprise: 'Surprise',
      timekeeper: 'Timekeeper',
      nightSky: 'Night Sky',
    },
    scene1: {
      badge: "For Zahra • Girls' Day Edition",
      title: 'A Little Universe, Just for You, Zahra ✨',
      subtitle: 'Some people make the world a little brighter, even on the busiest days. This boundless sky was crafted to celebrate your dreams.',
      cta: 'Enter Your Universe',
      skip: 'Explore Stars',
      scroll: 'Scroll toward the galactic horizon',
    },
    scene2: {
      tag: 'Celestial Greeting',
      title: 'Happy Girls’ Day, Dear Zahra 💜',
      subtitle: 'May you always have as much room for your dreams as the sky has for stars. In this cosmic waypoint, every shooting star trails for your smile.',
      card1: {
        over: 'Dedicated Frequency',
        head: 'Boundless Radiance of Dreams',
        body: 'The cosmos expands with courageous souls like you; girls whose authentic glow transforms the darkest horizons into arcs of hope.',
      },
      wish: {
        prompt: 'Stardust Wish in Orbit:',
        shuffle: 'New Wish',
      },
      art: {
        label: 'Everlasting Starlight',
        desc: 'Every star embodies the genuine laughter and triumphs of your tomorrow.',
      },
    },
    letter: {
      tag: 'A Letter Beneath the Canopy',
      title: 'Handwritten Under the Stars',
      subtitle: 'Touch the astral wax seal to unfurl the letter inscribed in filaments of light.',
      envelope: {
        prompt: 'Click the star wax seal',
        hint: 'This letter decodes exclusively for your eyes.',
      },
      status: 'Letter unsealed • Dispatched from the seventh sky',
      edit: 'Edit Letter',
      view: 'View Letter',
      save: 'Save Changes',
      editorLabel: 'Enter your custom note or memory:',
      salutation: 'Dear Zahra, Happy Girls’ Day! 💜',
      para1: 'Instead of sending an ordinary greeting, I wanted to give you a tiny corner of the internet, a little place created especially for you. Good friendships are one of life’s beautiful things.',
      para2: 'I hope you always find time for what you love, feel free to chase your dreams, and never forget your own light.',
      para3: 'May the days ahead bring you genuine laughter, beautiful surprises, and exciting new opportunities. I’m glad you’re my friend. ✨',
      valediction: 'Happy Girls’ Day, Zahra!',
      stamp: 'Cosmic Postmark: Boundless Regard',
      origin: 'Orbit of May • Constellation of Friendship',
    },
    scene4: {
      tag: 'Interactive Celestial Sky',
      title: 'Hidden Stars, Hidden Messages',
      subtitle: 'Six luminous stars rest in the dome above. Click each star node to unlock its inspiring whisper.',
      counterLabel: 'Discovered:',
      counterTotal: 'of 6 stars',
      unlockedBadge: 'Discovered ✨',
    },
    stars: [
      { id: 1, title: 'First Star', msg: 'You deserve beautiful things, too.', coords: 'RA 12h 44m / DEC +28°' },
      { id: 2, title: 'Second Star', msg: 'Give yourself room to discover something new.', coords: 'RA 15h 12m / DEC +44°' },
      { id: 3, title: 'Third Star', msg: 'I hope you find more reasons to be proud of yourself.', coords: 'RA 18h 36m / DEC +38°' },
      { id: 4, title: 'Fourth Star', msg: 'There are still so many wonderful things waiting to be discovered.', coords: 'RA 21h 05m / DEC +12°' },
      { id: 5, title: 'Fifth Star', msg: 'A little smile can be the beginning of a better day.', coords: 'RA 23h 48m / DEC -04°' },
      { id: 6, title: 'Sixth Star ✨ (Special)', msg: 'Your glow is uniquely yours; never dim your light! ✨', coords: 'RA 00h 19m / DEC +62°' },
    ],
    scene5: {
      tag: 'Mystery Cosmic Chest',
      title: 'One tiny surprise remains...',
      subtitle: 'Are you ready to unlock this celestial gift? One more heartfelt smile awaits.',
      cta: 'Unwrap the Surprise ✨',
      revealed: {
        head: 'May Your Dreams Shine Forever!',
        body: '“Here’s to you, Zahra — and all the dreams still waiting to come true! 💜”',
      },
      replay: 'Replay Surprise',
    },
    scene6: {
      tag: 'Astrological Timekeeper',
      title: 'The Star-Clock of Hope',
      subtitle: 'Time in this quiet universe is measured by the cadence of your aspirations.',
      mode: {
        timeless: 'Timeless Mode (Astrolabe)',
        countdown: 'Event Countdown',
      },
      timeless: {
        quote: 'Beautiful moments can still be ahead.',
        sub: 'The celestial clockwork reminds you that each passing second is an invitation to shine.',
      },
      datepicker: {
        label: 'Set target date:',
        apply: 'Apply Date',
      },
      timer: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Mins',
        seconds: 'Secs',
      },
    },
    scene7: {
      title: 'Keep shining, Zahra. Happy Girls’ Day! 🌙',
      subtitle: 'This tiny universe will forever remain yours in this corner of the web. Whenever you seek peace or wish to remember your brilliance, return here.',
      replay: 'Replay Journey',
      footerCraft: 'Handcrafted with warmth & care, just for Zahra.',
      footerStarline: 'Celestial Design • 2025',
    },
    footer: {
      craft: 'Handcrafted for Zahra • In the glow of endless constellations',
      tagline: 'Eternal Universe of Stars',
      year: '2025 Celestial Horizon',
    },
  },
};

const wishesPool = {
  fa: [
    '«همیشه شجاعتِ زیستن در میان زیباترین قصه‌های ناگفته با تو باشه.»',
    '«امیدوارم خنده‌هات ستاره‌های شب‌های پرماجرات باشن.»',
    '«دنیا به نگاه پر از ذوق تو احتیاج داره، هیچ‌وقت تغییرش نده.»',
    '«برای هر آرزویی که تو دلت جوانه زده، یک کهکشان امکان وجود داره.»',
  ],
  en: [
    '“May you always have the courage to inhabit life’s most breathtaking stories.”',
    '“May your laughter remain the brightest beacon in any adventure.”',
    '“The world needs your curious gaze—never let it dim.”',
    '“For every dream taking root in your heart, a universe of possibilities waits.”',
  ],
};

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const t = translations[lang];

  // --- Active Nav Anchor ---
  const [activeSection, setActiveSection] = useState('scene-1');

  // --- Ambient Web Audio Synthesis (432Hz meditative calm tone) ---
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggleAudio = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;

      if (isPlayingAudio) {
        if (gainRef.current) {
          gainRef.current.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.8);
          setTimeout(() => {
            if (oscRef.current) {
              oscRef.current.stop();
              oscRef.current.disconnect();
              oscRef.current = null;
            }
          }, 800);
        }
        setIsPlayingAudio(false);
      } else {
        ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 432Hz healing/celestial harmonic frequency
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setIsPlayingAudio(true);
      }
    } catch {
      setIsPlayingAudio(false);
    }
  };

  // --- Wish quote carousel ---
  const [wishIdx, setWishIdx] = useState(0);
  const currentWishList = wishesPool[lang];

  const handleNextWish = () => {
    setWishIdx((prev) => (prev + 1) % currentWishList.length);
  };

  // --- Scene 3: Envelope & Letter State ---
  const [isLetterOpened, setIsLetterOpened] = useState(false);
  const [isEditingLetter, setIsEditingLetter] = useState(false);
  const [customLetter, setCustomLetter] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('zahra_custom_letter');
    if (saved) {
      setCustomLetter(saved);
    }
  }, []);

  const handleSaveLetter = () => {
    localStorage.setItem('zahra_custom_letter', customLetter);
    setIsEditingLetter(false);
  };

  // --- Scene 4: Constellations state ---
  const [discoveredStars, setDiscoveredStars] = useState<number[]>([]);
  const [activeStarModal, setActiveStarModal] = useState<(typeof t.stars)[0] | null>(null);

  const handleStarClick = (star: (typeof t.stars)[0]) => {
    if (!discoveredStars.includes(star.id)) {
      setDiscoveredStars((prev) => [...prev, star.id]);
    }
    setActiveStarModal(star);
  };

  // --- Scene 5: Surprise Mystery Box ---
  const [isSurpriseOpened, setIsSurpriseOpened] = useState(false);

  // --- Scene 6: Star-Clock & Countdown Mode ---
  const [clockMode, setClockMode] = useState<'timeless' | 'countdown'>('timeless');
  const [targetDateStr, setTargetDateStr] = useState('2025-12-31');
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 16, minutes: 28, seconds: 54 });

  useEffect(() => {
    const target = new Date(`${targetDateStr}T00:00:00`).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  // --- Canvas Cosmic Twinkle Engine ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const count = Math.min(160, Math.floor((w * h) / 10000));
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      color: string;
      flickerOffset: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.4 ? '#CBBEFF' : '#F5E1AF',
        flickerOffset: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      frame += 0.02;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const dynamicAlpha = Math.max(0.1, Math.min(1, s.alpha + Math.sin(frame + s.flickerOffset) * 0.25));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = dynamicAlpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Update HTML dir and lang
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
  }, [lang, t.dir, t.lang]);

  // Section Observer for navigation tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const scenes = document.querySelectorAll('section[id^="scene-"]');
    scenes.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen bg-[#0f1225] text-[#dfe1fc] antialiased flex flex-col relative overflow-hidden`} dir={t.dir}>
      {/* Dynamic Stardust Background Canvas */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Atmospheric Nebula nodes */}
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-[#967cff]/15 blur-[140px] transform-gpu"></div>
        <div className="absolute top-1/3 -right-40 w-[700px] h-[700px] rounded-full bg-[#9588c8]/15 blur-[160px] transform-gpu"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#544823]/20 blur-[130px] transform-gpu"></div>
        <div className="absolute -bottom-20 right-1/3 w-[500px] h-[500px] rounded-full bg-[#cbbeff]/10 blur-[140px] transform-gpu"></div>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      </div>

      {/* ======================================================== */}
      {/* 1. TOP HEADER NAVIGATION BAR                             */}
      {/* ======================================================== */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0a0d20]/80 backdrop-blur-xl border-b border-[#484554]/20 shadow-[0_16px_48px_-12px_rgba(139,109,255,0.15)]">
        <div className="h-20 max-w-[1360px] mx-auto px-5 lg:px-10 flex items-center justify-between gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Directly linked image with resilient fallback */}
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1WTzuNONbUua-eUA4nFYLC5YBfQK2kSX2ROnVv--s1PLiJ1fD6w6GMyGUxKRPxrUAA6Ee4DsBWwX9gi5sH9Ye-2x2B-23cZXGOG7tmdCfDoG22cTdhfvsUgIsKyYsTwySaghxRRlJMQ_KBvrWH0kq5rDpqWjHLqeRuxsGicFmziiYPVYKERw58Fg8G8Rq3X27OcFwMpTaV_RD23EROGS2Qn5DJhrh1WVZ8a9IbHfm75bsujpQEsA9zNPpIg"
              alt="Celestial Crescent Emblem"
              className="h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(215,197,149,0.5)]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // If blocked or offline, seamlessly render styled SVG emblem
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.fallback-crescent')) {
                  const svg = document.createElement('span');
                  svg.className = 'fallback-crescent text-2xl text-[#d7c595]';
                  svg.innerHTML = '🌙';
                  parent.insertBefore(svg, parent.firstChild);
                }
              }}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-[17px] text-[#dfe1fc] tracking-tight">{t.brandTitle}</span>
              <span className="text-[11px] text-[#d7c595] tracking-widest uppercase opacity-85 font-medium">{t.brandSubtitle}</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-[#171a2e]/70 p-1.5 rounded-full border border-[#938ea0]/20 backdrop-blur-md">
            <a
              href="#scene-1"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'scene-1'
                  ? 'bg-[#967cff] text-[#2c0087] shadow-[0_0_20px_rgba(139,109,255,0.4)]'
                  : 'text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#26293d]'
              }`}
            >
              {t.nav.entrance}
            </a>
            <a
              href="#scene-2"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'scene-2'
                  ? 'bg-[#967cff] text-[#2c0087] shadow-[0_0_20px_rgba(139,109,255,0.4)]'
                  : 'text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#26293d]'
              }`}
            >
              {t.nav.skyWishes}
            </a>
            <a
              href="#scene-3"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'scene-3'
                  ? 'bg-[#967cff] text-[#2c0087] shadow-[0_0_20px_rgba(139,109,255,0.4)]'
                  : 'text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#26293d]'
              }`}
            >
              {t.nav.starLetter}
            </a>
            <a
              href="#scene-4"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'scene-4'
                  ? 'bg-[#967cff] text-[#2c0087] shadow-[0_0_20px_rgba(139,109,255,0.4)]'
                  : 'text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#26293d]'
              }`}
            >
              {t.nav.constellations}
            </a>
            <a
              href="#scene-4"
              onClick={() => {
                const el = document.getElementById('scene-5');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'scene-5'
                  ? 'bg-[#967cff] text-[#2c0087] shadow-[0_0_20px_rgba(139,109,255,0.4)]'
                  : 'text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#26293d]'
              }`}
            >
              {t.nav.surprise}
            </a>
            <a
              href="#scene-6"
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === 'scene-6'
                  ? 'bg-[#967cff] text-[#2c0087] shadow-[0_0_20px_rgba(139,109,255,0.4)]'
                  : 'text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#26293d]'
              }`}
            >
              {t.nav.timekeeper}
            </a>
          </nav>

          {/* Right Controls: Ambient Music, Language Switcher, Profile Orb */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Ambient Sound Toggle */}
            <button
              onClick={toggleAudio}
              type="button"
              aria-label="Toggle Ambient Celestial Music"
              title={isPlayingAudio ? 'موسیقی کیهانی روشن است' : 'روشن کردن نوای کیهانی'}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all border ${
                isPlayingAudio
                  ? 'bg-[#544823] text-[#f5e1af] border-[#d7c595] shadow-[0_0_15px_rgba(215,197,149,0.5)]'
                  : 'bg-[#26293d] text-[#cac4d7] border-[#484554]/40 hover:text-[#d7c595] hover:bg-[#313348]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{isPlayingAudio ? 'volume_up' : 'volume_off'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              type="button"
              className="flex items-center gap-1.5 px-3.5 h-10 rounded-full bg-[#544823] text-[#c9b788] hover:bg-[#d7c595] hover:text-[#3a2f0c] transition-all text-xs font-bold border border-[#d7c595]/30 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">translate</span>
              <span>{lang === 'fa' ? 'فارسی / EN' : 'EN / فارسی'}</span>
            </button>

            {/* Profile Avatar Node */}
            <div className="w-8 h-8 rounded-full bg-[#cbbeff] flex items-center justify-center shadow-[0_0_14px_rgba(203,190,255,0.5)]">
              <span className="material-symbols-outlined text-[#330098] text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* FLOATING PERSISTENT QUICK CONTROLS BAR (BOTTOM CORNER)   */}
      {/* ======================================================== */}
      <aside className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#26293d]/85 backdrop-blur-2xl px-3 py-1.5 rounded-full shadow-[0_16px_40px_rgba(8,11,30,0.8)] border border-[#cbbeff]/20">
        <button
          onClick={toggleAudio}
          type="button"
          title="Toggle Ambient Audio Tone"
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
            isPlayingAudio ? 'text-[#d7c595] bg-[#544823]/80' : 'text-[#cac4d7] hover:text-[#d7c595] hover:bg-[#313348]'
          }`}
        >
          <span className="material-symbols-outlined text-[19px]">{isPlayingAudio ? 'music_note' : 'music_off'}</span>
        </button>
        <div className="w-[1px] h-4 bg-[#484554]/50" />
        <button
          onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
          type="button"
          title="Switch Language"
          className="px-3 h-8 rounded-full text-xs font-semibold flex items-center gap-1 text-[#d7c595] hover:text-[#dfe1fc] hover:bg-[#313348] transition-all"
        >
          <span className="material-symbols-outlined text-[15px]">language</span>
          <span>{lang === 'fa' ? 'فارسی' : 'English'}</span>
        </button>
        <div className="w-[1px] h-4 bg-[#484554]/50" />
        <a
          href="#scene-1"
          title="Return to Top"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#cac4d7] hover:text-[#cbbeff] hover:bg-[#313348] transition-colors"
        >
          <span className="material-symbols-outlined text-[19px]">north</span>
        </a>
      </aside>

      {/* ======================================================== */}
      {/* FLOATING SUB-NAVIGATOR RAIL (STICKY)                     */}
      {/* ======================================================== */}
      <div className="sticky top-24 z-30 w-full flex justify-center px-4 pointer-events-none mb-4">
        <nav
          aria-label="Journey Landmarks"
          className="pointer-events-auto flex items-center gap-1.5 p-1.5 bg-[#0a0d20]/85 backdrop-blur-2xl rounded-full border border-[#cbbeff]/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-full overflow-x-auto scrollbar-none"
        >
          {[
            { id: 'scene-1', label: t.nav.entrance, hasDot: true },
            { id: 'scene-2', label: t.nav.skyWishes },
            { id: 'scene-3', label: t.nav.starLetter },
            { id: 'scene-4', label: t.nav.constellations },
            { id: 'scene-5', label: t.nav.surprise },
            { id: 'scene-6', label: t.nav.timekeeper },
            { id: 'scene-7', label: t.nav.nightSky },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                activeSection === item.id
                  ? 'bg-[#967cff] text-[#2c0087] shadow-md font-bold'
                  : 'text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#26293d]'
              }`}
            >
              {item.hasDot && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d7c595] mr-1.5 ml-1.5 align-middle" />}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <main className="w-full pt-10 flex-1 relative">
        {/* ======================================================== */}
        {/* SCENE 1: THE COSMIC ENTRANCE                             */}
        {/* ======================================================== */}
        <section id="scene-1" className="relative min-h-[880px] flex items-center justify-center px-5 lg:px-10 py-16">
          <div className="max-w-[1100px] w-full mx-auto flex flex-col items-center text-center relative z-10">
            {/* Top Rotating Astral Compass Emblem */}
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#d7c595]/30 animate-[spin_24s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-dashed border-[#cbbeff]/40 animate-[spin_18s_linear_infinite_reverse]" />
              <div className="absolute inset-0 flex items-center justify-center text-[#d7c595] drop-shadow-[0_0_20px_rgba(231,213,164,0.7)]">
                <svg className="w-20 h-20 text-[#d7c595]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M48 10 A 38 38 0 1 0 86 66 A 32 32 0 1 1 48 10 Z" fill="url(#crescent-hero-grad)" opacity="0.95" />
                  <polygon className="animate-pulse" fill="#F5E1AF" points="68,26 72,36 82,40 72,44 68,54 64,44 54,40 64,36" />
                  <circle cx="34" cy="42" fill="#CBBEFF" r="2.5" />
                  <circle cx="56" cy="68" fill="#FFFFFF" r="1.5" />
                  <defs>
                    <linearGradient id="crescent-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F5E1AF" />
                      <stop offset="50%" stopColor="#D7C595" />
                      <stop offset="100%" stopColor="#9588C8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Badge Capsule */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#26293d]/70 backdrop-blur-md mb-6 border border-[#cbbeff]/25 shadow-[0_0_24px_rgba(150,124,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#d7c595] animate-ping" />
              <span className="text-[12px] font-semibold text-[#d7c595] uppercase tracking-wider">{t.scene1.badge}</span>
            </div>

            {/* Cinematic Primary Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold text-[#dfe1fc] tracking-tight max-w-[920px] mb-5 leading-tight sm:leading-[1.25]">
              {t.scene1.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#cac4d7] max-w-[680px] mb-10 leading-relaxed font-normal">
              {t.scene1.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#scene-2"
                className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#d7c595] text-[#3a2f0c] font-bold text-base shadow-[0_0_36px_rgba(215,197,149,0.4)] hover:shadow-[0_0_48px_rgba(215,197,149,0.7)] hover:scale-105 transition-all"
              >
                <span>{t.scene1.cta}</span>
                <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform text-[20px]">south</span>
              </a>
              <a
                href="#scene-4"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#171a2e]/70 backdrop-blur-md text-[#cac4d7] hover:text-[#dfe1fc] font-semibold text-sm border border-[#484554]/40 hover:border-[#cbbeff]/40 transition-all"
              >
                <span className="material-symbols-outlined text-[19px]">explore</span>
                <span>{t.scene1.skip}</span>
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 flex flex-col items-center opacity-70 animate-bounce">
              <span className="text-xs text-[#cac4d7] mb-1">{t.scene1.scroll}</span>
              <span className="material-symbols-outlined text-[#d7c595] text-[22px]">keyboard_double_arrow_down</span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SCENE 2: A SKY FULL OF GOOD WISHES                       */}
        {/* ======================================================== */}
        <section id="scene-2" className="relative py-20 px-5 lg:px-10">
          <div className="max-w-[1240px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#cbbeff]/10 border border-[#cbbeff]/20 mb-3">
                <span className="material-symbols-outlined text-[#cbbeff] text-[18px]">auto_awesome</span>
                <span className="text-xs font-semibold text-[#cbbeff]">{t.scene2.tag}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe1fc] mb-3">{t.scene2.title}</h2>
              <p className="text-base text-[#cac4d7] max-w-[720px] leading-relaxed">{t.scene2.subtitle}</p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Large Wish Constellation Card (7 Cols) */}
              <div className="md:col-span-7 bg-[#171a2e]/70 backdrop-blur-xl p-8 rounded-2xl border border-[#cbbeff]/20 shadow-[0_16px_48px_rgba(8,11,30,0.6)] relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#cbbeff]/15 rounded-full blur-[80px]" />
                <div className="relative z-10 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#d7c595] uppercase tracking-wider">{t.scene2.card1.over}</span>
                    <span className="material-symbols-outlined text-[#d7c595]">star_rate</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#dfe1fc] mb-3">{t.scene2.card1.head}</h3>
                  <p className="text-sm sm:text-base text-[#cac4d7] leading-relaxed">{t.scene2.card1.body}</p>
                </div>

                {/* Wish Carousel Box */}
                <div className="relative z-10 bg-[#26293d]/80 p-5 rounded-xl border border-[#cbbeff]/20">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-sm font-semibold text-[#dfe1fc]">{t.scene2.wish.prompt}</span>
                    <button
                      onClick={handleNextWish}
                      type="button"
                      className="flex items-center gap-1 text-xs font-bold text-[#d7c595] hover:text-[#f5e1af] transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                      <span>{t.scene2.wish.shuffle}</span>
                    </button>
                  </div>
                  <div className="text-base text-[#cbbeff] italic transition-all duration-300 py-1">
                    {currentWishList[wishIdx % currentWishList.length]}
                  </div>
                </div>
              </div>

              {/* Visual Celestial Artwork Token (5 Cols) */}
              <div className="md:col-span-5 bg-[#171a2e]/70 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-[#d7c595]/20 shadow-[0_16px_48px_rgba(8,11,30,0.6)] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d20] via-transparent to-transparent opacity-60" />
                <div className="relative w-48 h-48 my-4 flex items-center justify-center">
                  <svg className="w-full h-full transform group-hover:rotate-45 transition-transform duration-700" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" fill="none" opacity="0.4" r="75" stroke="#CBBEFF" strokeDasharray="8 6" strokeWidth="1.5" />
                    <circle cx="100" cy="100" fill="none" opacity="0.6" r="55" stroke="#D7C595" strokeWidth="1.2" />
                    <circle cx="100" cy="100" fill="url(#core-glow)" r="30" />
                    <circle className="animate-ping" cx="100" cy="100" fill="#F5E1AF" r="10" style={{ animationDuration: '3s' }} />
                    <circle cx="155" cy="100" fill="#CBBEFF" r="5" />
                    <circle cx="60" cy="65" fill="#D7C595" r="4" />
                    <defs>
                      <radialGradient id="core-glow">
                        <stop offset="0%" stopColor="#CBBEFF" stopOpacity="0.9" />
                        <stop offset="60%" stopColor="#8B6DFF" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#1B1E32" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="material-symbols-outlined text-[#d7c595] text-[36px] drop-shadow-[0_0_12px_#D7C595]">
                      favorite
                    </span>
                  </div>
                </div>
                <span className="text-xl font-bold text-[#d7c595] mb-1">{t.scene2.art.label}</span>
                <p className="text-xs sm:text-sm text-[#cac4d7] max-w-[280px] leading-relaxed">{t.scene2.art.desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SCENE 3: A LETTER WRITTEN BENEATH THE STARS              */}
        {/* ======================================================== */}
        <section id="scene-3" className="relative py-20 px-5 lg:px-10">
          <div className="max-w-[1040px] mx-auto flex flex-col items-center">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#544823]/40 border border-[#d7c595]/30 mb-3">
                <span className="material-symbols-outlined text-[#d7c595] text-[18px]">mail</span>
                <span className="text-xs font-semibold text-[#d7c595]">{t.letter.tag}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe1fc] mb-3">{t.letter.title}</h2>
              <p className="text-sm sm:text-base text-[#cac4d7] max-w-[620px]">{t.letter.subtitle}</p>
            </div>

            {/* Celestial Envelope Container */}
            <div className="w-full max-w-[820px] bg-[#171a2e]/80 backdrop-blur-2xl rounded-2xl border border-[#cbbeff]/25 shadow-[0_24px_64px_rgba(8,11,30,0.7)] p-6 md:p-10 relative overflow-hidden transition-all duration-500">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#cbbeff]/15 rounded-full blur-[60px] pointer-events-none" />

              {!isLetterOpened ? (
                /* Envelope Sealed State View */
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div
                    onClick={() => setIsLetterOpened(true)}
                    className="relative w-36 h-28 bg-[#26293d] rounded-xl border border-[#cbbeff]/30 flex items-center justify-center mb-6 shadow-xl cursor-pointer group hover:scale-105 transition-all"
                    role="button"
                    tabIndex={0}
                    aria-label="Open Letter"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#cbbeff]/10 to-transparent rounded-xl pointer-events-none" />
                    <div className="w-16 h-16 rounded-full bg-[#544823] border-2 border-[#d7c595] flex items-center justify-center shadow-[0_0_24px_rgba(215,197,149,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_36px_rgba(215,197,149,0.9)] transition-all">
                      <span className="material-symbols-outlined text-[#d7c595] text-[30px]">lock_open_right</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#dfe1fc] mb-2">{t.letter.envelope.prompt}</h3>
                  <p className="text-xs sm:text-sm text-[#cac4d7]">{t.letter.envelope.hint}</p>
                </div>
              ) : (
                /* Envelope Opened Letter Content View */
                <div className="flex flex-col animate-[fadeIn_0.5s_ease_forwards]">
                  {/* Letter Tools Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#484554]/30 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#d7c595] animate-pulse" />
                      <span className="text-xs font-semibold text-[#d7c595]">{t.letter.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (!isEditingLetter && !customLetter) {
                            setCustomLetter(
                              `${t.letter.salutation}\n\n${t.letter.para1}\n\n${t.letter.para2}\n\n${t.letter.para3}\n\n${t.letter.valediction}`
                            );
                          }
                          setIsEditingLetter(!isEditingLetter);
                        }}
                        type="button"
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#26293d] text-[#cac4d7] hover:text-[#d7c595] hover:bg-[#313348] text-xs font-semibold transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">{isEditingLetter ? 'visibility' : 'edit'}</span>
                        <span>{isEditingLetter ? t.letter.view : t.letter.edit}</span>
                      </button>
                      <button
                        onClick={() => setIsLetterOpened(false)}
                        type="button"
                        title="Seal Envelope"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#26293d] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>
                  </div>

                  {/* Letter Body or Live Editor */}
                  {!isEditingLetter ? (
                    <div className="text-[#dfe1fc] space-y-4 text-base sm:text-lg leading-relaxed select-text font-normal">
                      {customLetter ? (
                        <div className="whitespace-pre-line text-[#dfe1fc]">{customLetter}</div>
                      ) : (
                        <>
                          <p className="text-xl font-bold text-[#d7c595]">{t.letter.salutation}</p>
                          <p className="text-[#dfe1fc]">{t.letter.para1}</p>
                          <p className="text-[#dfe1fc]">{t.letter.para2}</p>
                          <p className="text-[#dfe1fc]">{t.letter.para3}</p>
                          <p className="text-xl font-bold text-[#cbbeff] pt-2">{t.letter.valediction}</p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <label className="text-xs font-semibold text-[#d7c595]">{t.letter.editorLabel}</label>
                      <textarea
                        value={customLetter}
                        onChange={(e) => setCustomLetter(e.target.value)}
                        className="w-full bg-[#0a0d20]/80 border border-[#cbbeff]/30 rounded-xl p-4 text-[#dfe1fc] text-sm sm:text-base focus:outline-none focus:border-[#d7c595] transition-all"
                        rows={7}
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={handleSaveLetter}
                          type="button"
                          className="px-5 py-2 rounded-full bg-[#cbbeff] text-[#330098] font-bold text-xs hover:bg-[#967cff] transition-colors cursor-pointer"
                        >
                          {t.letter.save}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Letter Postmark & Footer Signature */}
                  <div className="mt-8 pt-4 border-t border-[#484554]/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-[#cac4d7] text-xs">
                    <span>{t.letter.stamp}</span>
                    <span className="flex items-center gap-1 text-[#d7c595]">
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                      <span>{t.letter.origin}</span>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SCENE 4: HIDDEN STARS, HIDDEN MESSAGES                   */}
        {/* ======================================================== */}
        <section id="scene-4" className="relative py-20 px-5 lg:px-10">
          <div className="max-w-[1280px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#967cff]/20 border border-[#967cff]/30 mb-3">
                <span className="material-symbols-outlined text-[#cbbeff] text-[18px]">flare</span>
                <span className="text-xs font-semibold text-[#cbbeff]">{t.scene4.tag}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe1fc] mb-3">{t.scene4.title}</h2>
              <p className="text-sm sm:text-base text-[#cac4d7] max-w-[680px] leading-relaxed">{t.scene4.subtitle}</p>

              {/* Discovery Counter Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#26293d]/80 border border-[#d7c595]/30">
                <span className="material-symbols-outlined text-[#d7c595] text-[18px]">verified</span>
                <span className="text-xs font-semibold text-[#dfe1fc]">
                  <span>{t.scene4.counterLabel}</span>
                  <strong className="text-[#d7c595] mx-1.5 text-sm">{discoveredStars.length}</strong>
                  <span>{t.scene4.counterTotal}</span>
                </span>
              </div>
            </div>

            {/* Interactive Constellation Area */}
            <div className="relative w-full h-[540px] md:h-[620px] bg-[#0a0d20]/90 rounded-2xl border border-[#cbbeff]/20 shadow-[0_20px_60px_rgba(8,11,30,0.8)] overflow-hidden flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#967cff]/10 via-[#0a0d20]/50 to-[#0a0d20] pointer-events-none" />

              {/* Constellation Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600">
                <defs>
                  <linearGradient id="line-grad-react" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#CBBEFF" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#D7C595" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#CBBEFF" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <path d="M 180 180 L 360 120 L 520 280 L 740 180 L 860 380 L 440 450 Z" fill="none" stroke="url(#line-grad-react)" strokeDasharray="6 4" strokeWidth="1.8" className="opacity-80" />
                <path d="M 360 120 L 440 450" fill="none" stroke="#CBBEFF" strokeDasharray="3 3" strokeWidth="1" opacity="0.4" />
                <path d="M 520 280 L 860 380" fill="none" stroke="#CBBEFF" strokeDasharray="3 3" strokeWidth="1" opacity="0.4" />
              </svg>

              {/* Star Node 1 */}
              <button
                onClick={() => handleStarClick(t.stars[0])}
                type="button"
                className="absolute flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
                style={{ top: '24%', left: '16%' }}
              >
                <div className={`w-12 h-12 rounded-full border border-[#cbbeff]/40 flex items-center justify-center transition-all ${discoveredStars.includes(1) ? 'ring-2 ring-[#d7c595] shadow-[0_0_20px_#d7c595]' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-[#d7c595] shadow-[0_0_18px_#D7C595] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a2f0c]" />
                  </div>
                </div>
                <span className="mt-1 text-xs text-[#d7c595] group-hover:text-[#dfe1fc] bg-[#26293d]/85 px-2.5 py-0.5 rounded-full border border-[#cbbeff]/20 backdrop-blur-sm transition-colors">
                  {t.stars[0].title}
                </span>
              </button>

              {/* Star Node 2 */}
              <button
                onClick={() => handleStarClick(t.stars[1])}
                type="button"
                className="absolute flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
                style={{ top: '14%', left: '36%' }}
              >
                <div className={`w-12 h-12 rounded-full border border-[#cbbeff]/40 flex items-center justify-center transition-all ${discoveredStars.includes(2) ? 'ring-2 ring-[#cbbeff] shadow-[0_0_20px_#cbbeff]' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-[#cbbeff] shadow-[0_0_18px_#CBBEFF] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#330098]" />
                  </div>
                </div>
                <span className="mt-1 text-xs text-[#cbbeff] group-hover:text-[#dfe1fc] bg-[#26293d]/85 px-2.5 py-0.5 rounded-full border border-[#cbbeff]/20 backdrop-blur-sm transition-colors">
                  {t.stars[1].title}
                </span>
              </button>

              {/* Star Node 3 */}
              <button
                onClick={() => handleStarClick(t.stars[2])}
                type="button"
                className="absolute flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
                style={{ top: '44%', left: '51%' }}
              >
                <div className={`w-14 h-14 rounded-full border border-[#d7c595]/40 flex items-center justify-center transition-all ${discoveredStars.includes(3) ? 'ring-2 ring-[#f5e1af] shadow-[0_0_25px_#f5e1af]' : ''}`}>
                  <div className="w-6 h-6 rounded-full bg-[#f5e1af] shadow-[0_0_24px_#F5E1AF] flex items-center justify-center animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-[#231a00]" />
                  </div>
                </div>
                <span className="mt-1 text-xs text-[#d7c595] group-hover:text-[#dfe1fc] bg-[#26293d]/85 px-2.5 py-0.5 rounded-full border border-[#d7c595]/30 backdrop-blur-sm transition-colors">
                  {t.stars[2].title}
                </span>
              </button>

              {/* Star Node 4 */}
              <button
                onClick={() => handleStarClick(t.stars[3])}
                type="button"
                className="absolute flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
                style={{ top: '25%', left: '74%' }}
              >
                <div className={`w-12 h-12 rounded-full border border-[#cbbeff]/40 flex items-center justify-center transition-all ${discoveredStars.includes(4) ? 'ring-2 ring-[#cbbeff] shadow-[0_0_20px_#cbbeff]' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-[#cbbeff] shadow-[0_0_18px_#CBBEFF] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#330098]" />
                  </div>
                </div>
                <span className="mt-1 text-xs text-[#cbbeff] group-hover:text-[#dfe1fc] bg-[#26293d]/85 px-2.5 py-0.5 rounded-full border border-[#cbbeff]/20 backdrop-blur-sm transition-colors">
                  {t.stars[3].title}
                </span>
              </button>

              {/* Star Node 5 */}
              <button
                onClick={() => handleStarClick(t.stars[4])}
                type="button"
                className="absolute flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
                style={{ top: '66%', left: '85%' }}
              >
                <div className={`w-12 h-12 rounded-full border border-[#cbbeff]/40 flex items-center justify-center transition-all ${discoveredStars.includes(5) ? 'ring-2 ring-[#d7c595] shadow-[0_0_20px_#d7c595]' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-[#d7c595] shadow-[0_0_18px_#D7C595] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a2f0c]" />
                  </div>
                </div>
                <span className="mt-1 text-xs text-[#d7c595] group-hover:text-[#dfe1fc] bg-[#26293d]/85 px-2.5 py-0.5 rounded-full border border-[#cbbeff]/20 backdrop-blur-sm transition-colors">
                  {t.stars[4].title}
                </span>
              </button>

              {/* Star Node 6 (Special) */}
              <button
                onClick={() => handleStarClick(t.stars[5])}
                type="button"
                className="absolute flex flex-col items-center group cursor-pointer focus:outline-none transition-transform hover:scale-110"
                style={{ top: '72%', left: '42%' }}
              >
                <div className={`w-16 h-16 rounded-full border-2 border-dashed border-[#d7c595] flex items-center justify-center transition-all animate-[spin_12s_linear_infinite] ${discoveredStars.includes(6) ? 'shadow-[0_0_35px_#d7c595]' : ''}`}>
                  <div className="w-7 h-7 rounded-full bg-[#d7c595] shadow-[0_0_30px_#D7C595] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[15px] text-[#3a2f0c]">star</span>
                  </div>
                </div>
                <span className="mt-1 text-xs font-bold text-[#d7c595] group-hover:text-[#dfe1fc] bg-[#544823] px-3 py-0.5 rounded-full border border-[#d7c595] shadow-[0_0_12px_rgba(215,197,149,0.3)] backdrop-blur-sm transition-colors">
                  {t.stars[5].title}
                </span>
              </button>

              {/* Floating Star Message Popover Modal */}
              {activeStarModal && (
                <div className="absolute z-30 max-w-[360px] w-full p-6 bg-[#26293d]/95 backdrop-blur-2xl rounded-2xl border border-[#d7c595]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] animate-[fadeIn_0.3s_ease]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#d7c595] text-[20px]">auto_awesome</span>
                      <span className="text-base font-bold text-[#d7c595]">{activeStarModal.title}</span>
                    </div>
                    <button
                      onClick={() => setActiveStarModal(null)}
                      type="button"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#cac4d7] hover:text-[#dfe1fc] hover:bg-[#313348] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                  <p className="text-sm sm:text-base text-[#dfe1fc] my-4 leading-relaxed font-normal">{activeStarModal.msg}</p>
                  <div className="pt-2 border-t border-[#484554]/30 flex items-center justify-between text-[#cac4d7] text-xs">
                    <span className="text-[#d7c595] font-semibold">{t.scene4.unlockedBadge}</span>
                    <span className="font-mono text-[#d7c595]">{activeStarModal.coords}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SCENE 5: THE INTERACTIVE SURPRISE                        */}
        {/* ======================================================== */}
        <section id="scene-5" className="relative py-20 px-5 lg:px-10">
          <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
            {/* Section Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#544823] border border-[#d7c595]/30 mb-3">
                <span className="material-symbols-outlined text-[#d7c595] text-[18px]">featured_seasonal_and_gifts</span>
                <span className="text-xs font-semibold text-[#d7c595]">{t.scene5.tag}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe1fc] mb-3">{t.scene5.title}</h2>
              <p className="text-sm sm:text-base text-[#cac4d7] max-w-[600px] leading-relaxed">{t.scene5.subtitle}</p>
            </div>

            {/* Surprise Container */}
            <div className="w-full max-w-[620px] bg-[#171a2e]/70 backdrop-blur-2xl p-8 sm:p-14 rounded-2xl border border-[#cbbeff]/25 shadow-[0_24px_64px_rgba(8,11,30,0.7)] relative overflow-hidden flex flex-col items-center">
              <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#d7c595]/15 rounded-full blur-[70px] pointer-events-none" />

              {!isSurpriseOpened ? (
                /* State 1: Wrapped Mystery Gift Box */
                <div className="flex flex-col items-center transition-all duration-500">
                  <div
                    onClick={() => setIsSurpriseOpened(true)}
                    className="relative w-40 h-40 mb-8 flex items-center justify-center cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label="Unwrap Gift Box"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#26293d] to-[#313348] border border-[#d7c595]/40 shadow-[0_0_32px_rgba(215,197,149,0.3)] group-hover:scale-105 group-hover:shadow-[0_0_48px_rgba(215,197,149,0.6)] transition-all" />
                    {/* Ribbons */}
                    <div className="absolute inset-y-0 w-5 bg-[#d7c595]/70 shadow-[0_0_12px_#D7C595]" />
                    <div className="absolute inset-x-0 h-5 bg-[#d7c595]/70 shadow-[0_0_12px_#D7C595]" />
                    {/* Bow Emblem */}
                    <div className="relative z-10 w-16 h-16 rounded-full bg-[#cbbeff] flex items-center justify-center text-[#330098] shadow-lg group-hover:rotate-12 transition-transform">
                      <span className="material-symbols-outlined text-[32px]">redeem</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSurpriseOpened(true)}
                    type="button"
                    className="px-8 py-3.5 rounded-full bg-[#d7c595] text-[#3a2f0c] font-bold text-base shadow-[0_0_28px_rgba(215,197,149,0.4)] hover:shadow-[0_0_40px_rgba(215,197,149,0.8)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t.scene5.cta}</span>
                    <span className="material-symbols-outlined text-[22px]">celebration</span>
                  </button>
                </div>
              ) : (
                /* State 2: Unwrapped Glorious Celebration */
                <div className="flex flex-col items-center animate-[fadeIn_0.8s_ease_forwards]">
                  <div className="w-24 h-24 rounded-full bg-[#544823] border-2 border-[#d7c595] flex items-center justify-center mb-6 shadow-[0_0_48px_rgba(215,197,149,0.8)] animate-bounce">
                    <span className="material-symbols-outlined text-[#d7c595] text-[48px]">award_star</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#d7c595] mb-4">{t.scene5.revealed.head}</h3>
                  <p className="text-base sm:text-lg text-[#dfe1fc] max-w-[480px] mb-8 leading-relaxed">
                    {t.scene5.revealed.body}
                  </p>
                  <button
                    onClick={() => setIsSurpriseOpened(false)}
                    type="button"
                    className="px-6 py-2.5 rounded-full bg-[#26293d] text-[#dfe1fc] hover:text-[#d7c595] font-semibold text-sm border border-[#cbbeff]/20 hover:border-[#d7c595]/40 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">replay</span>
                    <span>{t.scene5.replay}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SCENE 6: GENTLE COUNTDOWN & STAR-CLOCK                   */}
        {/* ======================================================== */}
        <section id="scene-6" className="relative py-20 px-5 lg:px-10">
          <div className="max-w-[1100px] mx-auto flex flex-col items-center">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#cbbeff]/10 border border-[#cbbeff]/25 mb-3">
                <span className="material-symbols-outlined text-[#cbbeff] text-[18px]">nest_clock_farsight_analog</span>
                <span className="text-xs font-semibold text-[#cbbeff]">{t.scene6.tag}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#dfe1fc] mb-3">{t.scene6.title}</h2>
              <p className="text-sm sm:text-base text-[#cac4d7] max-w-[620px] leading-relaxed">{t.scene6.subtitle}</p>

              {/* Mode Toggle Controls */}
              <div className="mt-6 inline-flex p-1 rounded-full bg-[#26293d] border border-[#cbbeff]/20">
                <button
                  onClick={() => setClockMode('timeless')}
                  type="button"
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    clockMode === 'timeless'
                      ? 'bg-[#967cff] text-[#2c0087] shadow-sm font-bold'
                      : 'text-[#cac4d7] hover:text-[#dfe1fc]'
                  }`}
                >
                  {t.scene6.mode.timeless}
                </button>
                <button
                  onClick={() => setClockMode('countdown')}
                  type="button"
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    clockMode === 'countdown'
                      ? 'bg-[#967cff] text-[#2c0087] shadow-sm font-bold'
                      : 'text-[#cac4d7] hover:text-[#dfe1fc]'
                  }`}
                >
                  {t.scene6.mode.countdown}
                </button>
              </div>
            </div>

            {/* Display 1: Timeless Star-Clock Astrolabe (Default) */}
            {clockMode === 'timeless' ? (
              <div className="w-full max-w-[780px] bg-[#171a2e]/80 backdrop-blur-2xl p-8 sm:p-14 rounded-2xl border border-[#d7c595]/25 shadow-[0_20px_50px_rgba(8,11,30,0.6)] flex flex-col items-center text-center">
                <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-[#d7c595]/40 animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full border border-dashed border-[#cbbeff]/40 animate-[spin_25s_linear_infinite_reverse]" />
                  <div className="absolute inset-10 rounded-full border border-[#d7c595]/30" />
                  {/* Moving Celestial Clock Hands */}
                  <div className="absolute w-1 h-28 bg-gradient-to-t from-transparent via-[#d7c595] to-[#f5e1af] rounded-full origin-bottom -top-2 animate-[spin_60s_linear_infinite]" />
                  <div className="absolute w-1.5 h-20 bg-gradient-to-t from-transparent via-[#cbbeff] to-[#967cff] rounded-full origin-bottom top-2 animate-[spin_360s_linear_infinite]" />
                  {/* Pivot Star */}
                  <div className="w-6 h-6 rounded-full bg-[#d7c595] flex items-center justify-center shadow-[0_0_20px_#D7C595] z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3a2f0c]" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#d7c595] mb-2">{t.scene6.timeless.quote}</h3>
                <p className="text-xs sm:text-sm text-[#cac4d7] max-w-[500px] leading-relaxed">{t.scene6.timeless.sub}</p>
              </div>
            ) : (
              /* Display 2: Configured Precision Countdown */
              <div className="w-full max-w-[840px] bg-[#171a2e]/80 backdrop-blur-2xl p-8 rounded-2xl border border-[#cbbeff]/25 shadow-[0_20px_50px_rgba(8,11,30,0.6)] flex flex-col items-center">
                {/* 4 Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8 text-center">
                  <div className="bg-[#26293d]/90 p-6 rounded-xl border border-[#cbbeff]/20 shadow-md">
                    <span className="text-4xl sm:text-5xl font-bold text-[#d7c595] block font-mono">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-[#cac4d7] uppercase tracking-wider">{t.scene6.timer.days}</span>
                  </div>
                  <div className="bg-[#26293d]/90 p-6 rounded-xl border border-[#cbbeff]/20 shadow-md">
                    <span className="text-4xl sm:text-5xl font-bold text-[#cbbeff] block font-mono">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-[#cac4d7] uppercase tracking-wider">{t.scene6.timer.hours}</span>
                  </div>
                  <div className="bg-[#26293d]/90 p-6 rounded-xl border border-[#cbbeff]/20 shadow-md">
                    <span className="text-4xl sm:text-5xl font-bold text-[#d7c595] block font-mono">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-[#cac4d7] uppercase tracking-wider">{t.scene6.timer.minutes}</span>
                  </div>
                  <div className="bg-[#26293d]/90 p-6 rounded-xl border border-[#cbbeff]/20 shadow-md">
                    <span className="text-4xl sm:text-5xl font-bold text-[#cbbeff] block font-mono">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-[#cac4d7] uppercase tracking-wider">{t.scene6.timer.seconds}</span>
                  </div>
                </div>

                {/* Date Picker Form */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <label htmlFor="target-date-picker" className="text-xs font-semibold text-[#cac4d7]">
                    {t.scene6.datepicker.label}
                  </label>
                  <input
                    id="target-date-picker"
                    type="date"
                    value={targetDateStr}
                    onChange={(e) => setTargetDateStr(e.target.value)}
                    className="bg-[#0a0d20] border border-[#cbbeff]/30 rounded-lg px-3 py-1.5 text-[#dfe1fc] text-xs focus:outline-none focus:border-[#d7c595]"
                  />
                  <button
                    type="button"
                    onClick={() => {}}
                    className="px-4 py-1.5 rounded-lg bg-[#d7c595] text-[#3a2f0c] text-xs font-bold hover:bg-[#f5e1af] transition-colors cursor-pointer"
                  >
                    {t.scene6.datepicker.apply}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SCENE 7: A QUIET CLOSING & NIGHT SKY                     */}
        {/* ======================================================== */}
        <section id="scene-7" className="relative py-24 px-5 lg:px-10 min-h-[720px] flex items-center justify-center">
          <div className="max-w-[980px] w-full mx-auto flex flex-col items-center text-center relative z-10">
            {/* Serene Crescent */}
            <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#d7c595]/10 blur-[36px]" />
              <svg className="w-24 h-24 text-[#d7c595] drop-shadow-[0_0_24px_rgba(231,213,164,0.65)]" fill="currentColor" viewBox="0 0 100 100">
                <path d="M46 12 A 38 38 0 1 0 88 64 A 32 32 0 1 1 46 12 Z" fill="#F5E1AF" />
                <circle className="animate-ping" cx="68" cy="36" fill="#FFFFFF" r="3" style={{ animationDuration: '2.5s' }} />
                <circle cx="32" cy="56" fill="#CBBEFF" r="1.5" />
              </svg>
            </div>

            {/* Concluding Heading */}
            <h2 className="text-3xl sm:text-5xl font-bold text-[#dfe1fc] max-w-[820px] mb-4 leading-tight sm:leading-[1.25]">
              {t.scene7.title}
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#cac4d7] max-w-[620px] mb-12 leading-relaxed">
              {t.scene7.subtitle}
            </p>

            {/* Replay CTA */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#scene-1"
                className="px-8 py-3.5 rounded-full bg-[#d7c595] text-[#3a2f0c] font-bold text-base shadow-[0_0_32px_rgba(215,197,149,0.35)] hover:shadow-[0_0_44px_rgba(215,197,149,0.7)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                <span>{t.scene7.replay}</span>
              </a>
            </div>

            {/* Heartfelt Token Marker */}
            <div className="mt-16 pt-8 border-t border-[#484554]/20 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-[#cac4d7] text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d7c595]" />
                <span>{t.scene7.footerCraft}</span>
              </div>
              <span className="text-[#d7c595] opacity-80">{t.scene7.footerStarline}</span>
            </div>
          </div>
        </section>
      </main>

      {/* ======================================================== */}
      {/* GLOBAL FOOTER                                            */}
      {/* ======================================================== */}
      <footer className="w-full bg-[#0a0d20]/90 backdrop-blur-xl border-t border-[#484554]/20 mt-auto">
        <div className="max-w-[1360px] mx-auto px-5 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d7c595] animate-pulse" />
            <p className="text-xs text-[#cac4d7]">{t.footer.craft}</p>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <span className="text-[#cac4d7]/70">{t.footer.tagline}</span>
            <span className="text-[#d7c595] font-semibold">{t.footer.year}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
