export function CalculatorActions({ onReset }: { onReset: () => void }) {
  return (
    <div className="tax-form-actions">
      <button type="submit" className="btn btn-primary">Hitung</button>
      <button type="button" className="btn btn-outline-navy" onClick={onReset}>Reset</button>
    </div>
  );
}
