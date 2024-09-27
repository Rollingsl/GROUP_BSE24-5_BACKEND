import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/routes/**/*.test.ts"],
    setupFiles: ["src/test/setup.ts"],
  },
});
