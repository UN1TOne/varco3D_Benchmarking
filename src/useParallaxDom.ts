import { useEffect, useRef } from "react";

type Opts = {
  textBehind: React.RefObject<HTMLElement>;
  textBehindBlur: React.RefObject<HTMLElement>;
  textFront: React.RefObject<HTMLElement>;
  canvasWrap: React.RefObject<HTMLElement>;
};

const EASE = 0.08;
const SCALE_TXT = 0.0005;
const SCALE_CANVAS = 0.00025;

export function useParallaxDom({ textBehind, textBehindBlur, textFront, canvasWrap }: Opts) {
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);

  useEffect(() => {
    const hero = document.querySelector(".hero") as HTMLElement | null;
    if (!hero) return;

    if (canvasWrap.current) {
      canvasWrap.current.style.transform = `translate(-50%, -50%)`;
      const innerCanvas = canvasWrap.current.querySelector("canvas") as HTMLCanvasElement | null;
      if (innerCanvas) innerCanvas.style.transform = `scale(1)`;
    }

    const update = () => {
      currentScroll.current += (targetScroll.current - currentScroll.current) * EASE;

      const sTxt = 1 + currentScroll.current * SCALE_TXT;
      const sCanvas = 1 + currentScroll.current * SCALE_CANVAS;

      if (textBehind.current) textBehind.current.style.transform = `scale(${sTxt})`;
      if (textBehindBlur.current) textBehindBlur.current.style.transform = `scale(${sTxt})`;
      if (textFront.current) textFront.current.style.transform = `scale(${sTxt})`;

      const wrap = canvasWrap.current;
      if (wrap) {
        wrap.style.transform = `translate(-50%, -50%)`;
        const innerCanvas = wrap.querySelector("canvas") as HTMLCanvasElement | null;
        if (innerCanvas) {
          innerCanvas.style.transform = `scale(${sCanvas})`;
          innerCanvas.style.transformOrigin = "center center";
        }
      }

      ticking.current = false;
      rafId.current = requestAnimationFrame(update);
    };

    const onScroll = () => {
      targetScroll.current = window.pageYOffset;
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(update);
      }
    };

    // 초기 1프레임
    targetScroll.current = window.pageYOffset;
    rafId.current = requestAnimationFrame(update);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [textBehind, textBehindBlur, textFront, canvasWrap]);
}
