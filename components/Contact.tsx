"use client";

import { useState, useRef } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      message: fd.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setState("success");
        formRef.current?.reset();
        setTimeout(() => setState("idle"), 5000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setState("error");
    }
  };

  return (
    <section id="contact">
      <div className="inner">
        <div className="sec-tag rv" data-n="04">Contact</div>
        <div className="contact-wrap">
          <div className="rv">
            <div className="ctag">
              Let&apos;s build something <span>great</span> together.
            </div>
            <p className="cintro">
              Open to full-time roles, internships, and exciting projects. I respond quickly —
              reach out and let&apos;s talk.
            </p>
            <div className="socials">
              <a href="mailto:anselmoferrer.dev@gmail.com" className="slink">
                <span className="slink-ico">@</span>
                anselmoferrer.dev@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/anselmo-ferrer"
                target="_blank"
                rel="noopener noreferrer"
                className="slink"
              >
                <span className="slink-ico">in</span>
                linkedin.com/in/anselmo-ferrer
              </a>
              <a
                href="https://github.com/Anselmo-Ferrer"
                target="_blank"
                rel="noopener noreferrer"
                className="slink"
              >
                <span className="slink-ico">gh</span>
                github.com/Anselmo-Ferrer
              </a>
            </div>
          </div>
          <div className="rv d1">
            <form className="cform" id="cform" ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="fg">
                <label className="flbl" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  className="fi"
                  type="text"
                  placeholder="Your name"
                  required
                  minLength={2}
                  maxLength={80}
                />
              </div>
              <div className="fg">
                <label className="flbl" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  className="fi"
                  type="email"
                  placeholder="your@email.com"
                  required
                  maxLength={120}
                />
              </div>
              <div className="fg">
                <label className="flbl" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="ft"
                  placeholder="Tell me about your project or idea..."
                  required
                  minLength={10}
                  maxLength={2000}
                />
              </div>

              {state === "error" && (
                <p className="form-error" role="alert">{errorMsg}</p>
              )}
              {state === "success" && (
                <p className="form-success" role="status">
                  ✓ Message sent! I&apos;ll get back to you soon.
                </p>
              )}

              <button
                type="submit"
                className="fsub mag"
                disabled={state === "loading" || state === "success"}
              >
                {state === "loading" ? "Sending…" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
