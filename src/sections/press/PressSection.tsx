'use client';

import * as React from 'react';
import { Container, Heading, Section } from '@kishanscaler/ssx-ui';
import { ArrowUpRight } from '@phosphor-icons/react';

import { press as defaultPress } from '@/content/community';
import { Title } from '@/sections/shared/Title';
import { useSectionEntrance } from '@/sections/faculty/useSectionEntrance';
import './press.css';

/**
 * "In the press" (the concept site's /v4 section, 2026-10-23; the team's pick, in place of In the
 * News), on the light page: the header, then four cards, a publication to each: its logo, the date,
 * the headline, a line, and "Read on <outlet>" at the foot, the whole card the link (a new tab).
 * Four across on desktop, two on a tablet, a sideways row on a phone. Hover lifts the card.
 */
export type PressArticle = {
  outlet: string;
  short: string;
  logo?: { src: string; h: number };
  /** A photo or clipping across the card's top (SST's coverage comes as images). */
  image?: string;
  date?: string;
  dateLabel?: string;
  title: string;
  text: string;
  href: string;
};
export type PressContent = { eyebrow: string; title: string; articles: PressArticle[]; recognised?: { title: string; logos: { name: string; src: string }[] } };

export function PressSection({ content }: { content?: PressContent } = {}) {
  const press: PressContent = content ?? defaultPress;
  const ref = React.useRef<HTMLElement>(null);
  useSectionEntrance(ref, { decks: ['.pr-card'] });
  return (
    <Section ref={ref} id="press" density="roomy" aria-labelledby="pr-title" className="pr-sec">
      <Container>
        <div data-enter="header" className="pr-head">
          <Heading as="p" size="eyebrow" className="text-content-brand" data-enter="eyebrow">
            {press.eyebrow}
          </Heading>
          <Heading as="h2" size="display" id="pr-title" data-enter="headline">
            <Title text={press.title} />
          </Heading>
        </div>
      </Container>
      <ul className="pr-grid">
        {press.articles.map((a) => (
          <li key={a.title}>
            <a className="pr-card" data-image={a.image ? '' : undefined} href={a.href} target="_blank" rel="noopener noreferrer">
              {a.image ? (
                <span className="pr-img" data-part="photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.image} alt="" loading="lazy" decoding="async" />
                </span>
              ) : null}
              {a.logo ? (
                <span className="pr-lg" data-part="title">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.logo.src} alt={a.outlet} height={a.logo.h} style={{ height: a.logo.h }} loading="lazy" />
                </span>
              ) : null}
              {a.dateLabel ? <time dateTime={a.date} data-part="description">{a.dateLabel}</time> : null}
              <h3 data-part="description">{a.title}</h3>
              <p data-part="description">{a.text}</p>
              <span className="pr-go" data-part="action">
                Read on {a.short}
                <ArrowUpRight weight="bold" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      {press.recognised ? (
        <Container>
          <div className="pr-rec" data-enter="block">
            <p className="pr-rec-title">{press.recognised.title}</p>
            <ul className="pr-rec-logos">
              {press.recognised.logos.map((l) => (
                <li key={l.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.src} alt={l.name} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      ) : null}
    </Section>
  );
}
