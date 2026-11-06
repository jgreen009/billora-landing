"use client";
import { CTA, Eyebrow } from "./Controls";
import { Workspace } from "./ProductVisuals";
import { money } from "./demo-data";
import { WALKTHROUGH_PAYMENT_MINOR } from "@/lib/sample-data";
import { Check, CornerDownRight } from "lucide-react";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="hero-intro">
        <Eyebrow>
          <span className="live-dot" />
          FOR THE WORK YOU MAKE YOUR OWN
        </Eyebrow>
        <h1 id="hero-heading">
          <span className="hero-line">
            <span>Great work deserves </span>
          </span>
          <span className="hero-line">
            <span>
              better <em>billing.</em>
              <svg
                className="hero-spark"
                viewBox="0 0 50 50"
                aria-hidden="true"
              >
                <path d="M25 0v50M0 25h50M7 7l36 36M7 43 43 7" />
              </svg>
            </span>
          </span>
        </h1>
        <p className="hero-description">
          From the first quote to the final payment.
          <br />
          Bring your billing together. Get back to your best work.
        </p>
        <div className="hero-actions">
          <CTA />
          <CTA href="#showcase" secondary>
            Explore the styles
          </CTA>
        </div>
        <p className="hero-footnote">
          <span className="tiny-check">
            <Check size={11} />
          </span>
          Interactive product concept <span>·</span> No account needed
        </p>
      </div>
      <div className="hero-workspace-wrap">
        <div className="workspace-caption">
          <span>
            <span className="live-dot" />
            YOUR BUSINESS. BEAUTIFULLY IN VIEW.
          </span>
          <span>
            SCROLL TO EXPLORE <CornerDownRight size={13} />
          </span>
        </div>
        <div className="hero-workspace">
          <Workspace />
          <div className="payment-float">
            <span className="payment-check">
              <Check size={18} />
            </span>
            <div>
              <strong>One less thing on your mind.</strong>
              <span>{money(WALKTHROUGH_PAYMENT_MINOR)} payment recorded</span>
            </div>
            <span className="float-time">Just now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
