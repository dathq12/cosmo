"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { groupNetwork, type LocalizedText } from "@/data/site-data";

// `circleImage` is a separate field from the card's own `image` because the
// center circle wedges show different photography than the cards.
const nodeDetails: Record<string, { image: string; circleImage: string; description: LocalizedText }> = {
  cosmo: {
    image: "/assets/img5.png",
    circleImage: "/assets/img-c5.png",
    description: {
      jp: "美容商材の提供を通じて、\nサロンの成長を支えます。",
      en: "Delivers a wide range of beauty products and solutions to salons nationwide, supporting their growth."
    }
  },
  reiso: {
    image: "/assets/img2.png",
    circleImage: "/assets/img-c2.png",
    description: {
      jp: "独自の発想と技術で、\n新しい美容機器を生み出す\nブランドを展開。",
      en: "Plans, develops, and manufactures pro-quality beauty devices, raising the value of salon work through technology."
    }
  },
  "holistic-cubes": {
    image: "/assets/img1.png",
    circleImage: "/assets/img-c1.png",
    description: {
      jp: "独自の発想と技術で、\n新しい美容体験を生み出す\nブランドを展開。",
      en: "Builds a brand that creates new beauty experiences through original ideas and technology."
    }
  },
  "group-related": {
    image: "/assets/img4.png",
    circleImage: "/assets/img-c4.png",
    description: {
      jp: "美容商材の輸出入を行い、\nグローバルな流通を\n支えます。",
      en: "Leverages group strengths to develop businesses that create new value."
    }
  },
  "group-other": {
    image: "/assets/img3.png",
    circleImage: "/assets/img-c3.png",
    description: {
      jp: "不動産の開発・賃貸・転貸・\nプロパティマネジメント・不動産の\n仲介を行います。",
      en: "Brings together diverse expertise to expand the possibilities of the business."
    }
  }
};

// Five equal 72° pie wedges fanning out from the circle's center, each cut
// far beyond the circle edge so the parent's circular overflow clip (not the
// polygon) defines the outer arc. Each pair of radial edges is parallel-offset
// inward by ~3px (in box-relative %) so the white circle background shows
// through as an even border between images — see company.png for reference.
const CIRCLE_WEDGES = [
  { id: "reiso", clipPath: "polygon(50.65% 50%, 50.65% -250%, 335.13% -43.32%, 49.8% 49.38%)" },
  { id: "group-related", clipPath: "polygon(50.2% 50.62%, 335.53% -42.08%, 226.87% 292.32%, 50.53% 49.62%)" },
  { id: "group-other", clipPath: "polygon(49.47% 50.38%, 225.81% 293.08%, -125.81% 293.08%, 50.53% 50.38%)" },
  { id: "holistic-cubes", clipPath: "polygon(49.47% 49.62%, -126.87% 292.32%, -235.53% -42.08%, 49.8% 50.62%)" },
  { id: "cosmo", clipPath: "polygon(50.2% 49.38%, -235.13% -43.32%, 49.35% -250%, 49.35% 50%)" }
];

// Coordinates are in .group-showcase-relative pixels at the 1440px reference
// viewport. The SVG's viewBox is kept in sync with .group-showcase's actual
// rendered size at runtime (see svgSize state below) so these coordinates
// never get stretched out of place when content height changes — the
// viewBox height used to be hardcoded here, which silently desynced (and
// warped every line) the moment a card grew taller from new copy/images.
// Each entry connects the circle's edge (x1,y1 — dot end) to the nearest
// edge-midpoint of that card (x2,y2). Order: reiso, group-related,
// group-other — see company.png.
const LINKS_VIEWBOX = { width: 1200, height: 1268 };

const LINKS = [
  { x1: 406.6, y1: 765.4, x2: 288, y2: 828 },
  { x1: 813.6, y1: 764.9, x2: 880, y2: 799.7 },
  { x1: 610, y1: 888, x2: 610, y2: 1031.6 }
];

