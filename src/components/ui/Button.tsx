import Link from "next/link";

type ButtonProps = { href: string; children: React.ReactNode; className?: string; external?: boolean };

export function Button({ href, children, className = "btn-primary", external = false }: ButtonProps) {
  const classes = `btn ${className}`;
  if (external) return <a className={classes} href={href} target="_blank" rel="noreferrer">{children}</a>;
  return <Link className={classes} href={href}>{children}</Link>;
}
