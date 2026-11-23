'use client';

/**
 * The SST page's own sections: the live page's blocks that the SSB components have no slot for, built
 * from SSB's parts so they read as one system. Every section opens with the same header (eyebrow in
 * the brand blue, a display title in two tones, a secondary line), every card is the page's card (its
 * surface, a hairline, 8px corners). Companies inside cards are their mark and name (CompanyMark);
 * everywhere else, their full logo.
 */
import * as React from 'react';
import { Button, Container, Heading, Section, Text } from '@kishanscaler/ssx-ui';
import {
  ArrowUpRight,
  BookOpenText,
  Briefcase,
  Buildings,
  CalendarBlank,
  CaretRight,
  CheckCircle,
  Cube,
  DownloadSimple,
  Flask,
  Heart,
  House,
  Lightning,
  MapPin,
  PlayIcon,
  RocketLaunch,
  Sparkle,
  Star,
  UserFocus,
  UsersThree,
  YoutubeLogo,
  Hammer,
  type Icon,
} from '@phosphor-icons/react';

import {
  sstAdmissions,
  sstCallback,
  sstCampusCity,
  sstCareer,
  sstCompare,
  sstDegree,
  sstEvents,
  sstInternship,
  sstOutcomes,
  sstPlacementFilm,
  sstProgrammes,
  sstSocial,
  sstStories,
  sstTour,
  sstWhy,
  type CampusIcon,
} from '@/content/sst';
import { SessionCard } from '@/sections/community/SessionCard';
import { useSectionEntrance } from '@/sections/faculty/useSectionEntrance';
import { Lightbox } from '@/sections/learn-by-doing/LearnByDoingSection';
import { RowSection } from '@/sections/shared/RowSection';
import { Title } from '@/sections/shared/Title';
import { CompanyMark } from './CompanyMark';
import '@/sections/learn-by-doing/learn-by-doing.css';
import '@/sections/community/community.css';
import '@/sections/people-tabs/people-tabs.css';
import '@/sections/deck/deck-global.css';
import './sst-hero.css';
import './sst.css';

type Video = { id: string; title: string; image: string };

/** The page's section header: eyebrow, display title ("Lead.|Tail."), the line under it; an aside at the right. */
export function SectionHead({ id, eyebrow, title, sub, aside, className, as = 'h2' }: { id: string; eyebrow?: string; title: string; sub?: string; aside?: React.ReactNode; className?: string; as?: 'h2' | 'h3' }) {
  return (
    <div className={`ss-head${className ? ` ${className}` : ''}`} data-enter="header">
      <div className="ss-head-copy">
        {eyebrow ? (
          <Heading as="p" size="eyebrow" className="text-content-brand" data-enter="eyebrow">
            {eyebrow}
          </Heading>
        ) : null}
        <Heading as={as} size={as === 'h2' ? 'display' : '1'} id={id} data-enter="headline">
          <Title text={title} />
        </Heading>
        {sub ? (
          <Text size="lg" tone="secondary" data-enter="sub">
            {sub}
          </Text>
        ) : null}
      </div>
      {aside ? <div className="ss-head-aside" data-enter="controls">{aside}</div> : null}
    </div>
  );
}

/** A film's still that opens it in the lightbox. */
function VideoStill({ video, onPlay, className = '' }: { video: Video; onPlay: (v: Video) => void; className?: string }) {
  return (
    <button type="button" className={`ss-still ${className}`} onClick={() => onPlay(video)} aria-label={`Play video: ${video.title}`} data-part="photo">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={video.image} alt="" width={1280} height={720} loading="lazy" decoding="async" />
      <span className="lb-play-disc" aria-hidden="true">
        <PlayIcon weight="fill" />
      </span>
    </button>
  );
}

function useLightbox() {
  const [open, setOpen] = React.useState<Video | null>(null);
  const box = open ? <Lightbox id={open.id} title={open.title} onClose={() => setOpen(null)} /> : null;
  return [setOpen, box] as const;
}

/** A figure that counts up from zero once it comes on screen ("20,000", "3.9%", "₹2 lakh"); its final
 *  text is rendered from the first paint for screen readers and no-JS, and under reduced motion. */
function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [text, setText] = React.useState(value);
  React.useEffect(() => {
    const el = ref.current;
    const m = /^([^\d]*)([\d,]*\.?\d+)(.*)$/.exec(value);
    if (!el || !m || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ''));
    const decimals = (num.split('.')[1] ?? '').length;
    const fmt = (n: number) => pre + n.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + post;
    setText(fmt(0));
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / duration);
          const eased = 1 - Math.pow(1 - k, 4);
          setText(k < 1 ? fmt(target * eased) : value);
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);
  return (
    <span ref={ref} className="ss-count" aria-label={value}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}

/* ── placements: the film, in the outcomes card's press slot ───────────────────────────────── */

export function PlacementFilmCard() {
  const [play, box] = useLightbox();
  const c = sstPlacementFilm;
  return (
    <article className="dko-press spf">
      <h3 className="spf-title">{c.title}</h3>
      <p className="spf-line">{c.line}</p>
      <VideoStill video={c.video} onPlay={play} className="spf-video" />
      {box}
    </article>
  );
}

