import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths"; // run pnpm add -D vite-tsconfig-paths(allows typscript paths to work)

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom", //simulates browser environment for a test
    exclude: [
      "**/node_modules/**",
      "**/test/**",
      "playwright-report/**",
      "test-results/**",
    ], //ensures we run only vitest
    server: {
      deps: {
        inline: ["wagmi", "@wagmi/core"], //bundling or copying these libraries into our tests instead of mocking them if you are doing the libraries tests.
      },
    },
  },
});
