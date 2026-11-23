import type { Metadata } from 'next';

import { AdmissionsV4 } from '@/sections/admissions/AdmissionsV4';
import { sstAdmissions, sstClose, sstDeadline, sstFaqs, sstFooterExtras, sstMentorsGroup, sstOutcomes, sstPpoGroup, sstPress, sstTeamGroup, sstWhy } from '@/content/sst';
import { CurriculumRail } from '@/sections/curriculum/CurriculumRail';
import { DeckCloseSection, DeckFaqSection } from '@/sections/deck/DeckFinale';
import { DeckFooter } from '@/sections/deck/DeckFooter';
import { DeckOutcomes } from '@/sections/deck/DeckOutcomes';
import { DeckUsp, DeckUspHead } from '@/sections/deck/DeckSections';
import { HeroFrameDeadline } from '@/sections/hero/frame/HeroFrame';
import { HomeNav, ScrollRefresh } from '@/sections/home/client';
import { PeopleTabsSection } from '@/sections/people-tabs/PeopleTabsSection';
import { PressSection } from '@/sections/press/PressSection';
import { CalmEntrance } from '@/sections/shared/CalmEntrance';
import { BottomNav } from '@/sections/site/BottomNav';
import { SstHero, SstHighlights } from '@/sections/sst/SstHero';
import {
  CompaniesTicker,
  CallbackBand,
  CampusSection,
  CampusTour,
  CareerSection,
  CompareSection,
  EventsSection,
  InternshipSection,
  KantSection,
  PlacementFilmCard,
  ProgrammesSection,
  SocialSection,
  StoriesSection,
  WhyBuild,
  WhyInnovation,
  WhyLeaders,
  WhyPeers,
} from '@/sections/sst/SstSections';
import { Tone } from '@/sections/tone/Tone';
import './v6/v6.css';
import '@/sections/deck/tokens.css';
import './sst-page.css';

export const metadata: Metadata = {
  title: 'Scaler School of Technology · India’s Ivy League for the AI Age',
  description: 'Industry-integrated UG programmes in Computer Science & AI and AI & Business, on a residential campus in Bengaluru.',
};

/**
 * The SST home page: scaler.com/school-of-technology, section for section in its own order, built on
 * the SSB page's design system and sections (/v8: light and dark tones, the navbar taking the tone
 * under it, the section pills) in SST's blue. Content: content/sst.ts; assets: public/sst.
 */
export default function SstHome() {
  return (
    <>
      <main id="top" data-page="v7" data-entrance="calm" data-brand="sst" data-theme="light" className="bg-page text-content">
        <ScrollRefresh />
        <CalmEntrance />
        <HeroFrameDeadline deadline={sstDeadline} />
        <HomeNav light followTone pinned />
        <BottomNav
          instant
          items={[
            { label: 'Placements', target: 'placements-showcase-title' },
            { label: 'Programmes', target: 'pg-title' },
            { label: 'Why SST', target: 'dk-usp-title' },
            { label: 'Our Team', target: 'leadership' },
            { label: 'CS-AI vs AI-B', target: 'cp-title' },
            { label: 'Campus', target: 'campus-title' },
            { label: 'Admissions', target: 'admissions' },
            { label: 'FAQs', target: 'faq-title' },
          ]}
        />

        <SstHero />
        <SstHighlights />

        {/* placement highlights on SSB's outcomes card, the film in its press slot; the companies on campus */}
        <Tone>
          <div id="placements">
            <DeckOutcomes ticker content={sstOutcomes} media={<PlacementFilmCard />} recruiters={false} />
          </div>
          <CompaniesTicker />
        </Tone>
        <Tone>
          <div className="ss-pull">
            <PeopleTabsSection custom={[sstPpoGroup]} id="ppo" label="Internship and PPO highlights" stack />
          </div>
        </Tone>
        <Tone>
          <InternshipSection />
        </Tone>
        <Tone>
          <CareerSection />
          <KantSection />
        </Tone>
        <Tone>
          <ProgrammesSection />
        </Tone>
        <Tone>
          <StoriesSection />
        </Tone>
        <Tone>
          <PeopleTabsSection custom={[sstMentorsGroup]} id="mentors" label="Super mentors" stack />
        </Tone>

        <Tone>
          <div id="why-sst">
            <DeckUspHead eyebrow={sstWhy.eyebrow} title={sstWhy.title} sub={sstWhy.sub} />
          </div>
          <CurriculumRail
            sections={[
              { ...sstWhy.items[0], node: <DeckUsp num="01" label={sstWhy.items[0].label}><WhyBuild /></DeckUsp> },
              { ...sstWhy.items[1], node: <DeckUsp num="02" label={sstWhy.items[1].label}><WhyLeaders /></DeckUsp> },
              { ...sstWhy.items[2], node: <DeckUsp num="03" label={sstWhy.items[2].label}><WhyInnovation /></DeckUsp> },
              { ...sstWhy.items[3], node: <DeckUsp num="04" label={sstWhy.items[3].label}><WhyPeers /></DeckUsp> },
            ]}
          />
          <CallbackBand />
        </Tone>

        <Tone>
          <PeopleTabsSection custom={[sstTeamGroup]} id="leadership" label="The team behind SST" stack />
        </Tone>
        <Tone>
          <CompareSection />
        </Tone>
        <Tone>
          <CampusSection />
          <CampusTour />
          <EventsSection />
        </Tone>

        <Tone dark>
          <AdmissionsV4 backers={false} content={sstAdmissions} />
        </Tone>
        <Tone dark>
          <PressSection content={sstPress} />
        </Tone>

        <Tone>
          <SocialSection />
          <div id="faq">
            <DeckFaqSection faqs={sstFaqs} help={sstClose.faqHelp} title="Frequently asked questions.|Answered for students and parents." sub="What applicants ask most about SST." />
          </div>
          <DeckCloseSection content={sstClose} />
        </Tone>
      </main>
      <Tone>
        <DeckFooter extras={sstFooterExtras} />
      </Tone>
    </>
  );
}