/** The companies on campus: their full logos on one running line, no cells or outlines. */
export function CompaniesTicker() {
  const c = sstOutcomes;
  const logos = c.recruiterLogos ?? [];
  return (
    <Section density="roomy" aria-labelledby="co-title" className="co ss-tight">
      <Container>
        <Heading as="h3" size="3" id="co-title" className="co-title">
          {c.recruitersTitle}
        </Heading>
      </Container>
      <div className="co-marquee" aria-label={c.recruitersLabel}>
        <div className="co-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <ul key={copy} className="co-set">
              {logos.map((l) => (
                <li key={l.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.logoUrl} alt="" loading="lazy" decoding="async" data-crop={l.logoUrl?.includes('/rec/') || undefined} data-name={l.name.toLowerCase()} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── internship highlights, Anupam Mittal, the report, the degree ──────────────────────────── */

/** A rough world map, 48 × 24 cells of 7.5°, north at the top, from 180°W: the land a dotted globe draws. */
const WORLD = [
  '................................................',
  '............####.......###......................',
  '....########.####....#.......################...',
  '...##########.###....##....##################...',
  '.....#########.......###..####################..',
  '......########.......####.#################.....',
  '.......#######.......#####################......',
  '........#####........#####.##########.###.......',
  '.........###........#########.#######..##.......',
  '..........##........#########..###.#..#.........',
  '...........##.......########....##....##........',
  '............###......######.......#...###.......',
  '............#####.....#####.........#####.......',
  '............######....####...........####.......',
  '.............#####....####..............#.......',
  '.............####......##.........######........',
  '.............###.......##........########.......',
  '..............##..................#####.........',
  '..............#...................##..........#.',
  '..............#.................................',
  '................................................',
  '................................................',
  '..######..########..##########..########..####..',
  '################################################',
];

/** A dotted globe turning smoothly: ~1,800 points spread evenly over a sphere (a Fibonacci lattice),
 *  each rotating in 3D every frame, so the dots travel across the face as a globe's do. Land points are
 *  blue, larger and darker toward the middle; sea points faint; the far side is hidden. A slight tilt
 *  so it reads as a globe. No disc or shadow behind it. Turns only on screen; still under reduced motion. */
const GLOBE_POINTS = (() => {
  const n = 1800;
  const pts: { x: number; y: number; z: number; land: boolean }[] = [];
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - ((i + 0.5) / n) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = g * i;
    const x = Math.cos(th) * r;
    const z = Math.sin(th) * r;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = (Math.atan2(x, z) * 180) / Math.PI + 180;
    const row = WORLD[Math.min(23, Math.max(0, Math.floor((90 - lat) / 7.5)))];
    pts.push({ x, y, z, land: row[Math.floor(lon / 7.5) % 48] === '#' });
  }
  return pts;
})();

function Globe() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return undefined;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = cv.clientWidth || 96;
    cv.width = cv.height = size * dpr;
    ctx.scale(dpr, dpr);
    const R = size / 2 - 2;
    const c = size / 2;
    const tilt = 0.32;
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    ctx.fillStyle = getComputedStyle(cv).color || '#0245b9';
    let a = 2.2;
    let raf = 0;
    let on = false;
    let prev = 0;
    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      for (const p of GLOBE_POINTS) {
        const x = p.x * ca + p.z * sa;
        const z1 = -p.x * sa + p.z * ca;
        const y = p.y * ct - z1 * st;
        const z = p.y * st + z1 * ct;
        if (z <= 0.02) continue;
        ctx.globalAlpha = p.land ? 0.5 + 0.5 * z : 0.06 + 0.08 * z;
        ctx.beginPath();
        ctx.arc(c + x * R, c - y * R, p.land ? 0.6 + 0.7 * z : 0.45, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    const tick = (now: number) => {
      const dt = prev ? Math.min(50, now - prev) : 16;
      prev = now;
      a += dt * 0.00035;
      draw();
      if (on) raf = requestAnimationFrame(tick);
    };
    draw();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      prev = 0;
      cancelAnimationFrame(raf);
      if (on) raf = requestAnimationFrame(tick);
    });
    io.observe(cv);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={ref} className="ih-globe" aria-hidden="true" />;
}

/** The dots of the internship rate: 160, well spaced (about the globe's land dots in view), laid out as a sunflower spiral so they fill a true disc evenly; ordered clockwise from the
 *  top so they fill like a pie, each with its delay from its angle. */
const RATE_DOTS = (() => {
  const n = 160;
  const g = Math.PI * (3 - Math.sqrt(5));
  const out: { x: number; y: number; ang: number }[] = [];
  for (let i = 0; i < n; i++) {
    const r = 52 * Math.sqrt((i + 0.5) / n);
    const th = i * g;
    const dx = r * Math.sin(th);
    const dy = -r * Math.cos(th);
    out.push({ x: 55 + dx, y: 55 + dy, ang: (Math.atan2(dx, -dy) + 2 * Math.PI) % (2 * Math.PI) });
  }
  return out.sort((p, q) => p.ang - q.ang);
})();

/** The internship rate as a circle of dots filling clockwise to the share (96%), the rest pale. Drawn
 *  filled under reduced motion. */
function RateDots({ percent }: { percent: number }) {
  const ref = React.useRef<SVGSVGElement>(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = Math.round((percent / 100) * RATE_DOTS.length);
  return (
    <svg ref={ref} className="ih-dots" viewBox="0 0 110 110" data-on={on || undefined} aria-hidden="true">
      {RATE_DOTS.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} r="2.3" data-fill={i < n || undefined} style={{ '--d': `${((d.ang / (2 * Math.PI)) * 1.4).toFixed(2)}s` } as React.CSSProperties} />
      ))}
    </svg>
  );
}

export function InternshipSection() {
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.ih-grid > li', '.mt-card', '.dg-card'] });
  const [play, box] = useLightbox();
  const c = sstInternship;
  const d = sstDegree;
  return (
    <Section ref={ref} id="internship" density="roomy" aria-labelledby="ih-title" className="ih">
      <Container>
        <SectionHead id="ih-title" eyebrow={c.eyebrow} title={c.title} sub="From the first batch: internships at startups and tech companies in India and abroad." />
        <ul className="ih-grid">
          {c.cards.map((k) => (
            <li key={k.value} className="ih-card" data-kind={k.kind}>
              <div className="ih-top">
                <span className="ih-visual" aria-hidden="true">
                  {k.kind === 'ring' ? (
                    <RateDots percent={k.percent} />
                  ) : k.kind === 'globe' ? (
                    <Globe />
                  ) : (
                    <>
                      <span className="ih-orbit" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={k.image} alt="" loading="lazy" decoding="async" />
                    </>
                  )}
                </span>
                <p className="ih-figure">
                  <CountUp value={k.value} />
                  <span>{k.unit}</span>
                </p>
              </div>
              <p className="ih-text">{k.text}</p>
            </li>
          ))}
        </ul>

        <article className="mt-card">
          <div className="mt-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.mittal.image} alt="Anupam Mittal with SST students on campus" loading="lazy" decoding="async" />
          </div>
          <div className="mt-body">
            <p className="mt-eyebrow">{c.mittal.eyebrow}</p>
            <blockquote className="mt-quote">
              {c.mittal.quote} <span>{c.mittal.quoteTail}</span>
            </blockquote>
            <p className="mt-who">
              <b>{c.mittal.name}</b>
              {c.mittal.role}
            </p>
          </div>
          <div className="mt-report" id="internship-report">
            <div className="mt-report-copy">
              <p className="mt-report-title">{c.report.title}</p>
              <div className="mt-audits">
                <p className="mt-audit">
                  <span>{c.report.auditedBy.label}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.report.auditedBy.src} alt={c.report.auditedBy.alt} loading="lazy" />
                </p>
                <p className="mt-audit">
                  <span>{c.report.auditees.label}</span>
                  {c.report.auditees.logos.map((l) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={l.alt} src={l.src} alt={l.alt} loading="lazy" />
                  ))}
                </p>
              </div>
            </div>
            <Button asChild size="md" variant="primary" className="mt-cta">
              <a href={c.report.cta.href}>
                {c.report.cta.label}
                <DownloadSimple weight="regular" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </article>

        {/* placements & the degree, right under it */}
        <article id="degree" className="dg-card">
          <div className="dg-copy">
            <p className="dg-eyebrow">{d.eyebrow}</p>
            <Heading as="h3" size="1" className="dg-title">
              <Title text={d.title} />
            </Heading>
            <p className="dg-line">{d.line}</p>
          </div>
          <VideoStill video={d.video} onPlay={play} className="dg-video" />
        </article>
      </Container>
      {box}
    </Section>
  );
}

