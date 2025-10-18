/**
 * Automatically builds the Katana RPC URL in GitHub Codespaces
 */
export function getCodespaceServiceUrl(port) {
  if (typeof window === "undefined") return `http://localhost:${port}`;
  const host = window.location.hostname; // e.g. super-space-guacamole-9gqwvgwpj5gfp4pj-5173.app.github.dev
  const base = host.replace(/-\d+\.app\.github\.dev$/, ""); // remove -5173.app.github.dev
  return `https://${base}-${port}.app.github.dev`;
}