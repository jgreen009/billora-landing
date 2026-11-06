"use client";
import {
  Users,
  LayoutDashboard,
  ArrowUpRight,
  Layers,
  CreditCard,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Eyebrow } from "./Controls";
import { invoice, money } from "./demo-data";
import { WALKTHROUGH_PAYMENT_MINOR } from "@/lib/sample-data";
export function FeatureGrid() {
  return (
    <section
      className="features-section"
      id="features"
      aria-labelledby="features-heading"
    >
      <div className="features-header" data-reveal>
        <div>
          <Eyebrow number="02">THE RIGHT KIND OF SIMPLE</Eyebrow>
          <h2 id="features-heading">
            Everything in order.
            <br />
            <em>Nothing in your way.</em>
          </h2>
        </div>
        <p>
          The tools you need to look professional
          <br />
          and stay on top of the details.
        </p>
      </div>
      <div className="feature-bento">
        <article className="bento-card bento-clients" data-reveal>
          <div className="feature-kicker">
            <Users size={19} />
            <span>01 / YOUR PEOPLE</span>
          </div>
          <h3>
            Good relationships.
            <br />
            Great organization.
          </h3>
          <p>
            Keep client details and their documents together.
            <br />
            Pick up exactly where you left off.
          </p>
          <div className="client-stack">
            {[
              {
                name: "Atlas Creative",
                type: "Brand & digital studio",
                initials: "AC",
                color: "peach",
              },
              {
                name: "Northstar Builders",
                type: "Architecture & interiors",
                initials: "NB",
                color: "purple",
              },
              {
                name: "Pixelhouse Studio",
                type: "Independent creative team",
                initials: "PS",
                color: "green",
              },
            ].map((client, i) => (
              <div className={`client-preview client-${i}`} key={client.name}>
                <span className={`client-avatar ${client.color}`}>
                  {client.initials}
                </span>
                <div>
                  <strong>{client.name}</strong>
                  <small>{client.type}</small>
                </div>
                <ArrowUpRight size={16} />
              </div>
            ))}
          </div>
        </article>
        <article className="bento-card bento-balance" data-reveal>
          <div className="feature-kicker">
            <LayoutDashboard size={19} />
            <span>02 / YOUR CLARITY</span>
          </div>
          <h3>
            The numbers.
            <br />
            Without the noise.
          </h3>
          <p>
            See what’s recorded and what’s remaining.
            <br />A clear view, whenever you need it.
          </p>
          <div className="balance-art">
            <span>OUTSTANDING BALANCE</span>
            <strong>{money(invoice.balanceMinor)}</strong>
            <div className="balance-bar">
              <i />
            </div>
            <div>
              <span>
                <i />
                {money(WALKTHROUGH_PAYMENT_MINOR)} recorded
              </span>
              <span>32.7% complete</span>
            </div>
          </div>
        </article>
        <article className="bento-card bento-small" data-reveal>
          <div className="feature-kicker">
            <Layers size={19} />
            <span>03 / YOUR STYLE</span>
          </div>
          <div className="mini-papers" aria-hidden="true">
            {["minimal", "modern", "professional"].map((t) => (
              <div key={t} className={`mini-paper mini-${t}`}>
                <b>b.</b>
                <span />
                <span />
                <span />
                <i />
              </div>
            ))}
          </div>
          <h3>Make it feel like you.</h3>
          <p>
            Three considered document styles.
            <br />
            One professional first impression.
          </p>
          <a href="#showcase">
            Find your style <ArrowUpRight size={15} />
          </a>
        </article>
        <article className="bento-card bento-small bento-currency" data-reveal>
          <div className="feature-kicker">
            <CreditCard size={19} />
            <span>04 / YOUR REACH</span>
          </div>
          <div
            className="currency-art"
            role="img"
            aria-label="Six currency formats: US dollars, British pounds, euros, Nigerian naira, Australian dollars, Canadian dollars"
          >
            <span>$</span>
            <span>£</span>
            <span>€</span>
            <span>₦</span>
            <span>A$</span>
            <span>C$</span>
          </div>
          <h3>Work beyond borders.</h3>
          <p>
            Six currency formats for your documents.
            <br />
            Your work can travel a little further.
          </p>
          <small>Formatting only. No currency conversion.</small>
        </article>
        <article className="bento-card bento-small bento-focus" data-reveal>
          <div className="feature-kicker">
            <ShieldCheck size={19} />
            <span>05 / YOUR HEADSPACE</span>
          </div>
          <div className="focus-art" aria-hidden="true">
            <div />
            <div />
            <div />
            <span>
              <Check size={27} />
            </span>
          </div>
          <h3>Less admin. More you.</h3>
          <p>
            A focused workflow for independent work.
            <br />
            Keep the details from taking over.
          </p>
          <span className="focus-label">
            <span className="live-dot" />
            Made for a clearer working day
          </span>
        </article>
      </div>
    </section>
  );
}
