export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto w-full max-w-4xl px-4 text-sm text-muted sm:px-6">
        <p>© {new Date().getFullYear()} Marcin Jaszczuk.</p>
      </div>
    </footer>
  );
}
