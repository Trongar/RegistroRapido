import { defineConfig } from 'astro/config';
// import node from '@astrojs/node';
import vercel from "@astrojs/vercel/serverless";
import tailwind from '@astrojs/tailwind';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    // adapter: node({
    //   mode: 'standalone',
    // }),
    site: "http://localhost:4321",
    adapter: vercel(),
    integrations: [
        tailwind(),
        svelte(),
    ]
});
