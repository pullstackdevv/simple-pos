// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Exclude API routes from static generation
  // API routes will only work in dev mode
});
