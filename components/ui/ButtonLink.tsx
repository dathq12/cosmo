import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: ButtonLinkProps) {
  return (
    <Link className={`button button--${variant}`} href={href}>
      <span>{children}</span>
      <span aria-hidden="true" className="button__arrow">
        →
      </span>
    </Link>
  );
}