/* ── stellar career prospects: one screen, as the live page ────────────────────────────────── */

export function CareerSection() {
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.cx-bento > *'] });
  const c = sstCareer;
  return (
    <Section ref={ref} id="outcomes" density="roomy" aria-labelledby="cr-title" className="cx overflow-x-clip">
      <Container>
        <SectionHead id="cr-title" eyebrow={c.eyebrow} title={c.title} />
        <div className="cx-bento">
          <article className="cx-card cx-gsoc">
            <div className="cx-gsoc-copy">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="cx-gsoc-logo" src={c.gsoc.image} alt="Google Summer of Code" />
              <p className="cx-gsoc-title">
                {c.gsoc.lead} <span>{c.gsoc.accent}</span> {c.gsoc.tail}
              </p>
              <p className="sx-text">{c.gsoc.line}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cx-gsoc-photo" src={c.gsoc.photo} alt="SST students selected for Google Summer of Code" loading="lazy" decoding="async" />
          </article>
          <article className="cx-card cx-amazon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cx-amazon-logo" src={c.amazon.logo} alt="Amazon" loading="lazy" />
            <p className="cx-small">{c.amazon.text}</p>
          </article>
          <article className="cx-card cx-partners">
            <p className="cx-figure">
              <CountUp value={c.partners.value} />
            </p>
            <p className="cx-small">{c.partners.text}</p>
          </article>
          <article className="cx-card cx-startups">
            <div className="cx-startups-copy">
              <p className="cx-figure">
                <CountUp value={c.startups.value} />
              </p>
              <p className="cx-small">{c.startups.text}</p>
            </div>
            <div className="cx-startups-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.startups.image} alt="An Innovation Lab founder featured on Shark Tank India" loading="lazy" decoding="async" />
              <a className="cx-watch" href={c.startups.cta.href} target="_blank" rel="noopener noreferrer">
                <PlayIcon weight="fill" aria-hidden="true" />
                {c.startups.cta.label}
              </a>
            </div>
          </article>
        </div>
      </Container>

      {/* Scaler's alumni: the companies' full logos drifting by */}
      <div className="cx-alumni">
        <Container>
          <Heading as="h3" size="3" className="cx-alumni-title">
            {c.alumniTitle}
          </Heading>
        </Container>
        <div className="cx-marquee" aria-label={c.alumniTitle}>
          <div className="cx-marquee-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <ul key={copy} className="cx-marquee-set">
                {c.alumni.map((l) => (
                  <li key={l.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.src} alt="" loading="lazy" decoding="async" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <Container>
          <p className="cx-note">{c.alumniNote}</p>
        </Container>
      </div>
    </Section>
  );
}

/** Amitabh Kant on Scaler: the portrait standing in a brand panel, his words beside it. */
export function KantSection() {
  const c = sstCareer.kant;
  return (
    <Section density="roomy" aria-label={`${c.name} on Scaler`} className="ss-tight">
      <Container>
        <figure className="kt-card">
          <div className="kt-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.photo} alt={c.name} loading="lazy" decoding="async" />
          </div>
          <div className="kt-body">
            <blockquote className="kt-quote">
              {c.quote} <span>{c.quoteTail}</span>
            </blockquote>
            <figcaption className="kt-who">
              <span className="kt-name">
                <b>{c.name}</b>
                {c.role}
              </span>
              <span className="kt-logos">
                {c.logos.map((l) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={l.alt} src={l.src} alt={l.alt} loading="lazy" />
                ))}
              </span>
            </figcaption>
          </div>
        </figure>
      </Container>
    </Section>
  );
}

/* ── programmes ─────────────────────────────────────────────────────────────────────────────── */

export function ProgrammesSection() {
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.pg-grid > article'] });
  const [play, box] = useLightbox();
  const c = sstProgrammes;
  return (
    <Section ref={ref} id="programmes" density="roomy" aria-labelledby="pg-title">
      <Container>
        <SectionHead id="pg-title" eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
        <div className="pg-grid">
          {c.cards.map((p) => (
            <article key={p.id} className="pg-card">
              <VideoStill video={p.video} onPlay={play} className="pg-video" />
              <div className="pg-body">
                <p className="pg-kicker" data-part="title">
                  {p.kicker}
                </p>
                <Heading as="h3" size="2" className="pg-title" data-part="title">
                  {p.label}
                </Heading>
                <p className="pg-line" data-part="description">
                  {p.line}
                </p>
                <p className="pg-label">Key highlights</p>
                <ul className="pg-highlights" data-part="description">
                  {p.highlights.map((h) => (
                    <li key={h.text}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={h.icon} alt="" loading="lazy" />
                      <span>{h.text}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" variant="primary" className="pg-cta">
                  <a href={p.cta.href}>
                    {p.cta.label}
                    <ArrowUpRight weight="bold" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
      {box}
    </Section>
  );
}

/* ── headlines from SST: the talks' cards, with the story's photo ─────────────────────────── */

function StoryImageCard({ company, blurb, image, href }: (typeof sstStories.companies)[number]) {
  return (
    <article className="sc stc">
      <div className="tk-media stc-media" data-part="photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
      </div>
      <div className="sc-body tk-body stc-body">
        <h3 className="sc-title stc-title" data-part="title">
          {company}
        </h3>
        <p className="sc-text stc-text" data-part="description">
          {blurb}
        </p>
        {href ? (
          <Button asChild size="md" variant="secondary" className="stc-cta" data-part="logos">
            <a href={href} target="_blank" rel="noopener noreferrer">
              Read the Full Story
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
          </Button>
        ) : null}
      </div>
    </article>
  );
}

/** the story cards: four and a half in view on desktop, from the page's left margin to the window's
    right edge */
const CARD_W = 'max(16rem, calc((100vw - (max(0px, (100vw - var(--size-container-max)) / 2) + var(--space-gutter)) - 4 * var(--space-4)) / 4.5))';

export function StoriesSection() {
  const c = sstStories;
  return (
    <RowSection id="stories" eyebrow={c.eyebrow} title={`${c.title}|${c.titleTail}`} itemName="story" cardWidth={CARD_W}>
      {c.companies.map((s) => (
        <StoryImageCard key={s.company} {...s} />
      ))}
    </RowSection>
  );
}

/* ── choose your best fit ──────────────────────────────────────────────────────────────────── */

const COMPARE_ICONS: Record<string, Icon> = { excite: Lightning, who: UserFocus, learn: BookOpenText, experience: Star, career: Briefcase };

export function CompareSection() {
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.cp-table'] });
  const [pick, setPick] = React.useState(0);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = React.useState<{ x: number; w: number } | null>(null);
  const c = sstCompare;
  React.useLayoutEffect(() => {
    const measure = () => {
      const t = tabs.current[pick];
      if (t) setPill({ x: t.offsetLeft, w: t.offsetWidth });
    };
    measure();
    const row = tabs.current[0]?.parentElement;
    if (!row || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => ro.disconnect();
  }, [pick]);
  return (
    <Section ref={ref} id="compare" density="roomy" aria-labelledby="cp-title">
      <Container>
        <SectionHead
          id="cp-title"
          eyebrow={c.eyebrow}
          title={c.title}
          sub={c.sub}
          aside={
            <div className="pt-switch cp-switch" role="tablist" aria-label="Programmes">
              {pill ? <span className="pt-pill" style={{ transform: `translateX(${pill.x}px)`, width: pill.w }} aria-hidden="true" /> : null}
              {['CS & AI', 'AI & B'].map((t, i) => (
                <button key={t} type="button" role="tab" aria-selected={i === pick} className="pt-tab" ref={(el) => { tabs.current[i] = el; }} onClick={() => setPick(i)}>
                  {t}
                </button>
              ))}
            </div>
          }
        />
        <div className="cp-table" role="table" aria-label="CS & AI and AI & Business compared" data-pick={pick}>
          <div className="cp-tr cp-th" role="row">
            <span role="columnheader">Parameter</span>
            <span role="columnheader">{c.colA}</span>
            <span role="columnheader">{c.colB}</span>
          </div>
          {c.rows.map((r) => {
            const I = COMPARE_ICONS[r.icon];
            return (
              <div key={r.k} className="cp-tr" role="row">
                <span role="rowheader">
                  <I className="cp-ico" weight="regular" aria-hidden="true" />
                  {r.k}
                </span>
                <span role="cell" data-col="a">{r.a}</span>
                <span role="cell" data-col="b">{r.b}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/* ── why SST: the four pillars ─────────────────────────────────────────────────────────────── */

const w = sstWhy;

function PillarHead({ id, title, sub }: { id: string; title: string; sub: string }) {
  return (
    <div className="ss-head ss-head--pillar">
      <div className="ss-head-copy">
        <Heading as="h3" size="1" id={id} data-enter="headline">
          <Title text={title} />
        </Heading>
        <Text size="lg" tone="secondary" data-enter="sub">
          {sub}
        </Text>
      </div>
    </div>
  );
}

/** 01: the curriculum's films, on the super mentors' video cards. */
export function WhyBuild() {
  return (
    <RowSection id="why-build-row" title={w.build.title} heading={<PillarHead id="why-build-row-title" title={w.build.title} sub={w.build.sub} />} itemName="video" cardWidth="22rem">
      {w.build.videos.map((v) => (
        <SessionCard key={v.videoId} {...v} />
      ))}
    </RowSection>
  );
}

/** 02: the talks on campus, each with the speaker's company. */
export function WhyLeaders() {
  return (
    <RowSection id="why-leaders-row" title={w.leaders.title} heading={<PillarHead id="why-leaders-row-title" title={w.leaders.title} sub={w.leaders.sub} />} itemName="session" cardWidth="22rem">
      {w.leaders.sessions.map((s) => (
        <SessionCard key={s.videoId} {...s} />
      ))}
    </RowSection>
  );
}

/** A crossfading slideshow: each slide's photo with its label and line at the foot, a progress bar per
 *  slide, moving on every 4.5s (held on hover and under reduced motion). */
function Slideshow({ slides }: { slides: { src: string; label: string; text: string }[] }) {
  const [i, setI] = React.useState(0);
  const [hold, setHold] = React.useState(false);
  React.useEffect(() => {
    if (hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = window.setTimeout(() => setI((k) => (k + 1) % slides.length), 4500);
    return () => window.clearTimeout(t);
  }, [i, hold, slides.length]);
  const s = slides[i];
  return (
    <div className="in-show" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)} data-hold={hold || undefined}>
      {slides.map((x, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={x.src} src={x.src} alt={k === i ? `${x.label}: ${x.text}` : ''} aria-hidden={k === i ? undefined : true} data-on={k === i || undefined} loading="lazy" decoding="async" />
      ))}
      <span className="in-show-shade" aria-hidden="true" />
      <div key={i} className="in-show-copy">
        <p className="in-show-label">{s.label}</p>
        <p className="in-show-text">{s.text}</p>
      </div>
      <div className="in-show-bars" role="tablist" aria-label="Slides">
        {slides.map((x, k) => (
          <button key={x.src} type="button" role="tab" aria-selected={k === i} aria-label={x.label} className="in-show-bar" data-past={k < i || undefined} onClick={() => setI(k)}>
            <span key={k === i ? `on-${i}` : 'off'} />
          </button>
        ))}
      </div>
    </div>
  );
}

/** 03: the lab's 7+ startups as a slideshow beside the figure, then the humanoid, the grant and Scaler
 *  AI Labs, on a deep-blue stage. */
export function WhyInnovation() {
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.in-bento > *'] });
  const [play, box] = useLightbox();
  const c = w.innovation;
  return (
    <Section ref={ref} density="roomy" aria-labelledby="why-innovation-block-title">
      <Container>
        <PillarHead id="why-innovation-block-title" title={c.title} sub={c.sub} />
        <div className="in-bento">
          <article className="in-card in-startups">
            <Slideshow slides={c.startups.slides} />
            <div className="in-startups-copy">
              <p className="in-card-title in-startups-title">
                <CountUp value={c.startups.value} /> {c.startups.label}
              </p>
              <p className="in-text">{c.startups.text}</p>
              <p className="in-founded-title">{c.startups.foundedTitle}</p>
              <ul className="in-founded">
                {c.startups.founded.map((l) => (
                  <li key={l.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={l.src} alt={l.name} loading="lazy" />
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <article className="in-card in-humanoid">
            <VideoStill video={c.humanoid.video} onPlay={play} className="in-video" />
            <div className="in-card-body">
              <p className="in-card-title">{c.humanoid.title}</p>
              <p className="in-text">{c.humanoid.text}</p>
              <p className="in-person">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.humanoid.person.photo} alt="" loading="lazy" />
                <span>
                  <b>{c.humanoid.person.name}</b>
                  {c.humanoid.person.role}
                </span>
              </p>
            </div>
          </article>
          <article className="in-card in-grant">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="in-card-photo" src={c.grant.image} alt="" loading="lazy" decoding="async" />
            <div className="in-card-body">
              <p className="in-card-title">{c.grant.title}</p>
              <p className="in-text">{c.grant.text}</p>
              <Button asChild size="md" variant="secondary" className="stc-cta in-cta">
                <a href={c.grant.href} target="_blank" rel="noopener noreferrer">
                  Read the Full Story
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </article>
          <article className="in-card in-labs">
            <div className="in-labs-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.aiLabs.image} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="in-card-body">
              <p className="in-card-title">{c.aiLabs.title}</p>
              <p className="in-formerly">{c.aiLabs.formerly}</p>
              <p className="in-text">{c.aiLabs.text}</p>
              <Button asChild size="md" variant="tertiary" className="in-cta in-cta-tertiary">
                <a href={c.aiLabs.href} target="_blank" rel="noopener noreferrer">
                  Learn more
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </article>
        </div>
      </Container>
      {box}
    </Section>
  );
}

/** 04: the batch's admission funnel counting up beside the cohort's photo, the universities, then the
 *  students who turned down prestigious offers. */
export function WhyPeers() {
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.pe-photo', '.sw-students > li'] });
  const c = w.peers;
  return (
    <Section ref={ref} density="roomy" aria-labelledby="why-peers-block-title">
      <Container>
        <PillarHead id="why-peers-block-title" title={c.title} sub={c.sub} />
        <div className="pe-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.image.src} alt={c.image.alt} loading="lazy" decoding="async" />
          <div className="pe-overlay">
            <p className="pe-overlay-title">{c.statsLabel}</p>
            <dl className="pe-stats">
              {c.stats.map((s, i) => (
                <div key={s.label} className="pe-stat" data-lead={i === c.stats.length - 1 || undefined}>
                  <dd>
                    <CountUp value={s.value} duration={1800} />
                  </dd>
                  <dt>{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="pe-card">
          <div className="pe-card-copy">
            <p className="pe-offers">{c.offers}</p>
            <Button asChild size="md" variant="primary" className="pe-dir-cta">
              <a href={c.directory.href}>
                {c.directory.label}
                <ArrowUpRight weight="bold" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="pe-unis-marquee" aria-label={`Universities that made offers: ${c.universities.map((u) => u.name).join(', ')}`}>
            <div className="pe-unis-track" aria-hidden="true">
              {[0, 1, 2, 3].map((copy) => (
                <ul key={copy} className="pe-unis-set">
                  {c.universities.map((u) => (
                    <li key={u.name}>
                      <CompanyMark company={u} size="md" />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="pe-list">
        <p className="pe-kicker">{c.leftKicker}</p>
        <Heading as="h4" size="3" className="sw-students-title">
          {c.leftTitle}
        </Heading>
        <ul className="sw-students">
          {c.students.map((s) => (
            <li key={s.name} className="sw-student">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" width={339} height={369} loading="lazy" decoding="async" data-part="photo" />
              <div className="sw-student-body">
                <span className="sw-student-tag" data-part="title">
                  {s.tag}
                </span>
                <p className="sw-student-name" data-part="title">
                  {s.name}
                </p>
                <p className="sw-student-text" data-part="description">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </Container>
    </Section>
  );
}

/* ── the counsellor band ───────────────────────────────────────────────────────────────────── */

export function CallbackBand() {
  const c = sstCallback;
  return (
    <Section id="callback" density="roomy" aria-labelledby="cb-title" className="ss-tight">
      <Container>
        <div className="cb-band" data-brand="sst" data-theme="dark">
          <div className="cb-copy">
            <Heading as="h2" size="1" id="cb-title" className="cb-title">
              {c.title}
            </Heading>
            <p className="cb-lede">{c.lede}</p>
            <ul className="cb-points">
              {c.points.map((p) => (
                <li key={p}>
                  <CheckCircle weight="fill" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <div data-brand="sst" data-theme="light">
              <Button asChild size="lg" variant="secondary" className="cb-cta">
                <a href={c.cta.href}>
                  {c.cta.label}
                  <CaretRight weight="bold" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
          <div className="cb-figure" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cb-photo" src={c.image} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── campus life: SSB's campus component (ProgramCity, the SSB site's main pages) ──────────── */

const CAMPUS_ICONS: Record<CampusIcon, Icon> = { home: House, hub: Buildings, lab: Flask, spark: Sparkle, clubs: UsersThree, build: Hammer, care: Heart };

export function CampusSection() {
  const c = sstCampusCity;
  const [i, setI] = React.useState(0);
  const n = c.places.length;
  const go = (k: number) => setI(Math.max(0, Math.min(n - 1, k)));
  const p = c.places[i];
  const railRef = React.useRef<HTMLOListElement>(null);
  React.useEffect(() => {
    const row = railRef.current;
    const t = row?.children[i] as HTMLElement | undefined;
    if (row && t && row.scrollWidth > row.clientWidth) row.scrollTo({ left: t.offsetLeft - (row.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
  }, [i]);
  const start = React.useRef<{ x: number; y: number } | null>(null);

  return (
    <Section id="campus" density="roomy" aria-labelledby="campus-title" className="dkg pgy">
      <Container>
        <SectionHead id="campus-title" eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
        <ul className="cb-bento" aria-label="Life on campus">
          {c.bento.map((ph, k) => (
            <li key={ph.src} data-i={k}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ph.src} alt={ph.alt} loading="lazy" decoding="async" style={{ objectPosition: ph.position }} />
            </li>
          ))}
        </ul>
        <Heading as="h3" size="2" className="ss-subhead">
          {c.placesTitle}
        </Heading>
        <div className="dkg-grid">
          <div
            className="dkg-stage"
            id="pgy-panel"
            role="tabpanel"
            aria-labelledby={`pgy-tab-${i}`}
            onPointerDown={(e) => (start.current = { x: e.clientX, y: e.clientY })}
            onPointerUp={(e) => {
              const s0 = start.current;
              start.current = null;
              if (!s0) return;
              const dx = e.clientX - s0.x;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s0.y)) go(i + (dx < 0 ? 1 : -1));
            }}
          >
            {c.places.map((x, k) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={x.image.src} className="dkg-img" data-on={k === i || undefined} src={x.image.src} alt={k === i ? x.image.alt : ''} aria-hidden={k === i ? undefined : true} loading="lazy" decoding="async" style={{ objectPosition: x.image.position }} />
            ))}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={`blur-${i}`} className="dkg-img dkg-img-blur" data-on="" src={p.image.src} alt="" aria-hidden="true" decoding="async" style={{ objectPosition: p.image.position }} />
            <span className="dkg-shade" aria-hidden="true" />
            <div key={i} className="dkg-copy">
              <p className="dkg-chip">
                <MapPin weight="fill" aria-hidden="true" />
                {p.chip}
              </p>
              <h3 className="dkg-day-title">{p.title}</h3>
              <ul className="dkg-slots">
                {p.points.map((s) => {
                  const I = CAMPUS_ICONS[s.icon];
                  return (
                    <li key={s.text} className="pgy-slot">
                      <span className="dkg-what">
                        <I weight="regular" aria-hidden="true" />
                        {s.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <ol ref={railRef} className="dkg-days" role="tablist" aria-label="Around the campus">
            {c.places.map((x, k) => (
              <li key={x.label}>
                <button type="button" role="tab" id={`pgy-tab-${k}`} aria-controls="pgy-panel" aria-selected={k === i} className="dkg-day" onClick={() => go(k)}>
                  <span className="dkg-day-n">{String(k + 1).padStart(2, '0')}</span>
                  <span className="dkg-day-text">
                    <b>{x.label}</b>
                    <span>{x.title}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <ul className="dkg-pillars" aria-label={c.pillarsLabel}>
          {c.pillars.map((x) => {
            const I = CAMPUS_ICONS[x.icon];
            return (
              <li key={x.title} className="dkg-pillar">
                <I weight="regular" aria-hidden="true" />
                <p className="dkg-pillar-t">{x.title}</p>
                <p className="dkg-pillar-x">{x.text}</p>
              </li>
            );
          })}
        </ul>

        <div className="pgy-actions">
          <Button asChild size="lg" variant="primary">
            <a href={c.ctas.primary.href}>
              {c.ctas.primary.label}
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ── the 3D campus tour ────────────────────────────────────────────────────────────────────── */

export function CampusTour() {
  const [on, setOn] = React.useState(false);
  const c = sstTour;
  return (
    <Section id="tour" density="roomy" aria-labelledby="tour-title" className="ss-tight">
      <Container>
        <div className="tour-head">
          <Heading as="h3" size="2" id="tour-title">
            {c.title}
          </Heading>
        </div>
        <div className="tour-frame">
          {on ? (
            <iframe src={c.src} title="SST campus 3D tour" allow="fullscreen; xr-spatial-tracking" allowFullScreen />
          ) : (
            <button type="button" className="tour-start" onClick={() => setOn(true)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.poster} alt="" loading="lazy" decoding="async" />
              <span className="tour-cta">
                <Cube weight="duotone" aria-hidden="true" />
                Start the 3D tour
              </span>
            </button>
          )}
        </div>
      </Container>
    </Section>
  );
}

/* ── events ─────────────────────────────────────────────────────────────────────────────────── */

export function EventsSection() {
  const c = sstEvents;
  return (
    <Section id="events" density="roomy" aria-labelledby="ev-title">
      <Container>
        <SectionHead id="ev-title" eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
        <div className="ev-empty">
          <span className="ev-icon" aria-hidden="true">
            <CalendarBlank weight="duotone" />
          </span>
          <p>{c.empty}</p>
          <Button asChild size="lg" variant="primary">
            <a href={c.cta.href}>
              {c.cta.label}
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* ── admission process: SST's layout in SSB's dark admissions look ─────────────────────────── */

export function AdmissionSection() {
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.ap-step'] });
  const c = sstAdmissions;
  return (
    <Section ref={ref} id="admissions" density="roomy" aria-labelledby="ap-title" className="ap">
      <Container>
        <div className="ap-grid">
          <div className="ap-aside" data-enter="header">
            <Heading as="p" size="eyebrow" className="text-content-brand" data-enter="eyebrow">
              {c.eyebrow}
            </Heading>
            <Heading as="h2" size="display" id="ap-title" data-enter="headline">
              {c.title} <span className="h-tail">{c.titleTail}</span>
            </Heading>
            <Text size="lg" tone="secondary" data-enter="sub">
              {c.lede}
            </Text>
            <div className="ap-elig" data-enter="sub">
              <p className="ap-elig-title">Eligibility</p>
              <ul>
                {(Array.isArray(c.eligibility) ? c.eligibility : [c.eligibility]).map((e) => (
                  <li key={e}>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ap-ctas" data-enter="controls">
              <Button asChild size="lg" variant="primary">
                <a href={c.apply.href}>
                  {c.apply.label}
                  <ArrowUpRight weight="bold" aria-hidden="true" />
                </a>
              </Button>
              <a className="ap-link" href={c.advisor.href}>
                {c.advisor.label}
                <CaretRight weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <ol className="ap-steps">
            {c.steps.map((s, i) => {
              const step = typeof s === 'string' ? { title: s, text: '' } : s;
              return (
                <li key={step.title} className="ap-step">
                  <span className="ap-dot" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="ap-step-body">
                    <p className="ap-step-k">Step {i + 1}</p>
                    <h3 className="ap-step-title">{step.title}</h3>
                    {step.text ? <p className="ap-step-text">{step.text}</p> : null}
                    {i === 1 ? (
                      <p className="ap-fast">
                        <Lightning weight="fill" aria-hidden="true" />
                        <span>
                          <b>Fast track</b> {c.fastTrack}
                        </span>
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/* ── social ─────────────────────────────────────────────────────────────────────────────────── */

/** Instagram's own glyph (Simple Icons, CC0) in Instagram's gradient, not a generic icon. */
function InstagramMark() {
  const id = React.useId();
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="0.3" cy="1.07" r="1.3">
          <stop offset="0" stopColor="#FFDD55" />
          <stop offset="0.1" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </radialGradient>
      </defs>
      <path fill={`url(#${id})`} d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
    </svg>
  );
}

export function SocialSection() {
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.so-ticker'] });
  const c = sstSocial;
  return (
    <Section ref={ref} id="social" density="roomy" aria-labelledby="so-title" className="overflow-x-clip">
      <Container>
        <SectionHead
          id="so-title"
          eyebrow={c.eyebrow}
          title={c.title}
          aside={
            <div className="so-accounts">
              {c.accounts.map((a) => (
                <Button key={a.handle} asChild size="md" variant="secondary" className="so-account" data-kind={a.kind}>
                  <a href={a.href} target="_blank" rel="noopener noreferrer">
                    {a.kind === 'instagram' ? <InstagramMark /> : <YoutubeLogo weight="fill" aria-hidden="true" />}
                    {a.handle}
                  </a>
                </Button>
              ))}
            </div>
          }
        />
      </Container>
      {/* two rows of the window grid drifting past, opposite ways, each tile the shape of its photo;
          each row its set twice so the loop has no seam; held on hover, still under reduced motion */}
      <div className="so-ticker" aria-label="Photos from SST's Instagram">
        {[c.photos.slice(0, 6), c.photos.slice(6)].map((row, r) => (
          <div key={r} className="so-row" data-dir={r ? 'back' : undefined}>
            {[0, 1].map((copy) => (
              <ul key={copy} className="so-set" aria-hidden={copy ? true : undefined}>
                {row.map((p) => (
                  <li key={p.src} data-shape={p.shape}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt="" loading="lazy" decoding="async" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
      <Container>
        <p className="so-made">{c.madeBy}</p>
      </Container>
    </Section>
  );
}
