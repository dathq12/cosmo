import type { ReactNode } from "react";

type ScrollSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ScrollSection({ children, className, id }: ScrollSectionProps) {
  return (
    <section id={id} className={`scroll-section ${className ?? ""}`.trim()}>
      <div className="scroll-section__inner">{children}</div>
    </section>
  );
}
