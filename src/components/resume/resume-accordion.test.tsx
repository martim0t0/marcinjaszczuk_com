import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResumeAccordion } from "./resume-accordion";

describe("ResumeAccordion", () => {
  test("starts collapsed by default with aria-expanded=false", () => {
    render(<ResumeAccordion title="Skills">Content</ResumeAccordion>);
    expect(screen.getByRole("button", { name: /skills/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("respects defaultOpen", () => {
    render(
      <ResumeAccordion title="Summary" defaultOpen>
        Content
      </ResumeAccordion>,
    );
    expect(screen.getByRole("button", { name: /summary/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  test("toggles aria-expanded on click", async () => {
    const user = userEvent.setup();
    render(<ResumeAccordion title="Experience">Content</ResumeAccordion>);
    const trigger = screen.getByRole("button", { name: /experience/i });

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("toggles via keyboard (Enter/Space) since it's a native button", async () => {
    const user = userEvent.setup();
    render(<ResumeAccordion title="Education">Content</ResumeAccordion>);
    const trigger = screen.getByRole("button", { name: /education/i });

    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("multiple accordions can be open simultaneously (independent state)", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ResumeAccordion title="First">Content</ResumeAccordion>
        <ResumeAccordion title="Second">Content</ResumeAccordion>
      </>,
    );

    await user.click(screen.getByRole("button", { name: /first/i }));
    await user.click(screen.getByRole("button", { name: /second/i }));

    expect(screen.getByRole("button", { name: /first/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: /second/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  test("trigger references its panel via aria-controls", () => {
    render(<ResumeAccordion title="Projects">Content</ResumeAccordion>);
    const trigger = screen.getByRole("button", { name: /projects/i });
    const panelId = trigger.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId!)).toHaveAttribute(
      "role",
      "region",
    );
  });
});
