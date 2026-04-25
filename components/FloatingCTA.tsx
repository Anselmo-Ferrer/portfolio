"use client";

import { useState } from "react";

export default function FloatingCTA() {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className={`float-cta${hidden ? " hidden" : ""}`} id="float-cta">
      <div className="float-cta-head">··· GET IN TOUCH ···</div>
      <p className="float-cta-text">
        Let&apos;s talk and discuss more about your project and how I can help build it.
      </p>
      <div className="float-cta-btns">
        <button className="float-cta-dismiss" onClick={() => setHidden(true)}>
          Cancel
        </button>
        <a href="#contact" className="float-cta-go" onClick={() => setHidden(true)}>
          Contact
        </a>
      </div>
    </div>
  );
}
