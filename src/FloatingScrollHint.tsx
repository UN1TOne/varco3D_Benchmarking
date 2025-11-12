import { useEffect, useRef, useState } from "react";

export default function FloatingScrollHint({
    containerSelector = ".canvas-container",
    lag = 0.25,
}: { containerSelector?: string; lag?: number }) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    const target = useRef({ x: 0, y: 0 });
    const current = useRef({ x: 0, y: 0 });
    const raf = useRef<number | null>(null);

    useEffect(() => {
        const wrap = document.querySelector(containerSelector) as HTMLElement | null;
        if (!wrap) return;

        const onEnter = () => setVisible(true);
        const onLeave = () => setVisible(false);

        const onMove = (e: MouseEvent) => {
            const r = wrap.getBoundingClientRect();
            target.current.x = e.clientX - r.left;
            target.current.y = e.clientY - r.top;
        };

        wrap.addEventListener("mouseenter", onEnter);
        wrap.addEventListener("mouseleave", onLeave);
        wrap.addEventListener("mousemove", onMove);

        const tick = () => {
            const k = 1 - Math.exp((-1 / (lag * 60)));
            current.current.x += (target.current.x - current.current.x) * k;
            current.current.y += (target.current.y - current.current.y) * k;

            if (boxRef.current) {
                const x = current.current.x;
                const y = current.current.y;
                boxRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -120%)`;
            }
            raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);

        return () => {
            wrap.removeEventListener("mouseenter", onEnter);
            wrap.removeEventListener("mouseleave", onLeave);
            wrap.removeEventListener("mousemove", onMove);
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [containerSelector, lag]);

    return (
        <div
            ref={boxRef}
            className="scroll-hint"
            data-visible={visible ? "1" : "0"}
            aria-hidden={!visible}
        >
            Scroll
        </div>
    );
}
