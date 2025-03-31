import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    nodePolyfills(),
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  test: {
    include: ["**/*.test.ts"],
  },
});
