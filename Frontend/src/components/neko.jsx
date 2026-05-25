import React, { useEffect, useRef } from "react";

const SleepingCat = ({ className = "" }) => {
  const catRef = useRef(null);
  useEffect(() => {
    const catEl = catRef.current;
    if (!catEl) return;

    catEl.style.width = "32px";
    catEl.style.height = "32px";
    catEl.style.backgroundImage =
      "url('https://raw.githubusercontent.com/adryd325/oneko.js/14bab15a755d0e35cd4ae19c931d96d306f99f42/oneko.gif')";
    catEl.style.imageRendering = "pixelated";
    catEl.style.animation = "sleepingCat 1s steps(1) infinite";
    catEl.style.backgroundPosition = "-64px 0";
  }, []);

  return (
    <div
      ref={catRef}
      className={`pointer-events-none shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
};

export default SleepingCat;
