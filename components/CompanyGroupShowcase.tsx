"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/ui/Reveal";
import { useLanguage } from "@/components/ui/LanguageProvider";
import { groupNetwork, type LocalizedText } from "@/data/site-data";

const holdingDetail: { image: string; description: LocalizedText } = {
  image: "/assets/office-space.png",
  description: {
    jp: "グループ全体の戦略立案・経営管理を担い、各社のシナジーを最大化。持続的な成長をリードします。",
    en: "Leads group-wide strategy and management, maximizing synergy across companies to drive sustainable growth."
  }
};

const nodeDetails: Record<string, { image: string; description: LocalizedText }> = {
  cosmo: {
    image: "/assets/cosmo-sales-hero.png",
    description: {
      jp: "全国のサロンに向けて、多様な美容商材とソリューションを提供。サロンの成長を支えます。",
      en: "Delivers a wide range of beauty products and solutions to salons nationwide, supporting their growth."
    }
  },
  reiso: {
    image: "/assets/image-1.png",
    description: {
      jp: "プロ品質の美容機器を企画・開発・製造。技術力でサロンワークの価値を高めます。",
      en: "Plans, develops, and manufactures pro-quality beauty devices, raising the value of salon work through technology."
    }
  },
  "holistic-cubes": {
    image: "/assets/holistic-lab.png",
    description: {
      jp: "独自の発想と技術で、新しい美容体験を生み出すブランドを展開。",
      en: "Builds a brand that creates new beauty experiences through original ideas and technology."
    }
  },
  "group-related": {
    image: "/assets/team-meeting.png",
    description: {
      jp: "グループの強みを活かし、新たな価値を生む事業を展開。",
      en: "Leverages group strengths to develop businesses that create new value."
    }
  },
  "group-other": {
    image: "/assets/brand-showroom.png",
    description: {
      jp: "多様な専門性を結集し、事業の可能性を広げます。",
      en: "Brings together diverse expertise to expand the possibilities of the business."
    }
  }
};

const quadrantOrder = ["cosmo", "reiso", "holistic-cubes", "group-related"];

const LINKS_VIEWBOX = { width: 1340, height: 825 };

const LINKS = [
  { x1: 718, y1: 194, x2: 880, y2: 6 },
  { x1: 764, y1: 259, x2: 880, y2: 213 },
  { x1: 765, y1: 378, x2: 880, y2: 420 },
  { x1: 654, y1: 480, x2: 695, y2: 628 },
  { x1: 466, y1: 401, x2: 340, y2: 472 }
];

const LINE_DURATION = 0.4;
// Each line shares the same delay as the Reveal of the card it connects to
// (see the Reveal `delay` props below), so the line and its card fade in
// together. Order matches LINKS: item1, item2, item3, item4, holding card.
const LINE_DELAYS = [0, 0.08, 0.16, 0.24, 0.1];
const EASE = [0.22, 1, 0.36, 1] as const;

function GroupCard({
  index,
  title,
  tag,
  description,
  image
}: {
  index?: string;
  title: string;
  tag: string;
  description: string;
  image: string;
}) {
  return (
    <>
      <div className="group-showcase__card-content">
        <div className="group-showcase__card-top">
          {index && <span className="group-showcase__card-index">{index}</span>}
          <div className="group-showcase__card-heading">
            <h3>{title}</h3>
            <span className="group-showcase__tag">{tag}</span>
          </div>
        </div>
        <p className="group-showcase__card-desc">{description}</p>
      </div>
      <div className="group-showcase__card-media">
        <Image src={image} alt={title} fill sizes="220px" />
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
      </div>
    </>
  );
}

