const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
});

function formatMonthYear(value: string): string {
  const [yearPart, monthPart] = value.split("-");
  const year = Number(yearPart);
  if (!year) return value;
  const month = monthPart ? Number(monthPart) : undefined;
  if (!month) return String(year);
  return formatter.format(new Date(year, month - 1, 1));
}

export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : "Present";
  return `${start} – ${end}`;
}

export function formatPostDate(isoDate: string): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
