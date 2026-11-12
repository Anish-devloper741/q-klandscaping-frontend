import { useState } from "react";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <div className="ba" aria-label="Before and after comparison">
      <div className="ba-pane ba-after">After</div>
      <div className="ba-pane ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        Before
      </div>
      <div className="ba-line" style={{ left: `${pos}%` }} />
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(+e.target.value)}
        aria-label="Drag to compare before and after"
      />
    </div>
  );
}