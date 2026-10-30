import { createFileRoute } from "@tanstack/react-router";
import { FORMATIONS } from "@/lib/formations";
import { SITE } from "@/lib/site";
import { posts } from "@/lib/blog";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = ["/", "/a-propos", "/formations", "/services", "/entrepreneuriat-feminin", "/contact", "/politique-confidentialite", "/inscription", "/devis", "/accompagnement", "/blog", ...FORMATIONS.map((f) => `/formations/${f.slug}`), ...posts.filter((post) => post.status !== "draft").map((post) => `/blog/${post.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${SITE.url}${p}</loc></url>`).join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
