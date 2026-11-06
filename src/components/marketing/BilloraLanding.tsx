"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Menu,
  X,
  Users,
  CircleCheck,
  CreditCard,
  Command,
  Move,
  Minimize,
  CornerDownRight,
  Layers,
} from "lucide-react";
import { useReducedMotion } from "@/lib/motion/reduced-motion";
import { useLandingMotion } from "@/lib/motion/use-landing-motion";
import { useSmoothScroll, scrollToElement } from "@/lib/motion/use-smooth-scroll";
import { WALKTHROUGH_PAYMENT_MINOR } from "@/lib/sample-data";
import { Brand, CTA, Eyebrow, choiceKeys } from "./Controls";
import { Paper, Chart } from "./ProductVisuals";
import { Hero } from "./Hero";
import { FeatureGrid } from "./FeatureGrid";
import { DocumentShowcase } from "./DocumentShowcase";
import { FAQ } from "./FAQ";
import { steps } from "./content";
import { invoice, money } from "./demo-data";
import "./billora.css";
export function BilloraLanding() {
  const root = useRef<HTMLDivElement>(null);
  const [reduced, toggleMotion, mounted] = useReducedMotion();
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = root.current?.querySelectorAll<HTMLElement>(
      "#workflow, #features, #showcase, #faq",
    );
    if (!sections) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-18% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    const clearAtHero = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection("");
      },
      { threshold: 0.3 },
    );
    const hero = root.current?.querySelector(".hero");
    if (hero) clearAtHero.observe(hero);
    return () => {
      observer.disconnect();
      clearAtHero.disconnect();
    };
  }, []);

  useLandingMotion(root, reduced, setStep);
  useSmoothScroll(reduced, menu);

  useEffect(() => {
    if (!menu) return;
    const opener = openerRef.current;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function keyboard(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenu(false);
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = menuRef.current?.querySelectorAll<HTMLElement>("a, button");
      if (!nodes?.length) return;
      // Do not rely on platform Tab preferences: WebKit can skip native links.
      e.preventDefault();
      const current = Array.from(nodes).indexOf(
        document.activeElement as HTMLElement,
      );
      const next =
        current < 0
          ? 0
          : (current + (e.shiftKey ? -1 : 1) + nodes.length) % nodes.length;
      nodes[next].focus({ preventScroll: true });
    }
    document.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", keyboard);
      opener?.focus({ preventScroll: true });
    };
  }, [menu]);

  const chooseStep = (i: number) => {
    setStep(i);
    if (
      window.matchMedia("(min-width: 900px) and (pointer: fine)").matches &&
      !reduced
    )
      scrollToElement(document.getElementById(`story-${i}`), reduced);
    else if (
      !window.matchMedia("(min-width: 900px) and (pointer: fine)").matches
    )
      scrollToElement(root.current?.querySelector(".story-stage") ?? null, reduced);
  };
  return (
    <div ref={root} className="billora" data-ready={mounted}>
      <div className="reading-progress" aria-hidden="true" />
      <header className="b-header">
        <nav className="b-nav" aria-label="Main navigation">
          <Brand />
          <div className="desktop-nav">
            <a
              href="#workflow"
              aria-current={
                activeSection === "workflow" ? "location" : undefined
              }
            >
              How it works
            </a>
            <a
              href="#features"
              aria-current={
                activeSection === "features" ? "location" : undefined
              }
            >
              Features
            </a>
            <a
              href="#showcase"
              aria-current={
                activeSection === "showcase" ? "location" : undefined
              }
            >
              The documents
            </a>
          </div>
          <div className="nav-end">
            <a className="nav-explore" href="#showcase">
              Take a look <ArrowUpRight size={14} />
            </a>
            <CTA />
            <button
              ref={openerRef}
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu(true)}
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>
      {menu && (
        <div
          ref={menuRef}
            className="mobile-menu"
            id="mobile-menu"
          data-lenis-prevent=""
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div>
            <Brand onNavigate={() => setMenu(false)} />
            <button
              ref={closeRef}
              aria-label="Close menu"
              onClick={() => setMenu(false)}
            >
              <X />
            </button>
          </div>
          <nav>
            {[
              ["#workflow", "How it works"],
              ["#features", "Features"],
              ["#showcase", "The documents"],
              ["#faq", "A few answers"],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
          <p>A little less admin. A lot more possibility.</p>
        </div>
      )}
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <section className="audience" aria-label="Who Billora is for">
          <p>
            For independent minds.
            <br />
            <strong>And the businesses they build.</strong>
          </p>
          <div className="audience-types">
            <span>
              <Command />
              Freelancers
            </span>
            <span>
              <Layers />
              Creative studios
            </span>
            <span>
              <Users />
              Consultants
            </span>
            <span>
              <ArrowUpRight />
              Small teams
            </span>
          </div>
        </section>
        <section
          className="workflow-section"
          id="workflow"
          aria-labelledby="workflow-heading"
        >
          <div className="section-heading" data-reveal>
            <Eyebrow number="01">LESS FRICTION. MORE FLOW.</Eyebrow>
            <h2 id="workflow-heading">
              Your work moves forward.
              <br />
              Your billing <em>should too.</em>
            </h2>
            <p>Four connected steps. A little less busywork at every one.</p>
          </div>
          <div className="story-layout">
            <div className="story-copy">
              {steps.map((s, i) => (
                <article
                  className={`story-step ${step === i ? "is-active" : ""}`}
                  id={`story-${i}`}
                  key={s.label}
                >
                  <button
                    className="story-label"
                    data-step={["quote", "invoice", "payment", "overview"][i]}
                    aria-current={step === i ? "step" : undefined}
                    onClick={() => chooseStep(i)}
                  >
                    <span>0{i + 1}</span>
                    {s.label}
                    <ArrowUpRight size={16} />
                  </button>
                  <h3>{s.title}</h3>
                  <p>{s.detail}</p>
                  <span className="story-note">
                    <CornerDownRight size={15} />
                    {s.note}
                  </span>
                </article>
              ))}
            </div>
            <div className="story-sticky">
              <div className={`story-stage story-stage-${step}`}>
                <div className="stage-top">
                  <span>
                    <span className="live-dot" />
                    THE BILLORA FLOW
                  </span>
                  <span>0{step + 1} / 04</span>
                </div>
                <div className="story-meter" aria-hidden="true">
                  <span
                    style={{
                      transform: `scaleX(${(step + 1) / steps.length})`,
                    }}
                  />
                </div>
                <div
                  className="stage-visual"
                  id="workflow-preview"
                  role="region"
                  aria-label={`${steps[step].label} preview`}
                  key={step}
                >
                  {step < 2 ? (
                    <>
                      <div className="stage-paper-shadow" />
                      <Paper quote={step === 0} />
                      <div className="stage-success">
                        <CircleCheck size={17} />
                        {step === 0
                          ? "A clear scope. A confident start."
                          : "Quote details carried forward."}
                      </div>
                    </>
                  ) : step === 2 ? (
                    <div className="record-payment">
                      <span className="record-icon">
                        <CreditCard size={30} />
                      </span>
                      <p>PAYMENT RECORDED</p>
                      <strong>{money(WALKTHROUGH_PAYMENT_MINOR)}</strong>
                      <span>Bank transfer · 25 September 2026</span>
                      <div>
                        <p>
                          <span>Invoice</span>
                          <b>INV–0032</b>
                        </p>
                        <p>
                          <span>Invoice total</span>
                          <b>{invoice.formatted.total}</b>
                        </p>
                        <p>
                          <span>Remaining balance</span>
                          <b>{money(invoice.balanceMinor)}</b>
                        </p>
                      </div>
                      <span className="record-confirm">
                        <Check size={14} />A little closer to complete.
                      </span>
                    </div>
                  ) : (
                    <div className="overview-scene">
                      <p>YOUR BILLING AT A GLANCE</p>
                      <h4>Room to focus.</h4>
                      <div className="balance-ring">
                        <div>
                          <span>Outstanding</span>
                          <strong>{money(invoice.balanceMinor)}</strong>
                          <small>of {invoice.formatted.total} invoiced</small>
                        </div>
                      </div>
                      <div className="overview-legend">
                        <span>
                          <i />
                          {money(WALKTHROUGH_PAYMENT_MINOR)} recorded
                        </span>
                        <span>
                          <i />
                          {money(invoice.balanceMinor)} remaining
                        </span>
                      </div>
                      <Chart />
                    </div>
                  )}
                </div>
                <div
                  className="stage-tabs"
                  role="group"
                  aria-label="Choose workflow stage"
                  onKeyDown={(event) => choiceKeys(event, chooseStep)}
                >
                  {steps.map((s, i) => (
                    <button
                      key={s.label}
                      aria-label={s.label}
                      aria-pressed={step === i}
                      aria-controls="workflow-preview"
                      onClick={() => chooseStep(i)}
                    >
                      <span />
                      {String(i + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
              <p className="sample-caption">
                A fictional project. A real feel for the workflow.
              </p>
            </div>
          </div>
        </section>
        <FeatureGrid />
        <DocumentShowcase />
        <section className="statement" aria-labelledby="statement-heading">
          <div className="sculpture-wrap">
            <Image
              className="sculpture-image"
              src="/images/billora-sculpture.webp"
              alt="Sculptural ivory paper ribbon with a cobalt blue interior"
              loading="lazy"
              width={1400}
              height={1032}
            />
          </div>
          <div className="statement-content" data-reveal>
            <Eyebrow>MORE SPACE FOR WHAT MATTERS</Eyebrow>
            <h2 id="statement-heading">
              You didn’t go independent
              <br />
              to spend your days
              <br />
              <em>chasing paperwork.</em>
            </h2>
            <p>
              Make the work you love.
              <br />
              We’ll help you keep the details in view.
            </p>
            <CTA href="#workflow" secondary>
              Find your flow
            </CTA>
          </div>
          <span className="statement-index">BILLORA / A LITTLE LESS ADMIN</span>
        </section>
        <FAQ />
        <section className="closing" aria-labelledby="closing-heading">
          <div className="closing-orbit" aria-hidden="true" />
          <div data-reveal>
            <Eyebrow>
              <span className="live-dot" />
              YOUR NEXT CHAPTER, A LITTLE CLEARER
            </Eyebrow>
            <h2 id="closing-heading">
              Good work.
              <br />
              <em>Great things ahead.</em>
            </h2>
            <p>Bring a little order to the business behind your craft.</p>
            <CTA />
            <span className="closing-note">
              Explore the concept. Find your flow.
            </span>
          </div>
          <div className="closing-bottom">
            <span>QUOTES → INVOICES → CLARITY</span>
            <span>MADE FOR INDEPENDENT WORK</span>
          </div>
        </section>
      </main>
      <footer className="b-footer">
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              A little less admin.
              <br />A lot more possibility.
            </p>
          </div>
          <div>
            <span>EXPLORE</span>
            <a href="#workflow">How it works</a>
            <a href="#features">The details</a>
            <a href="#showcase">Document styles</a>
          </div>
          <div>
            <span>GOOD TO KNOW</span>
            <a href="#faq">Questions & answers</a>
            <a href="#demo-notice">About this concept</a>
            <button
              className="motion-toggle"
              aria-pressed={reduced}
              onClick={toggleMotion}
            >
              {reduced ? <Minimize size={13} /> : <Move size={13} />}{" "}
              {reduced ? "Motion reduced" : "Reduce motion"}
            </button>
          </div>
          <a className="back-top" href="#" aria-label="Back to top">
            <ArrowUpRight size={24} />
          </a>
        </div>
        <div className="footer-bottom" id="demo-notice">
          <span>© 2026 Billora. An independent product concept.</span>
          <span>Fictional data. No billing information collected.</span>
          <span>DESIGNED TO FEEL DIFFERENT ↗</span>
        </div>
      </footer>
    </div>
  );
}
