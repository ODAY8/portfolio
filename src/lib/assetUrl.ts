/**
 * Prefixes a root-relative public asset path (e.g. "/images/profile.jpg")
 * with Vite's configured base path (import.meta.env.BASE_URL, currently
 * "/portfolio-react/"). Plain string paths used at runtime -- unlike
 * `<link>`/`<script>` tags in index.html -- are never rewritten by Vite's
 * build step, so every reference to a file under public/ needs this.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL
  return base.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
}
