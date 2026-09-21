"use client";

import { useId, useState, type ReactNode } from "react";

export interface ResumeAccordionProps {
  title: string;
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function ResumeAccordion({
  title,
  summary,
  defaultOpen = false,
  children,
}: ResumeAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reactId = useId();
  const triggerId = `accordion-trigger-${reactId}`;
  const panelId = `accordion-panel-${reactId}`;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <h3 className="m-0">
        <button
          id={triggerId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className="accordion-trigger flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="flex flex-col gap-1">
            <span className="text-base font-semibold text-foreground sm:text-lg">
              {title}
            </span>
            {summary ? (
              <span className="text-sm text-muted">{summary}</span>
            ) : null}
          </span>
          <svg
            aria-hidden="true"
            className="accordion-indicator shrink-0 text-muted"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        data-state={open ? "open" : "closed"}
        className="accordion-panel"
      >
        <div className="accordion-panel-inner">
          <div className="accordion-content border-t border-border px-5 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
