import { afterEach, expect } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// @testing-library/react's auto-cleanup only self-registers when it detects
// Jest/Vitest globals, so bun:test needs it wired up explicitly.
afterEach(() => {
  cleanup();
});
