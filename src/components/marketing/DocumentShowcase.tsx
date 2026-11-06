"use client";
import { useState } from "react";
import { FileText, Check } from "lucide-react";
import type { DocumentTemplate } from "@/lib/site-config";
import { Eyebrow, choiceKeys } from "./Controls";
import { Paper } from "./ProductVisuals";
export function DocumentShowcase() {
  const [template, setTemplate] = useState<DocumentTemplate>("modern");
  return (
    <section
      className="documents-section"
      id="showcase"
      aria-labelledby="showcase-heading"
    >
      <div className="document-copy" data-reveal>
        <Eyebrow number="03">DRESSED FOR THE OCCASION</Eyebrow>
        <h2 id="showcase-heading">
          Your work has a style.
          <br />
          So should your <em>invoice.</em>
        </h2>
        <p>
          Clean details. Thoughtful typography. A document that looks as
          considered as the work behind it.
        </p>
        <div
          className="template-controls"
          role="group"
          aria-label="Document style"
          onKeyDown={(event) =>
            choiceKeys(event, (index) =>
              setTemplate(
                (["minimal", "modern", "professional"] as DocumentTemplate[])[
                  index
                ],
              ),
            )
          }
        >
          {(["minimal", "modern", "professional"] as DocumentTemplate[]).map(
            (t, i) => (
              <button
                key={t}
                aria-pressed={template === t}
                onClick={() => setTemplate(t)}
              >
                <span>0{i + 1}</span>
                <div>
                  <strong>{t}</strong>
                  <small>
                    {
                      [
                        "Quiet confidence. Nothing extra.",
                        "A little character. A clear statement.",
                        "Timeless structure. All business.",
                      ][i]
                    }
                  </small>
                </div>
                <span className="template-radio">
                  {template === t && <Check size={12} />}
                </span>
              </button>
            ),
          )}
        </div>
        <span className="document-note">
          <FileText size={14} />
          Same details. A different kind of impression.
        </span>
      </div>
      <div className="document-display" data-reveal>
        <span className="document-display-label">
          THE {template.toUpperCase()} EDITION <span>01—03</span>
        </span>
        <div className="showcase-paper" key={template}>
          <Paper template={template} />
        </div>
        <span className="document-display-foot">
          Designed for the details. Made to be remembered.
        </span>
      </div>
    </section>
  );
}
