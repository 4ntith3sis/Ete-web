/**
 * Shared FAQ expand/collapse icon: a plain triangle without background.
 * Closed (▶) / open (▼), rendered with the project's Font Awesome icons.
 */
export function FaqToggleIcon({ open }: { open: boolean }) {
  return (
    <i
      className={`fa-solid ${open ? "fa-caret-down" : "fa-caret-right"} faq-toggle`}
      aria-hidden="true"
    />
  );
}
