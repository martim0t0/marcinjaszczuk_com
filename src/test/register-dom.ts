import { GlobalRegistrator } from "@happy-dom/global-registrator";

// Must run to completion in its own preload step, before any file that
// imports @testing-library/dom (including jest-dom's matchers) — that
// package checks for a global `document` once at module-evaluation time and
// permanently caches the result, so registering happy-dom and loading
// testing-library code in the same hoisted-import file races and fails.
GlobalRegistrator.register();
