import React, { type PropsWithChildren, useMemo } from "react";

type Item = { src: string; alt?: string };
type RowProps = {
  items: Item[];
  speed?: number;     // px/s
  reverse?: boolean;  // 역방향
  gap?: number;       // px
  height?: number;    // 카드 높이(px)
  radius?: number;    // 모서리(px)
};

export function MarqueeRow({
  items, speed = 40, reverse = false, gap = 24, height = 240, radius = 16,
}: RowProps) {
  const loop = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="marquee-row" data-reverse={reverse ? "1" : "0"}>
      <div
        className="marquee-track"
        style={{
          display: "flex",
          gap: `${gap}px`,
          ["--marquee-speed" as any]: `${speed}`,
          ["--marquee-gap" as any]: `${gap}px`,
          ["--marquee-h" as any]: `${height}px`,
          ["--marquee-radius" as any]: `${radius}px`,
        }}
      >
        {loop.map((it, i) => (
          <figure className="marquee-card" key={`${it.src}-${i}`}>
            <img src={it.src} alt={it.alt ?? ""} loading="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
}


export function MarqueeSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="marquee-section">
      <h2 className="marquee-title">{title}</h2>
      {children}
    </section>
  );
}
