type CalculatorFieldProps = {
  id: string;
  label: string;
  children: React.ReactNode;
  help?: string;
  error?: string | null;
  center?: boolean;
};

export function CalculatorField({ id, label, children, help, error, center }: CalculatorFieldProps) {
  return (
    <div className={`tax-field-row${center ? " is-center" : ""}`}>
      <label htmlFor={id} className="tax-field-label">
        {label}
      </label>
      <div className="tax-field-control">
        {children}
        {help && !error ? <small id={`${id}-help`} className="tax-field-help">{help}</small> : null}
        {error ? <small id={`${id}-error`} className="tax-field-error" role="alert">{error}</small> : null}
      </div>
    </div>
  );
}
