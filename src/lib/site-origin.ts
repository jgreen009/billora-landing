/** Prefer an explicit domain, then Netlify's deployment-aware environment. */
export function resolveSiteOrigin(
  environment: Record<string, string | undefined> = process.env,
): string | undefined {
  const candidate =
    environment.NEXT_PUBLIC_SITE_URL ||
    (environment.CONTEXT && environment.CONTEXT !== "production"
      ? environment.DEPLOY_PRIME_URL
      : environment.URL);
  if (!candidate) return undefined;
  try {
    const url = new URL(candidate);
    if (
      !["https:", "http:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}
export function isPreviewDeployment() {
  return Boolean(process.env.CONTEXT && process.env.CONTEXT !== "production");
}
