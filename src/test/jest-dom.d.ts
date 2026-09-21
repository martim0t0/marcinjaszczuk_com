import { type expect } from "bun:test";
import { type TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "bun:test" {
  // Declaration merging requires an interface extending with no added
  // members here — this mirrors @testing-library/jest-dom's own bun.d.ts.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<T = unknown>
    extends TestingLibraryMatchers<
      ReturnType<typeof expect.stringContaining>,
      T
    > {}
}

export {};