const LINE_DURATION = 0.4;
// Each line shares roughly the same delay as the Reveal of the card it
// connects to, so the line and its card fade in together. Order matches
// LINKS: reiso, group-related, group-other.
const LINE_DELAYS = [0.24, 0.24, 0.32];
const EASE = [0.22, 1, 0.36, 1] as const;

// cosmo and holistic-cubes (top-left / top-right cards) use a 2-segment
// elbow connector instead of a straight line — see line.png. Each entry is
// [cardSideDot, bendPoint, circleSideDot], mirrored left/right. Anchored at
// the card's vertical center (not the icon) and kept short so the line
// doesn't stretch awkwardly far above the circle.
const ELBOW_LINKS = [
  {
    points: [
      { x: 315, y: 444.6 },
      { x: 360, y: 444.6 },
      { x: 435.1, y: 508.7 }
    ],
    delay: 0.18
  },
  {
    points: [
      { x: 880, y: 415.9 },
      { x: 835, y: 415.9 },
      { x: 766.6, y: 489.5 }
    ],
    delay: 0
  }
];

function GroupCard({
  index,
  icon,
  iconVariant = "outline",
  iconOnOwnRow,
  title,
  tag,
  description,
  image
}: {
  index?: string;
  icon?: ReactNode;
  iconVariant?: "outline" | "badge";
  iconOnOwnRow?: boolean;
  title: string;
  tag: string;
  description: string;
  image: string;
}) {
  return (
    <>
      <div className="group-showcase__card-content">
        <div
          className={
            iconOnOwnRow ? "group-showcase__card-top group-showcase__card-top--column" : "group-showcase__card-top"
          }
        >
          {icon ? (
            <span
              className={
                iconVariant === "badge"
                  ? "group-showcase__card-icon group-showcase__card-icon--badge"
                  : "group-showcase__card-icon"
              }
              aria-hidden="true"
            >
              {icon}
            </span>
          ) : (
            index && <span className="group-showcase__card-index">{index}</span>
          )}
          <div className="group-showcase__card-heading">
            <h3>{title}</h3>
            <span className={icon ? "group-showcase__card-type" : "group-showcase__tag"}>{tag}</span>
          </div>
        </div>
        <p className="group-showcase__card-desc">{description}</p>
      </div>
      <div className="group-showcase__card-media">
        <Image src={image} alt={title} fill sizes="220px" />
        {!icon && (
          <>
            <span className="group-showcase__card-fade" aria-hidden="true" />
            <span className="group-showcase__card-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </>
        )}
      </div>
    </>
  );
}

const HolisticCubesIcon = (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 4 34 12v16L20 36 6 28V12L20 4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M20 14v12M14 20h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const CosmoIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="9" width="4" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 9V6.5a1 1 0 0 1 1-1 1 1 0 0 1 1 1V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M7.3 4.5h1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <rect x="14" y="7" width="4" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15 7V5a1 1 0 0 1 1-1 1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M15.3 2.5h1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const GroupRelatedIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="2" r="0.6" fill="currentColor" />
    <rect x="10" y="5" width="4" height="3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <rect x="7" y="8" width="10" height="13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path
      d="M10 11h1.2M10 14h1.2M10 17h1.2M12.8 11h1.2M12.8 14h1.2M12.8 17h1.2"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path d="M4 21h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GroupOtherIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 21V11h4v10M10 21V6h4v15M16 21v-8h4v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path
      d="M5.5 13.5h1M5.5 16.5h1M5.5 19h1M11.5 8.5h1M11.5 11.5h1M11.5 14.5h1M11.5 17.5h1M17.5 15h1M17.5 18h1"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path d="M2 21h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ReisoIcon = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mirrored so the nozzle faces right instead of left — see may-say.jpg. */}
    <g transform="scale(-1,1) translate(-24,0)">
      <rect x="2" y="7" width="17" height="5" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="4.6" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M4.6 7.6v3.8M3.2 8.1l2.8 2.8M2.7 9.5h3.8M3.2 10.9l2.8-2.8"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path d="M14.5 7v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <rect x="13" y="12" width="3" height="9" rx="1.4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15.6" y="14" width="1.1" height="2" rx="0.4" fill="currentColor" />
    </g>
  </svg>
);

