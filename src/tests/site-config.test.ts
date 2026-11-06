import { resolveSiteOrigin } from "@/lib/site-origin";
import { getPrimaryCTA } from "@/lib/site-config";

test("Netlify production URL supplies the canonical origin", () => {
  expect(resolveSiteOrigin({ URL: "https://billora-test.netlify.app/" })).toBe(
    "https://billora-test.netlify.app",
  );
});
test("preview builds use the preview address and custom domains take precedence", () => {
  expect(
    resolveSiteOrigin({
      CONTEXT: "deploy-preview",
      URL: "https://main.netlify.app",
      DEPLOY_PRIME_URL: "https://preview.netlify.app",
    }),
  ).toBe("https://preview.netlify.app");
  expect(
    resolveSiteOrigin({
      NEXT_PUBLIC_SITE_URL: "https://custom.example/route",
      URL: "https://main.netlify.app",
    }),
  ).toBe("https://custom.example");
});
test("invalid or credential-bearing origins are never emitted into metadata", () => {
  for (const url of [
    "javascript:alert(1)",
    "not a url",
    "https://user:password@example.com",
  ])
    expect(resolveSiteOrigin({ NEXT_PUBLIC_SITE_URL: url })).toBeUndefined();
  expect(resolveSiteOrigin({})).toBeUndefined();
});
test("the portfolio primary action stays on the page", () => {
  expect(getPrimaryCTA()).toEqual({
    label: "Explore the product",
    href: "#workflow",
    external: false,
  });
});
