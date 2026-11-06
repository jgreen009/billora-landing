"use client";
import { useId, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Users,
  Settings,
  Search,
  Bell,
  MoreHorizontal,
  ShieldCheck,
} from "lucide-react";
import { SAMPLE_ITEMS, WALKTHROUGH_PAYMENT_MINOR } from "@/lib/sample-data";
import { formatQuantity } from "@/lib/formatting";
import type { DocumentTemplate } from "@/lib/site-config";
import { invoice, money } from "./demo-data";
export function Paper({
  template = "modern",
  quote = false,
}: {
  template?: DocumentTemplate;
  quote?: boolean;
}) {
  return (
    <div className={`paper paper-${template}`}>
      <div className="paper-top">
        <span className="paper-brand">
          b<span>billora studio</span>
        </span>
        <span className="paper-kind">
          {quote ? "QUOTE" : "INVOICE"}
          <b>{quote ? "QT–0018" : "INV–0032"}</b>
        </span>
      </div>
      <div className="paper-parties">
        <div>
          <span>PREPARED FOR</span>
          <strong>Atlas Creative</strong>
          <p>Website redesign project</p>
        </div>
        <div>
          <span>{quote ? "VALID UNTIL" : "DUE DATE"}</span>
          <strong>{quote ? "02 October 2026" : "06 October 2026"}</strong>
          <p>USD · Net 14</p>
        </div>
      </div>
      <div className="paper-table">
        <div className="paper-row paper-row-head">
          <span>DESCRIPTION</span>
          <span>QTY</span>
          <span>AMOUNT</span>
        </div>
        {SAMPLE_ITEMS.map((item) => (
          <div className="paper-row" key={item.id}>
            <span>{item.description}</span>
            <span>{formatQuantity(item.quantityHundredths)}</span>
            <span>
              {money(
                Math.round(
                  (item.quantityHundredths * item.unitRateMinor) / 100,
                ),
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="paper-totals">
        <p>
          <span>Subtotal</span>
          <span>{invoice.formatted.subtotal}</span>
        </p>
        <p>
          <span>Discount · 10%</span>
          <span>−{invoice.formatted.discount}</span>
        </p>
        <p>
          <span>Tax · 8%</span>
          <span>{invoice.formatted.tax}</span>
        </p>
        <p className="paper-total">
          <span>Total {quote ? "quoted" : "due"}</span>
          <strong>{invoice.formatted.total}</strong>
        </p>
      </div>
      <div className="paper-bottom">
        <span>
          Thank you for the opportunity.
          <br />
          Let’s make something great.
        </span>
        <span>
          SAMPLE DOCUMENT
          <br />
          NOT FOR PAYMENT
        </span>
      </div>
    </div>
  );
}
export function Chart() {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={"revenue-chart"}
      viewBox="0 0 600 150"
      role="img"
      aria-label="Illustrative billing activity trend"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7e8dff" stopOpacity=".25" />
          <stop offset="100%" stopColor="#7e8dff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[30, 75, 120].map((y) => (
        <path
          key={y}
          d={`M0 ${y}H600`}
          stroke="currentColor"
          strokeOpacity=".08"
        />
      ))}
      <path
        d="M0 125 C30 125 35 90 70 98 S120 125 150 86 S190 90 220 62 S260 100 290 76 S340 85 370 42 S425 76 460 32 S500 48 535 20 S575 30 600 6 V150 H0Z"
        fill={`url(#${id})`}
      />
      <path
        className="chart-line"
        d="M0 125 C30 125 35 90 70 98 S120 125 150 86 S190 90 220 62 S260 100 290 76 S340 85 370 42 S425 76 460 32 S500 48 535 20 S575 30 600 6"
        fill="none"
        stroke="#95a1ff"
        strokeWidth="2.5"
      />
    </svg>
  );
}
export function Workspace() {
  const [tab, setTab] = useState("Overview");
  return (
    <div
      className="workspace"
      role="region"
      aria-label="Interactive sample Billora workspace"
    >
      <aside className="workspace-sidebar">
        <div className="workspace-logo">
          <span className="mini-symbol">b.</span>billora
        </div>
        <div className="workspace-studio">
          <span>BS</span>
          <div>
            Billora Studio<small>Personal workspace</small>
          </div>
          <ChevronDown size={12} />
        </div>
        <p className="sidebar-label">WORKSPACE</p>
        {[
          { name: "Overview", icon: LayoutDashboard },
          { name: "Invoices", icon: FileText },
          { name: "Clients", icon: Users },
        ].map(({ name, icon: Icon }) => (
          <button
            key={name}
            className={tab === name ? "active" : ""}
            onClick={() => setTab(name)}
            aria-pressed={tab === name}
          >
            <Icon size={15} />
            {name}
            {name === "Invoices" && <span className="side-count">01</span>}
          </button>
        ))}
        <div className="sidebar-bottom">
          <span>
            <ShieldCheck size={14} />A little less admin.
          </span>
          <span>
            <Settings size={14} />
            Built for your business
          </span>
          <div className="sidebar-profile">
            <b>JD</b>
            <span>
              Jamie Davis<small>Independent designer</small>
            </span>
          </div>
        </div>
      </aside>
      <div className="workspace-content">
        <div className="workspace-topbar">
          <span>
            Workspace <span>/</span> <strong>{tab}</strong>
          </span>
          <div>
            <Search size={15} />
            <Bell size={15} />
            <span className="user-dot">JD</span>
          </div>
        </div>
        <div
          className="workspace-mobile-tabs"
          role="group"
          aria-label="Sample workspace views"
        >
          {["Overview", "Invoices", "Clients"].map((name) => (
            <button
              key={name}
              aria-pressed={tab === name}
              onClick={() => setTab(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="workspace-main">
          <div className="workspace-title">
            <div>
              <p>MONDAY, 28 SEPTEMBER</p>
              <p className="workspace-greeting">
                A little clarity. A lot of possibility.
              </p>
            </div>
            <a href="#showcase">
              View invoice <ArrowUpRight size={13} />
            </a>
          </div>
          {tab === "Overview" ? (
            <>
              <div className="workspace-stats">
                <div>
                  <span>
                    Total invoiced <ArrowUpRight size={13} />
                  </span>
                  <strong>{invoice.formatted.total}</strong>
                  <small>01 invoice this month</small>
                </div>
                <div>
                  <span>
                    Payments recorded <span className="stat-dot" />
                  </span>
                  <strong>{money(WALKTHROUGH_PAYMENT_MINOR)}</strong>
                  <small>
                    <i />
                    Bank transfer recorded
                  </small>
                </div>
                <div>
                  <span>
                    Outstanding <MoreHorizontal size={15} />
                  </span>
                  <strong>{money(invoice.balanceMinor)}</strong>
                  <small>Keep your next step in view</small>
                </div>
              </div>
              <div className="workspace-chart">
                <div>
                  <strong>Billing activity</strong>
                  <span>
                    September 2026 <ChevronDown size={11} />
                  </span>
                </div>
                <Chart />
                <div className="chart-months">
                  <span>01 Sep</span>
                  <span>07 Sep</span>
                  <span>14 Sep</span>
                  <span>21 Sep</span>
                  <span>28 Sep</span>
                </div>
              </div>
            </>
          ) : tab === "Clients" ? (
            <div className="workspace-clients">
              <p className="workspace-view-title">Your people, all together.</p>
              {[
                "Atlas Creative",
                "Northstar Builders",
                "Pixelhouse Studio",
              ].map((name, i) => (
                <div key={name}>
                  <b>{name.slice(0, 1)}</b>
                  <span>
                    {name}
                    <small>
                      {i === 0
                        ? "Website redesign · 1 invoice"
                        : "Sample client · No invoices"}
                    </small>
                  </span>
                  <ArrowUpRight size={16} />
                </div>
              ))}
            </div>
          ) : (
            <div className="workspace-invoice-summary">
              <FileText size={28} />
              <p className="workspace-view-title">One project. Every detail.</p>
              <p>Atlas Creative · Website redesign</p>
              <strong>{invoice.formatted.total}</strong>
              <span className="status-pill">Partially paid</span>
              <a href="#showcase">
                Explore the document <ArrowRight size={14} />
              </a>
            </div>
          )}
          <div className="recent-invoices">
            <div>
              <strong>Recent invoice</strong>
              <span>
                Sample workspace <span className="live-dot" />
              </span>
            </div>
            <div className="invoice-table-head">
              <span>CLIENT / PROJECT</span>
              <span>STATUS</span>
              <span>AMOUNT</span>
            </div>
            <div className="invoice-table-row">
              <span className="client-cell">
                <b>A</b>
                <span>
                  Atlas Creative<small>Website redesign · INV–0032</small>
                </span>
              </span>
              <span className="status-pill">Partial</span>
              <strong>{invoice.formatted.total}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
