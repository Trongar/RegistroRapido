import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://appwrite-demos-for-astro-blog.vercel.app",
  integrations: [mdx(), sitemap(), svelte()],
  adapter: vercel(),
});
