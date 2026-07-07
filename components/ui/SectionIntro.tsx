type SectionIntroProps = {
  label: string;
  title: string;
  body: string;
  align?: "left" | "center";
};

export function SectionIntro({
  label,
  title,
  body,
  align = "left"
}: SectionIntroProps) {
  return (
    <div className={`section-intro section-intro--${align}`}>
      <div className="eyebrow">{label}</div>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
