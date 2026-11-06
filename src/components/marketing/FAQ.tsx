"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Eyebrow } from "./Controls";
import { faqs } from "./content";
export function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div data-reveal>
        <Eyebrow number="04">A LITTLE MORE CLARITY</Eyebrow>
        <h2 id="faq-heading">
          Good questions.
          <br />
          <em>Clear answers.</em>
        </h2>
        <p>Get to know the idea behind Billora.</p>
      </div>
      <div className="faq-list" data-reveal>
        {faqs.map(([q, a], i) => (
          <div
            className={`faq-item ${openFaq === i ? "faq-open" : ""}`}
            key={q}
          >
            <h3>
              <button
                aria-expanded={openFaq === i}
                aria-controls={`answer-${i}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {q}
                <Plus size={18} />
              </button>
            </h3>
            <div
              className="faq-answer"
              id={`answer-${i}`}
              hidden={openFaq !== i}
            >
              <p>{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