export function CompanyGroupShowcase() {
  const { t } = useLanguage();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Watches the diagram (not the whole section) so this fires close to the
  // same scroll position as the circle-wrap's own Reveal trigger below,
  // keeping LINE_START_DELAY meaningful relative to when the circle appears.
  const isInView = useInView(containerRef, { once: true, amount: 0.22 });
  const reduceMotion = useReducedMotion();
  const linesRevealed = isInView || reduceMotion;

  const hoveredNode = hoveredId ? groupNetwork.nodes.find((node) => node.id === hoveredId) : null;

  return (
    <div className="group-showcase">
      <div className="group-showcase__intro">
        <Reveal direction="down" className="group-showcase__intro-copy">
          <p className="eyebrow">COMPANY NETWORK</p>
          <h2>{t(groupShowcaseText.title)}</h2>
          <p>{t(groupShowcaseText.bodyA)}</p>
          <p>{t(groupShowcaseText.bodyB)}</p>
        </Reveal>
        <Reveal direction="up" delay={0.1} className="group-showcase__card group-showcase__holding-card">
          <GroupCard
            title={t(groupNetwork.center.name)}
            tag={t(groupNetwork.center.body)}
            description={t(holdingDetail.description)}
            image={holdingDetail.image}
          />
        </Reveal>
        <Reveal direction="up" delay={0.16}>
          <a href="#" className="button group-showcase__all-link">
            {t(groupShowcaseText.link)}
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>

      <div className="group-showcase__diagram" ref={containerRef}>
        <Reveal direction="left" className="group-showcase__circle-wrap">
          <div className="group-showcase__circle">
            <div className="group-showcase__quadrants">
              {quadrantOrder.map((id) => {
                const node = groupNetwork.nodes.find((item) => item.id === id);
                const detail = nodeDetails[id];
                if (!node || !detail) return null;
                return (
                  <button
                    type="button"
                    key={id}
                    className="group-showcase__quadrant"
                    onMouseEnter={() => setHoveredId(id)}
                    onFocus={() => setHoveredId(id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onBlur={() => setHoveredId(null)}
                    aria-label={t(node.name)}
                  >
                    <Image src={detail.image} alt="" fill sizes="220px" />
                  </button>
                );
              })}
            </div>
            <div className="group-showcase__hub">
              <span className="group-showcase__hub-ring group-showcase__hub-ring--1" aria-hidden="true" />
              <span className="group-showcase__hub-ring group-showcase__hub-ring--2" aria-hidden="true" />
              <span className="group-showcase__hub-ring group-showcase__hub-ring--3" aria-hidden="true" />
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
          {groupNetwork.nodes.slice(0, 3).map((node, index) => {
            const detail = nodeDetails[node.id];
            return (
              <Reveal
                key={node.id}
                delay={index * 0.08}
                direction="right"
                className="group-showcase__card"
              >
                <GroupCard
                  index={String(index + 1).padStart(2, "0")}
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
          {groupNetwork.nodes.slice(3, 5).map((node, index) => {
            const detail = nodeDetails[node.id];
            return (
              <Reveal
                key={node.id}
                delay={0.24 + index * 0.08}
                direction="up"
                className="group-showcase__card"
              >
                <GroupCard
                  index={String(index + 4).padStart(2, "0")}
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
        viewBox={`0 0 ${LINKS_VIEWBOX.width} ${LINKS_VIEWBOX.height}`}
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
      </svg>
    </div>
  );
}

const groupShowcaseText = {
  title: {
    jp: "美の未来を、\n多彩な事業でつくる。",
    en: "Building the future of beauty\nthrough diverse businesses."
  },
  bodyA: {
    jp: "コスモホールディングスを中心に、美容ディーラー事業から美容機器の開発・製造、ブランド事業まで。",
    en: "Centered on Cosmo Holdings, our group spans beauty product distribution, device development and manufacturing, and brand businesses."
  },
  bodyB: {
    jp: "それぞれの強みを掛け合わせ、美容の可能性を広げています。",
    en: "By combining each company's strengths, we keep expanding what's possible in beauty."
  },
  link: { jp: "グループ会社一覧を見る", en: "View all group companies" }
};
