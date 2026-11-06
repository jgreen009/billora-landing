import Link from "next/link";
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        textAlign: "center",
        background: "#f7f7f2",
        color: "#202721",
      }}
    >
      <p style={{ fontSize: 12, letterSpacing: 3, color: "#606b53" }}>
        BILLORA / 404
      </p>
      <h1
        style={{
          fontSize: "clamp(36px,6vw,64px)",
          fontWeight: 500,
          letterSpacing: -2,
          lineHeight: 1.1,
          margin: "24px 0",
        }}
      >
        A little off the paper trail.
      </h1>
      <p style={{ color: "#606b53", marginBottom: 32 }}>
        This page does not exist. Your next step is still in view.
      </p>
      <Link
        href="/"
        style={{
          background: "#4c4cf0",
          color: "white",
          padding: "14px 24px",
          borderRadius: 6,
          textDecoration: "none",
        }}
      >
        Back to Billora ↗
      </Link>
    </main>
  );
}
