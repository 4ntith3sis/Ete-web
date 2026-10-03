export type ResultRow = { label: string; value: string; emphasis?: boolean };

type CalculatorResultProps = {
  title: string;
  rows: ResultRow[];
  note?: string;
};

export function CalculatorResult({ title, rows, note }: CalculatorResultProps) {
  return (
    <div className="tax-result" role="status" aria-live="polite">
      <h2>{title}</h2>
      <dl>
        {rows.map((row) => (
          <div key={row.label} className={row.emphasis ? "tax-result-row emphasis" : "tax-result-row"}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className="tax-result-note">{note}</p> : null}
    </div>
  );
}
