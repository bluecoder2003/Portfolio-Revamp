import type { Metadata } from "next";
import { GeistPixelSquare } from "geist/font/pixel";

export const metadata: Metadata = {
  title: "neelakshi das",
  description: "design engineer — fluent in ai, design and the web.",
};

const LINKS = [
  { label: "email", href: "mailto:dasneelakshi01@gmail.com" },
  { label: "x", href: "https://x.com/bluecoder2003" },
  { label: "linkedin", href: "https://www.linkedin.com/in/neelakshi-das-b0ba68244/" },
  { label: "portfolio →", href: "/" },
];

export default function CrispPage() {
  return (
    <>
      {/* Suppress the preloader on this page — conference use */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{localStorage.setItem('portfolio-visited','true')}catch(e){}`,
        }}
      />

      <style>{`
        @keyframes up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .r { opacity: 0; animation: up 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
        .r1 { animation-delay:  60ms; }
        .r2 { animation-delay: 130ms; }
        .r3 { animation-delay: 200ms; }
        .r4 { animation-delay: 270ms; }
        .r5 { animation-delay: 340ms; }
        .r6 { animation-delay: 440ms; }

        .pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 18px;
          font-size: 14px;
          line-height: 1;
          border: 1px solid #D4D4D4;
          border-radius: 9999px;
          color: #0D0D0D;
          text-decoration: none;
          transition: background 0.18s, color 0.18s, border-color 0.18s, transform 0.12s;
          font-family: 'Neue Montreal', 'Helvetica Neue', Arial, sans-serif;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .pill:active {
          background: #0D0D0D;
          color: #fff;
          border-color: #0D0D0D;
          transform: scale(0.96);
        }
        @media (hover: hover) {
          .pill:hover {
            background: #0D0D0D;
            color: #fff;
            border-color: #0D0D0D;
          }
        }
      `}</style>

      <main
        style={{
          minHeight: "100svh",
          background: "#F5F4F2",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem 1.5rem",
          fontFamily: "'Neue Montreal', 'Helvetica Neue', Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <div
          style={{
            maxWidth: "380px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* ── Name ── */}
          <div className="r r1">
            <h1
              style={{
                fontSize: "clamp(48px, 15vw, 72px)",
                lineHeight: 0.88,
                fontWeight: 400,
                color: "#0D0D0D",
                letterSpacing: "-0.04em",
                margin: 0,
                fontFamily: "'Neue Montreal', 'Helvetica Neue', Arial, sans-serif",
              }}
            >
              neelakshi
              <br />
              das
            </h1>
          </div>

          {/* ── Rule ── */}
          <div
            className="r r2"
            style={{ width: "28px", height: "1px", background: "#C8C8C8" }}
          />

          {/* ── Role + tagline ── */}
          <div className="r r3">
            <p
              className={GeistPixelSquare.className}
              style={{
                fontSize: "18px",
                color: "#093FB4",
                fontWeight: 400,
                margin: "0 0 6px",
                letterSpacing: "0.01em",
              }}
            >
              design engineer
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#999",
                margin: 0,
                lineHeight: 1.45,
              }}
            >
              fluent in ai, design and the web
            </p>
          </div>

          {/* ── Current role ── */}
          <div className="r r4">
            <p
              style={{
                fontSize: "13px",
                color: "#C0C0C0",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              currently at{" "}
              <a
                href="https://oleria.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#093FB4", textDecoration: "none" }}
              >
                @oleria
              </a>{" "}
              · prev{" "}
              <a
                href="https://cosx.ai"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#C0C0C0", textDecoration: "none" }}
              >
                @cosx.ai
              </a>
            </p>
          </div>

          {/* ── Links ── */}
          <div
            className="r r5"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "4px",
            }}
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("/") || link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("/") || link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="pill"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── Kaomoji ── */}
          <p
            className="r r6"
            style={{
              fontSize: "12px",
              color: "#D0D0D0",
              fontFamily: "monospace",
              margin: "6px 0 0",
              userSelect: "none",
              letterSpacing: "0.05em",
            }}
          >
            (^ ω ^)
          </p>
        </div>
      </main>
    </>
  );
}
