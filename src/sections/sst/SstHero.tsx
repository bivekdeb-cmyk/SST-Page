import { Button, Container, Heading } from '@kishanscaler/ssx-ui';
import { ArrowUpRight, CalendarBlank, CaretDown, Cube, Flask, MapPin, UsersThree } from '@phosphor-icons/react/ssr';

import { sstHero } from '@/content/sst';
import '@/sections/hero/frame/hero-frame.css';
import './sst-hero.css';

const ICONS = { build: Cube, lab: Flask, place: MapPin, peers: UsersThree };

/**
 * The SST first fold: SSB's framed film (HeroFrame: the rounded frame inset from the page, the film
 * fading to black under the copy, its padding and entrance), laid out as SST's own: at the left the
 * title, Apply Now and Explore Programmes, and the intake line under them; at the right "Industry
 * Integrated UG Programmes / Built by 100+ leaders from" over the leaders' full logos, white on the
 * film, drifting by. Phones: the film above, then the copy and the logos.
 */
export function SstHero() {
  const c = sstHero;
  return (
    <section className="hf sh" data-tone="sst" aria-labelledby="sh-title" data-brand="sst" data-theme="light" id="highlights">
      <div className="hf-frame sh-frame" data-brand="sst" data-theme="dark">
        <video className="hf-film" src={c.video.src} poster={c.video.poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />
        <div className="hf-fade sh-fade" aria-hidden="true" />

        <div className="sh-body">
          <div className="sh-main">
            <div className="sh-side">
              <p className="sh-kicker">{c.sideKicker}</p>
              <p className="sh-side-title">{c.sideTitle}</p>
              <div className="sh-leaders" aria-label={`${c.sideTitle}: ${c.leaders.map((l) => l.name).join(', ')}`}>
                <div className="sh-leaders-track" aria-hidden="true">
                  {[0, 1].map((copy) => (
                    <ul key={copy} className="sh-leaders-set">
                      {c.leaders.map((l) => (
                        <li key={l.name}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={l.src} alt="" loading="eager" decoding="async" />
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>

            <div className="sh-rest">
              <Heading as="h1" size="display" id="sh-title" className="sh-title">
                {c.title}
              </Heading>
              <p className="sh-sub">{c.sub}</p>
              <div className="sh-actions" data-brand="sst" data-theme="light">
                <Button asChild size="lg" variant="primary">
                  <a href={c.primaryCta.href}>
                    {c.primaryCta.label}
                    <ArrowUpRight weight="bold" aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="sh-secondary">
                  <a href={c.secondaryCta.href}>
                    {c.secondaryCta.label}
                    <CaretDown weight="bold" aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="sh-note">
                <CalendarBlank weight="bold" aria-hidden="true" />
                {c.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The four highlights, the band right under the first fold (SST's own cards under its film): each a
 * card of the page's, its icon on a brand tile, the title, its line.
 */
export function SstHighlights() {
  const c = sstHero;
  return (
    <section className="shl" aria-label="Highlights">
      <Container>
        <ul className="shl-grid">
          {c.highlights.map((h) => {
            const Icon = ICONS[h.icon];
            return (
              <li key={h.title} className="shl-card">
                <Icon className="shl-icon" weight="regular" aria-hidden="true" />
                <h2 className="shl-title">{h.title}</h2>
                <p className="shl-text">{h.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