export function CompanyGroupShowcase() {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const groupShowcaseRef = useRef<HTMLDivElement>(null);
  // The LINKS/ELBOW_LINKS coordinates are hand-measured at a 1440px reference
  // viewport, so the SVG viewBox must exactly match .group-showcase's actual
  // rendered size (not a hardcoded fallback) or preserveAspectRatio="none"
  // stretches it non-uniformly and every line drifts off its target.
  const [svgSize, setSvgSize] = useState(LINKS_VIEWBOX);

  useEffect(() => {
    const el = groupShowcaseRef.current;
    if (!el) return;
    const update = () => setSvgSize({ width: el.offsetWidth, height: el.offsetHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Watches the diagram (not the whole section) so this fires close to the
  // same scroll position as the circle-wrap's own Reveal trigger below,
  // keeping LINE_START_DELAY meaningful relative to when the circle appears.
  const isInView = useInView(containerRef, { once: true, amount: 0.22 });
  const reduceMotion = useReducedMotion();
  const linesRevealed = isInView || reduceMotion;

  const hoveredNode = hoveredId ? groupNetwork.nodes.find((node) => node.id === hoveredId) : null;

  return (
    <>
    <div className="group-showcase" ref={groupShowcaseRef}>
      <Reveal direction="down" className="group-showcase__header">
        <p className="eyebrow">COMPANY NETWORK</p>
        <h2>{t(groupShowcaseText.title)}</h2>
        <p>{t(groupShowcaseText.bodyA)}</p>
        <p>{t(groupShowcaseText.bodyB)}</p>
      </Reveal>

      <div className="group-showcase__intro">
        <Reveal
          direction="up"
          delay={0.18}
          className="group-showcase__card group-showcase__card--stacked group-showcase__card--left group-showcase__card--w315"
        >
          <GroupCard
            icon={CosmoIcon}
            title={t(groupNetwork.nodes[0].name)}
            tag={t(groupNetwork.nodes[0].body)}
            description={t(nodeDetails[groupNetwork.nodes[0].id].description)}
            image={nodeDetails[groupNetwork.nodes[0].id].image}
          />
        </Reveal>
        <Reveal
          direction="up"
          delay={0.24}
          className="group-showcase__card group-showcase__card--stacked group-showcase__card--left group-showcase__card--narrow"
        >
          <GroupCard
            icon={ReisoIcon}
            iconVariant="badge"
            iconOnOwnRow
            title={t(groupNetwork.nodes[2].name)}
            tag={t(groupNetwork.nodes[2].body)}
            description={t(nodeDetails[groupNetwork.nodes[2].id].description)}
            image={nodeDetails[groupNetwork.nodes[2].id].image}
          />
        </Reveal>
      </div>

      <div className="group-showcase__diagram" ref={containerRef}>
        <Reveal direction="left" className="group-showcase__circle-wrap">
          <div className="group-showcase__circle">
            <div className="group-showcase__wedges">
              {CIRCLE_WEDGES.map(({ id, clipPath }) => {
                const node = groupNetwork.nodes.find((item) => item.id === id);
                const detail = nodeDetails[id];
                if (!node || !detail) return null;
                return (
                  <button
                    type="button"
                    key={id}
                    className="group-showcase__wedge"
                    style={{ clipPath }}
                    onMouseEnter={() => setHoveredId(id)}
                    onFocus={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onBlur={() => setHoveredId(null)}
                    aria-label={t(node.name)}
                  >
                    <Image
                      src={detail.circleImage}
                      alt=""
                      fill
                      sizes="(max-width: 1080px) 340px, 460px"
                    />
                  </button>
                );
              })}
            </div>
            <div className="group-showcase__hub">
              <span className="group-showcase__hub-mark" aria-hidden="true">
                <Image src="/assets/i-logo.png" alt="" fill sizes="40px" />
              </span>
              <span className="group-showcase__hub-name">
                {hoveredNode ? t(hoveredNode.name) : t(groupNetwork.center.name)}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="group-showcase__cards">
          {groupNetwork.nodes.slice(0, 3).filter((node) => node.id === "holistic-cubes").map((node, index) => {
            const detail = nodeDetails[node.id];
            const stacked = node.id === "holistic-cubes";
            return (
              <Reveal
                key={node.id}
                delay={index * 0.08}
                direction="right"
                className={
                  stacked ? "group-showcase__card group-showcase__card--stacked" : "group-showcase__card"
                }
              >
                <GroupCard
                  index={String(index + 1).padStart(2, "0")}
                  icon={stacked ? HolisticCubesIcon : undefined}
                  title={t(node.name)}
                  tag={t(node.body)}
                  description={t(detail.description)}
                  image={detail.image}
                />
              </Reveal>
            );
          })}
        </div>

        <div className="group-showcase__cards-wide">
          {groupNetwork.nodes.slice(3, 4).map((node, index) => {
            const detail = nodeDetails[node.id];
            return (
              <Reveal
                key={node.id}
                delay={0.24 + index * 0.08}
                direction="up"
                className="group-showcase__card group-showcase__card--stacked"
              >
                <GroupCard
                  index={String(index + 4).padStart(2, "0")}
                  icon={GroupRelatedIcon}
                  iconVariant="badge"
                  iconOnOwnRow
                  title={t(node.name)}
                  tag={t(node.body)}
                  description={t(detail.description)}
                  image={detail.image}
                />
              </Reveal>
            );
          })}
        </div>

        <div className="group-showcase__cards-bottom">
          {groupNetwork.nodes.slice(4, 5).map((node, index) => {
            const detail = nodeDetails[node.id];
            return (
              <Reveal key={node.id} delay={0.32 + index * 0.08} direction="up" className="group-showcase__card">
                <GroupCard
                  index={String(index + 5).padStart(2, "0")}
                  icon={GroupOtherIcon}
                  iconVariant="badge"
                  title={t(node.name)}
                  tag={t(node.body)}
                  description={t(detail.description)}
                  image={detail.image}
                />
              </Reveal>
            );
          })}
        </div>
      </div>

      <svg
        aria-hidden="true"
        className="group-showcase__links"
        preserveAspectRatio="none"
        viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
      >
        {LINKS.map((line, index) => (
          <motion.g
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: linesRevealed ? 1 : 0 }}
            transition={{
              duration: reduceMotion ? 0 : LINE_DURATION,
              delay: reduceMotion ? 0 : LINE_DELAYS[index],
              ease: EASE
            }}
          >
            <line x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
            <circle cx={line.x1} cy={line.y1} r={4} />
          </motion.g>
        ))}
        {ELBOW_LINKS.map((elbow, index) => (
          <motion.g
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: linesRevealed ? 1 : 0 }}
            transition={{
              duration: reduceMotion ? 0 : LINE_DURATION,
              delay: reduceMotion ? 0 : elbow.delay,
              ease: EASE
            }}
          >
            <polyline
              points={elbow.points.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
            />
            <circle cx={elbow.points[0].x} cy={elbow.points[0].y} r={4} />
            <circle cx={elbow.points[2].x} cy={elbow.points[2].y} r={4} />
          </motion.g>
        ))}
      </svg>
    </div>
    <Reveal direction="up" delay={0.4} className="group-showcase__all-link-wrap">
      <a href="#" className="button group-showcase__all-link">
        {t(groupShowcaseText.link)}
        <span aria-hidden="true">→</span>
      </a>
    </Reveal>
    </>
  );
}

const groupShowcaseText = {
  title: {
    jp: "美の未来を、多彩な事業でつくる。",
    en: "Building the future of beauty through diverse businesses."
  },
  bodyA: {
    jp: "コスモホールディングスを中心に、美容ディーラー事業から美容機器の開発・製造、",
    en: "Centered around Cosmo Holdings, the business ranges from beauty product dealerships to the development and manufacturing of beauty equipment."
  },
  bodyB: {
    jp: "貿易·婚礼貸衣裳業、不動産事業まで、多彩な事業を展開しています。",
    en: "We are engaged in a wide variety of businesses, including trading, wedding costume rental, and real estate business."
  },
  link: { jp: "グループ会社一覧を見る", en: "View all group companies" }
};
