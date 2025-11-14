import { useRef } from "react";
import "./index.css";

import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import FloatingScrollHint from "./FloatingScrollHint";
import { Scene } from "./Scene";
import { useParallaxDom } from "./useParallaxDom";
import { MarqueeRow, MarqueeSection } from "./Marquee";
import { StartScene } from "./StartScene";
import StartPage from "./StartPage";

function HeroSubtitle() {
  return <p className="subtitle">Beyond Generation to Editing</p>;
}
function HeroCTA() {
  return (
    <button
      className="cta-btn"
      onClick={() => (location.href = "/start")}
      aria-label="start"
    >
      Get started - It's free
    </button>
  );
}

function Home() {
  const behindRef = useRef<HTMLDivElement>(null);
  const behindBlurRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useParallaxDom({
    textBehind: behindRef,
    textBehindBlur: behindBlurRef,
    textFront: frontRef,
    canvasWrap: canvasWrapRef,
  });

  const row1 = [
    { src: "/images/01.jpg", alt: "creature" },
    { src: "/images/02.jpg", alt: "golem" },
    { src: "/images/03.jpg", alt: "character" },
    { src: "/images/04.jpg", alt: "alpaca" },
    { src: "/images/05.jpg", alt: "monster" },
    { src: "/images/06.jpg", alt: "chest" },
    { src: "/images/07.jpg", alt: "dessert" },
  ];
  const row2 = [
    { src: "/images/08.jpg", alt: "wolf" },
    { src: "/images/09.jpg", alt: "carving" },
    { src: "/images/10.jpg", alt: "angel" },
    { src: "/images/11.jpg", alt: "gargoyle" },
    { src: "/images/12.jpg", alt: "rock" },
    { src: "/images/13.jpg", alt: "statue" },
    { src: "/images/14.jpg", alt: "mask" },
  ];

  return (
    <main>
      <section className="hero">
        <div className="headline-behind">
          <div id="text-behind" ref={behindRef}>
            VARCO 3D
          </div>
          <div id="text-behind-blur" ref={behindBlurRef}>
            VARCO 3D
          </div>
        </div>

        <div ref={canvasWrapRef} className="canvas-container">
          <Scene />
          <FloatingScrollHint />
        </div>

        <div className="headline-front">
          <div id="text-front" ref={frontRef}>
            VARCO 3D
          </div>
        </div>

        <div className="hero-ui hero-ui--top">
          <HeroSubtitle />
        </div>
        <div className="hero-ui hero-ui--bottom">
          <HeroCTA />
        </div>
      </section>

      <MarqueeSection title="Featured Projects">
        <MarqueeRow items={row1} speed={48} gap={28} height={260} radius={18} />
        <MarqueeRow items={row2} speed={36} gap={28} height={260} radius={18} reverse />
      </MarqueeSection>
    </main>
  );
}

// function StartPage() {
//   return (
//     <main style={{ minHeight: "100vh", color: "#fff" }}>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateRows: "auto 1fr",
//           height: "calc(100vh - var(--header-h))",
//         }}
//       >
//         <section style={{ padding: "20px 24px 0" }}>
//           <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>
//             Explore the Hamburger
//           </h1>
//           <p style={{ opacity: 0.8, marginTop: 8, fontSize: 14 }}>
//             Drag to orbit · Scroll to zoom
//           </p>
//         </section>

//         <StartScene />
//       </div>
//     </main>
//   );
// }


export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
