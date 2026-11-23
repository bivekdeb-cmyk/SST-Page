/*
 * The SST home page's content (scaler.com/school-of-technology, read 2026-11-20), in the live page's
 * order, shaped for the SSB sections and the SST sections built from their parts. Copy, figures,
 * names, roles and links are the live page's own; assets were taken from it into public/sst. Company
 * marks are each company's own site icon (public/sst/marks); where none could be had, a monogram.
 */
import type { Faq } from '@/content/admissions';
import type { AdmissionsContent } from '@/sections/admissions/AdmissionsV4';
import type { BuiltContent } from '@/sections/built/BuiltCards';
import type { CampusLifeContent } from '@/sections/community/CommunitySections';
import type { CloseContent } from '@/sections/deck/DeckFinale';
import type { PeopleGroup } from '@/sections/people-tabs/PeopleTabsSection';
import type { PressContent } from '@/sections/press/PressSection';
import type { Company } from '@/sections/sst/CompanyMark';
import type { OutcomesContent } from '@/sections/deck/DeckOutcomes';

const A = (f: string) => `/sst/${f}`;
export const APPLY = 'https://www.scaler.com/school-of-technology/application/';
export const SST = 'https://www.scaler.com/school-of-technology';

/* ── companies: mark + name ────────────────────────────────────────────────────────────────── */

const mk = (name: string, file: string): Company => ({ name, mark: A(`marks/${file}.png`) });
export const CO = {
  amazon: mk('Amazon', 'amazon'),
  rippling: mk('Rippling', 'rippling'),
  medianet: mk('Media.net', 'medianet'),
  pharmacy: { name: '1Pharmacy Network', mono: '#2F6BD8' },
  slice: { name: 'slice', mono: '#A12DE8' },
  wealthy: mk('Wealthy', 'wealthy'),
  tasket: { name: 'Tasket', mono: '#3F63E8' },
  manifest: { name: 'Manifest AI', mono: '#1B1F5E' },
  mamaearth: mk('Mamaearth', 'mamaearth'),
  zeta: mk('Zeta', 'zeta'),
  emergent: mk('Emergent', 'emergent'),
  google: mk('Google', 'google'),
  deepmind: mk('Google DeepMind', 'deepmind'),
  openai: mk('OpenAI', 'openai'),
  meta: mk('Meta', 'meta'),
  microsoft: mk('Microsoft', 'microsoft'),
  adobe: mk('Adobe', 'adobe'),
  flipkart: mk('Flipkart', 'flipkart'),
  paypal: mk('PayPal', 'paypal'),
  zomato: mk('Zomato', 'zomato'),
  paytm: mk('Paytm', 'paytm'),
  target: mk('Target', 'target'),
  phonepe: mk('PhonePe', 'phonepe'),
  uber: mk('Uber', 'uber'),
  mckinsey: mk('McKinsey & Company', 'mckinsey'),
  oracle: mk('Oracle', 'oracle'),
  stanford: mk('Stanford', 'stanford'),
  nvidia: mk('NVIDIA', 'nvidia'),
  shaadi: mk('Shaadi.com', 'shaadi'),
  viacom: { name: 'Viacom18', mono: '#D9232D' },
  blinkit: { name: 'Blinkit', mark: '/logos/marks/fc-blinkit.png' },
} satisfies Record<string, Company>;

/** A card's company line (the faculty card's logo field) from a company above. */
const logoOf = (c: Company) => ({ name: c.name, mark: c.mark, mono: c.mono });

/* ── the first fold ─────────────────────────────────────────────────────────────────────────── */

export const sstDeadline = {
  message: 'Applications open for 2027 intake · Deadline 9th Jan',
  shortMessage: 'Closes 9 Jan',
  to: '2027-01-09T23:59:00+05:30',
  label: '9 Jan, 11:59 PM IST',
};

export const sstHero = {
  title: 'India’s Ivy League for the AI Age',
  sub: '4-year UG programmes in CS & AI and AI & B.\nLearn by building, on a campus in India’s Silicon Valley.',
  primaryCta: { label: 'Apply Now', href: APPLY },
  secondaryCta: { label: 'Explore Programmes', href: '#programmes' },
  note: 'Jan intake applications open · Deadline 9th Jan',
  sideKicker: 'Industry Integrated UG Programmes',
  sideTitle: 'Built by 100+ leaders from',
  // the full logos, drawn white on the film (as the live page); the marks are for cards only
  leaders: [
    { name: 'Adobe', src: A('hero-3.webp') },
    { name: 'Google DeepMind', src: A('hero-4.webp') },
    { name: 'Microsoft', src: A('hero-5.webp') },
    { name: 'Amazon', src: A('hero-6.webp') },
    { name: 'OpenAI', src: A('hero-1.webp') },
    { name: 'Meta', src: A('hero-2.webp') },
    { name: 'Google', src: '/logos/google.svg' },
    { name: 'Flipkart', src: '/logos/flipkart.svg' },
  ],
  video: { src: A('hero.mp4'), poster: A('campus-1.png') },
  highlights: [
    { icon: 'build', title: 'Learn by Building', text: 'Future-proof curriculum with AI embedded from day one' },
    { icon: 'lab', title: 'Industry Led Innovation Lab', text: 'India’s only deep tech lab for UG with funding support for startup' },
    { icon: 'place', title: 'Bangalore', text: 'Fully residential Urban Campus in India’s Silicon Valley' },
    { icon: 'peers', title: 'Talented Peers', text: 'In 2026, only the top 3.9% talented students were shortlisted.' },
  ] as const,
};

/* ── placement highlights ──────────────────────────────────────────────────────────────────── */

export const sstPlacements = {
  eyebrow: 'Placement highlights',
  title: 'Offers came in,|before the placement season started.',
  sub: 'Top tech companies that hire from IITs & NITs are already hiring from SST.',
  ticker: 'Placement updates',
  video: { id: 'coy0J-BpprM', title: 'SST founding batch placements', image: A('yt-placement-updates.webp') },
  lead: { kicker: 'First ever placement cycle', value: '₹44 Lakhs', unit: '/ annum', caption: 'Highest CTC offered via PPO route · Before the placement season officially opens' },
  stats: [
    { value: '₹20.4L', label: 'Average CTC' },
    { value: '76%', label: 'Batch obtained offers' },
    { value: '₹33L', label: 'Top 25% average CTC' },
  ],
  companiesTitle: 'Companies on campus to hire',
  companies: [CO.amazon, CO.rippling, CO.medianet, CO.pharmacy, CO.slice, CO.wealthy, CO.tasket, CO.manifest, CO.mamaearth, CO.zeta],
};

/** The placements on SSB's outcomes card (DeckOutcomes): the ticker strip, six figures in hairline
 *  cells (the first the lead), the placements film where SSB has its press card, then the companies
 *  on campus as full logos in its flip grid. */
const recLogo = (name: string, file: string) => ({ name, wordmark: name, logoUrl: A(`rec/${file}.png`), ink: 0.09 });
export const sstOutcomes: OutcomesContent = {
  eyebrow: 'Placement highlights',
  title: 'Offers came in,|before the placement season started.',
  tickerLabel: 'Placement updates',
  figures: [
    { value: '₹44L', label: 'Highest CTC per annum', note: 'Via PPO · before the season opened', short: 'Highest CTC' },
    { value: '₹20.4L', label: 'Average CTC', note: 'First ever placement cycle', short: 'Average CTC' },
    { value: '76%', label: 'Batch obtained offers', note: 'First ever placement cycle', short: 'Batch with offers' },
    { value: '₹33L', label: 'Top 25% average CTC', note: 'First ever placement cycle', short: 'Top 25% CTC' },
    { value: '96.3%', label: 'Got an internship offer', note: 'Eligible students, first batch', short: 'Internship offers' },
    { value: '1200+', label: 'Hiring partners', note: 'MAANG companies & AI startups', short: 'Hiring partners' },
  ],
  press: { logo: { src: A('auditor.png'), alt: 'B2K Analytics', width: 234, height: 72 }, date: '', title: '', byline: '', sub: '', cta: '' },
  photo: { caption: '' },
  recruitersTitle: 'Companies on campus to hire',
  recruitersLabel: 'Companies on campus to hire SST students',
  recruiterLogos: [
    recLogo('Amazon', 'amazon'),
    recLogo('Rippling', 'rippling'),
    recLogo('Media.net', 'medianet'),
    recLogo('1Pharmacy Network', '1pharmacy'),
    recLogo('slice', 'slice'),
    recLogo('Wealthy', 'wealthy'),
    recLogo('Tasket', 'tasket'),
    recLogo('Manifest AI', 'manifestai'),
    recLogo('Mamaearth', 'mamaearth'),
    recLogo('Zeta', 'zeta'),
    { name: 'Google', wordmark: 'Google', logoUrl: '/logos/google.svg' },
    { name: 'Flipkart', wordmark: 'Flipkart', logoUrl: '/logos/flipkart.svg' },
  ],
};
export const sstPlacementFilm = {
  kicker: 'Placement updates',
  title: 'Founding batch placements,\nin their own words.',
  line: 'Highest CTC offered via PPO route, before the placement season officially opens.',
  video: { id: 'coy0J-BpprM', title: 'SST founding batch placements', image: A('yt-placement-updates.webp') },
  cta: 'Watch the update',
};

/* ── internship + PPO: the students, on the faculty card ───────────────────────────────────── */

const ppo = (name: string, file: string, co: Company) => ({ name, role: `3rd year · PPO at ${co.name}`, image: A(`ppo-${file}.webp`), logo: logoOf(co) });
export const sstPpoGroup: PeopleGroup = {
  id: 'ppo',
  tab: 'PPOs',
  eyebrow: 'Internship + PPO highlights',
  title: 'Pre-placement offers.|Converted from internships, in the 3rd year.',
  sub: 'Third-year students who turned their internships into offers before the placement season opened.',
  itemName: 'student',
  people: [
    ppo('Ananya Srivastava', 'ananya', CO.wealthy),
    ppo('Shubh Kesharwani', 'shubh', CO.tasket),
    ppo('Abhishek Kumar Shah', 'abhishek', CO.emergent),
    ppo('Divyanshu Pandey', 'divyanshu', CO.mamaearth),
    ppo('Loukik Thatte', 'loukik', CO.manifest),
    ppo('Ajai Sharan Velmurugan', 'ajai', CO.wealthy),
    ppo('Siva Rama Gogineni', 'siva', CO.pharmacy),
    ppo('Ayush Kesharwani', 'ayush', CO.wealthy),
  ],
};

/* ── internship highlights, Anupam Mittal and the report ───────────────────────────────────── */

export const sstInternship = {
  eyebrow: 'Internship highlights',
  title: 'Exceptional results.|In just the 2nd year.',
  cards: [
    { kind: 'photo', value: '₹2 lakh', unit: 'per month', text: 'SST’s highest internship stipend, in just the 2nd year', image: A('intern-student.png') },
    { kind: 'ring', value: '96.3%', unit: 'Internship rate', text: '96.3% of eligible students from the first batch received at least one internship offer', percent: 96.3 },
    { kind: 'globe', value: '12', unit: 'Global internships', text: 'International internships in Bali, Singapore, New York, Germany and more', image: A('intern-globe.png') },
  ] as const,
  mittal: {
    image: A('report-cover.webp'),
    eyebrow: 'What Anupam Mittal spoke about SST',
    quote: 'SST’s curriculum and culture puts its students ahead of the curve.',
    quoteTail: 'The industry needs such talent. I’d love to hire from SST.',
    name: 'Anupam Mittal',
    role: 'Founder & CEO, Shaadi.com · Shark Tank India judge',
  },
  report: {
    title: 'Download SST Internship Report 2026',
    auditedBy: { label: 'Audited by', src: A('auditor.png'), alt: 'B2K Analytics' },
    auditees: { label: 'Auditor for placement reports of', logos: [{ src: A('auditee-1.png'), alt: 'IIM Ahmedabad' }, { src: A('auditee-2.png'), alt: 'MDI' }, { src: A('auditee-3.png'), alt: 'XLRI' }] },
    cta: { label: 'Download Report', href: '#internship-report' },
  },
};

export const sstDegree = {
  eyebrow: 'Placements & the degree',
  title: 'Question at SST.|Answered.',
  line: 'SST students are recommended to independently pursue a BS from IIT Madras or a BSc (Hons) from BITS Pilani: UGC-recognised, and fully eligible for top tech jobs, an MS and an MBA abroad.',
  video: { id: '2T15g3ddvsw', title: 'Placements & the degree: question at SST, answered', image: A('yt-degree.webp') },
};

/* ── stellar career prospects ──────────────────────────────────────────────────────────────── */

export const sstCareer = {
  eyebrow: 'Stellar career prospects',
  title: 'Launch your career.|With proven success.',
  gsoc: { image: A('gsoc.webp'), lead: '14 SST students selected for', accent: 'GSoC 2026', tail: 'from 15K+ global applicants.', line: 'Standing out across 140+ countries.', photo: A('countries.webp') },
  amazon: { logo: A('alumni-co-3.webp'), text: 'Scaler placed more learners in Amazon than all IITs combined.' },
  partners: { value: '1200+', text: 'Hiring partners, including MAANG companies & AI startups' },
  startups: { value: '10+', text: 'Startups founded by SST students; one SIL-incubated startup featured on Shark Tank', image: A('hiring-partners.png'), cta: { label: 'Read the story', href: 'https://www.hindustantimes.com/genesis/scaler-innovation-lab-incubated-ai-wearable-tech-startup-neosapien-raises-2mn-seed-funding-101767074236219.html' } },
  alumniTitle: 'Scaler’s alumni work across 1200+ companies',
  alumniNote: 'Outcomes through Scaler Academy & DSML programme',
  // the full logos, as the live page's strip
  alumni: [
    ['Adobe', 1], ['Flipkart', 2], ['Amazon', 3], ['Google', 4], ['PayPal', 5], ['Zomato', 6],
    ['Microsoft', 7], ['Paytm', 8], ['Target', 9], ['Meta', 10], ['Razorpay', 11],
  ].map(([name, n]) => ({ name: name as string, src: A(`alumni-co-${n}.webp`) })),
  kant: {
    quote: 'Today, where even top-tier institutes like IITs are running old syllabi,',
    quoteTail: 'Scaler does the job of producing high-quality engineers.',
    name: 'Amitabh Kant',
    role: 'Ex-CEO, NITI Aayog, Govt. of India · G20 India Sherpa',
    photo: A('outcomes-chart.png'),
    logos: [{ src: A('amitabh-kant.png'), alt: 'NITI Aayog' }, { src: A('amitabh-kant-2.png'), alt: 'G20' }],
  },
};

/* ── programmes ─────────────────────────────────────────────────────────────────────────────── */

export const sstProgrammes = {
  eyebrow: 'Programmes',
  title: 'Explore the programmes.|Choose your best fit.',
  sub: 'Two four-year undergraduate programmes, built with industry, with AI from day one.',
  cards: [
    {
      id: 'cs-ai',
      kicker: '4 year UGP in',
      label: 'Computer Science & AI',
      line: 'Build real-world software and advanced AI systems used by top tech companies.',
      highlights: [
        { icon: A('prog-csai.webp'), text: '50+ projects and 1 year industry immersion' },
        { icon: A('prog-csai-2.webp'), text: 'Learn advanced CS, AI/ML, system design and algo trading' },
        { icon: A('prog-csai-3.webp'), text: 'Graduate as Senior Software Engineer and AI/ML Engineer' },
      ],
      cta: { label: 'Explore CS & AI', href: `${SST}/computer-science-and-ai/` },
      video: { id: 'PkXHq65A9JI', title: 'Computer Science & AI at Scaler School of Technology', image: A('yt-programmes.webp') },
    },
    {
      id: 'ai-b',
      kicker: '4 year UGP in',
      label: 'AI & Business',
      line: 'Build AI products and ship to real users for top tech companies & startups.',
      highlights: [
        { icon: A('prog-aib.webp'), text: '6 months building a tech startup, 6 months industry immersion & 50+ projects' },
        { icon: A('prog-aib-2.webp'), text: 'Learn interdisciplinary skills: CS, AI/ML, product thinking & business strategy' },
        { icon: A('prog-aib-3.webp'), text: 'Graduate as AI Product Manager, AI Consultant, Software Engineer or Tech Founder' },
      ],
      cta: { label: 'Explore AI & B', href: `${SST}/ai-and-business/` },
      video: { id: 'PeIZ_K_DiKY', title: 'India’s first AI & Business undergraduate programme', image: A('yt-csai.webp') },
    },
  ],
};

export const sstCompare = {
  eyebrow: 'Difference table',
  title: 'Choose your best fit.|CS & AI or AI & Business.',
  sub: 'Same campus, labs, eligibility and scholarships; a different focus and destination.',
  colA: 'Computer Science & Artificial Intelligence (CS&AI)',
  colB: 'Artificial Intelligence & Business (AI&B)',
  rows: [
    { icon: 'excite', k: 'What excites me?', a: '“How does this system work? How do I make it 10x faster?”', b: '“Who needs this? What to build? How do I get it to a million users?”' },
    { icon: 'who', k: 'Who it’s for', a: 'You want to build complex software systems and go deep into technology.', b: 'You want to build tech / AI products, understand the business behind them, and take them to real users.' },
    { icon: 'learn', k: 'What you learn', a: 'Advanced CS, AI/ML, system design and software engineering through tech projects.', b: 'CS, AI/ML, product thinking and business strategy through tech projects & business challenges.' },
    { icon: 'experience', k: 'Defining experience', a: '50+ real-world projects & 1 year industry immersion.', b: '50+ real-world projects, 6 months building a tech startup & 6 months industry immersion.' },
    { icon: 'career', k: 'Career outcomes', a: 'Senior Software Engineer and AI/ML Engineer roles at top tech companies and startups.', b: 'Forward Deployed Engineer (AI Consultant), AI Product Manager, Software Engineer at top tech companies and startups, or Tech Founder.' },
  ],
};

/* ── stories from the builders ─────────────────────────────────────────────────────────────── */

const story = (src: string, alt: string, width: number, height: number) => ({ src: A(src), alt, width, height });
export const sstStories: BuiltContent = {
  eyebrow: 'Headlines from SST',
  title: 'Stories from the builders at SST.',
  titleTail: 'Startups, global stages and national wins, while still students.',
  label: 'Stories from SST students',
  companies: [
    { company: 'Percevia', sector: 'AI · Accessibility', by: 'Tushar', blurb: 'Winner among 20,000+ entries at Samsung Solve for Tomorrow: AI glasses that help the visually impaired.', stat: { value: '₹25L', label: 'Grant, in his 2nd year' }, image: story('story-percevia.webp', 'Tushar, winner at Samsung Solve for Tomorrow', 1920, 1080), focus: [0.5, 0.5], href: 'https://yourstory.com/socialstory/2025/11/bengaluru-student-invents-smart-glasses-visually-impaired' },
    { company: 'First Student at Apple', sector: 'Global programme', by: 'Krishna', blurb: 'During his second year at SST, Krishna cracked the prestigious Apple Academy Programme in Bali.', image: story('story-apple.webp', 'Krishna, the first SST student at Apple', 715, 403), focus: [0.5, 0.5], href: 'https://www.linkedin.com/posts/scaler-school-of-technology_dropping-out-from-previous-college-to-apple-activity-7273173538121949185-h7Is/' },
    { company: 'NeoSapiens', sector: 'AI wearables', by: 'Incubated at SST’s Innovation Lab', blurb: 'Secured funding at Shark Tank India by building an AI-native wearable pendant.', stat: { value: 'Funded', label: 'On Shark Tank India' }, image: story('story-neosapiens.webp', 'The NeoSapiens team', 561, 316), focus: [0.5, 0.5], href: 'https://www.hindustantimes.com/genesis/scaler-innovation-lab-incubated-ai-wearable-tech-startup-neosapien-raises-2mn-seed-funding-101767074236219.html' },
    { company: 'Won ₹1.5 Lakh at SIH 2025', sector: 'Smart India Hackathon', by: 'Team AntarDrishti', blurb: 'They didn’t just win: they built a solution ready for nationwide deployment by SAI.', stat: { value: '₹1.5L', label: 'SIH 2025 prize' }, image: story('story-sih.webp', 'Team AntarDrishti at SIH 2025', 978, 573), focus: [0.5, 0.5], href: 'https://www.linkedin.com/posts/scaler-school-of-technology_team-antardrishti-from-scaler-school-of-technology-activity-7405538334833307648-fsfy/' },
    { company: 'India’s First Humanoid', sector: 'Humanoid robotics', by: 'Xspecies AI · SST Innovation Lab', blurb: 'Xspecies AI, a startup incubated at SST’s Innovation Lab, is building India’s first humanoid robot.', image: story('story-humanoid.webp', 'The Xspecies AI humanoid robot', 1032, 676), focus: [0.5, 0.5], href: 'https://xspecies.ai/' },
    { company: 'Ninad AI', sector: 'Voice AI', by: 'SST students', blurb: 'A full-duplex AI speech engine powering real-time, human-like voice interactions.', image: story('story-ninad.webp', 'Ninad AI, a real-time voice engine', 3687, 2049), focus: [0.5, 0.5], href: 'https://ninad.live/' },
    { company: 'Two SST teams. Two ICPC Regionals.', sector: 'Competitive programming', by: 'SST’s ICPC teams', blurb: 'Outperforming 350+ teams across India: SST’s best ICPC result yet.', stat: { value: '350+', label: 'Teams outperformed' }, image: story('story-icpc.webp', 'SST’s ICPC teams', 978, 573), focus: [0.5, 0.5], href: 'https://www.linkedin.com/feed/update/urn:li:activity:7420433269135028224/' },
    { company: 'Ather Labs', sector: 'Fintech · AI', by: 'Advith & Arsh', blurb: 'An AI-powered fintech startup, generating INR 2L+ MRR.', stat: { value: '₹2L+', label: 'MRR' }, image: story('story-ather.webp', 'Advith and Arsh of Ather Labs', 984, 508), focus: [0.5, 0.5], href: 'https://www.republicworld.com/initiatives/scaler-school-of-technology-hosts-student-shark-tank-young-innovators-pitch-big-idea' },
    { company: 'Two Internships at Once', sector: 'Build My Notes', by: 'Om', blurb: 'Om co-founded Build My Notes and cracked two internships, all in his second year.', image: story('story-two-internships.webp', 'Om, co-founder of Build My Notes', 716, 403), focus: [0.5, 0.5], href: 'https://www.linkedin.com/feed/update/urn:li:activity:7295011234104426496/' },
    { company: 'Trackaroo', sector: 'Auto-dealership SaaS', by: 'Pratyush', blurb: 'An auto-dealership management platform, with clients like Tata, Ather and more.', stat: { value: '₹25L', label: 'Revenue' }, image: story('story-trackaroo.webp', 'Pratyush, founder of Trackaroo', 1012, 604), focus: [0.5, 0.5], href: 'https://www.linkedin.com/posts/scaler-school-of-technology_pratyush-mishra-first-client-just-became-activity-7424093910001672192-y_6B' },
    { company: 'Meta Hacker Cup', sector: 'Competitive programming', by: 'Five SST coders', blurb: 'Five SST coders took on the world, and finished in the global Top 1600.', stat: { value: 'Top 1600', label: 'Worldwide' }, image: story('story-meta-hacker.webp', 'SST’s coders at Meta Hacker Cup', 978, 573), focus: [0.5, 0.5], href: 'https://www.linkedin.com/feed/update/urn:li:activity:7422976789158805504/' },
  ],
};

/* ── super mentors and the team, on the faculty card ───────────────────────────────────────── */

export const sstMentorsGroup: PeopleGroup = {
  id: 'super-mentors',
  tab: 'Super mentors',
  eyebrow: 'Super mentors',
  title: 'Built & delivered by 100+ industry leaders.|From OpenAI, Google and Flipkart.',
  sub: 'The people who built the world’s best-known products teach and mentor at SST.',
  itemName: 'mentor',
  people: [
    { name: 'Rajan Anandan', role: 'Ex-VP South-East Asia, Google', image: A('mentor-rajan.webp'), logo: logoOf(CO.google) },
    { name: 'Arvind N', role: 'Co-creator, GPT-3 & GPT-4', image: A('mentor-arvind.webp'), logo: logoOf(CO.openai) },
    { name: 'Varun Mohan', role: 'Lead Engineer, Google DeepMind', image: A('mentor-varun.webp'), logo: logoOf(CO.deepmind) },
    { name: 'Yash Kumar', role: 'Member of Technical Staff, OpenAI', image: A('mentor-yash.webp'), logo: logoOf(CO.openai) },
    { name: 'Akash Saxena', role: 'CTPO, Viacom18', image: A('mentor-akash.webp'), logo: logoOf(CO.viacom) },
    { name: 'Rahul Chari', role: 'Co-founder, PhonePe', image: A('mentor-rahul.webp'), logo: logoOf(CO.phonepe) },
    { name: 'Amod Malviya', role: 'Ex-CTO, Flipkart', image: A('mentor-amod.webp'), logo: logoOf(CO.flipkart) },
  ],
};

export const sstTeamGroup: PeopleGroup = {
  id: 'team',
  tab: 'The team',
  eyebrow: 'Our team',
  title: 'Meet the team behind SST.|Entrepreneurs and AI builders.',
  sub: 'Builders who’ve scaled global companies lead SST, bringing real-world insight to shape tomorrow’s tech leaders.',
  itemName: 'person',
  people: [
    { name: 'Anshuman Singh', role: 'Co-founder, Scaler · Ex-Meta', image: A('team-anshuman.webp'), logo: logoOf(CO.meta) },
    { name: 'Abhimanyu Saxena', role: 'Co-founder, Scaler · Ex-Fab.com', image: A('team-abhimanyu.webp'), logo: { name: 'Fab.com', mono: '#E2001A' } },
    { name: 'Vidit Jain', role: 'Head of SST · Ex-McKinsey & MPL', image: A('team-vidit.webp'), logo: logoOf(CO.mckinsey) },
    { name: 'Manmeet Singh Akali', role: 'Programme Director, SST · Ex-founder, Klarity', image: A('team-manmeet.webp'), logo: { name: 'Klarity', mono: '#2A2F45' } },
    { name: 'Tushar Bisht', role: 'CTO, Scaler · Ex-Meta', image: A('team-tushar.webp'), logo: logoOf(CO.meta) },
    { name: 'Shivank Agrawal', role: 'Sr. VP Data Science, Scaler · Ex-Microsoft, Oracle', image: A('team-shivank.webp'), logo: logoOf(CO.microsoft) },
    { name: 'Amar Srivastava', role: 'AVP Product, Scaler · IIT Delhi alum', image: A('team-amar.webp'), logo: { name: 'IIT Delhi', mono: '#7A1E1E' } },
    { name: 'Shruti Sagar', role: 'Ex-L.E.K. Consulting', image: A('team-shruti.webp'), logo: { name: 'L.E.K. Consulting', mono: '#00263E' } },
    { name: 'Bhavik Rathod', role: 'Board Member · Built Uber India', image: A('team-bhavik.webp'), logo: logoOf(CO.uber) },
    { name: 'Vadivelan Gopal', role: 'Vice President, Campus Outreach, SST', image: A('team-vadivelan.webp'), logo: { name: 'Scaler School of Technology', mono: '#0245B9' } },
  ],
};

/* ── why SST: the four pillars ─────────────────────────────────────────────────────────────── */

export const sstWhy = {
  eyebrow: 'Scaler School of Technology',
  title: 'What makes SST India’s Ivy League.|For the AI age.',
  sub: 'Four things you won’t find together anywhere else.',
  items: [
    { id: 'why-build', num: '01', label: 'Learn by building', icon: 'learn' },
    { id: 'why-leaders', num: '02', label: 'Access to industry leaders', icon: 'sessions' },
    { id: 'why-innovation', num: '03', label: 'Innovation focus', icon: 'ai' },
    { id: 'why-peers', num: '04', label: 'Talented peers', icon: 'internship' },
  ] as const,
  build: {
    title: 'Learn by building.|Co-developed with 100+ industry leaders.',
    sub: 'Curriculum updated every 6 months, with AI embedded from day one.',
    videos: [
      { name: 'Learn relevant skills that matter', role: 'Curriculum', text: 'Engineers from top tech companies on what SST students learn, and why.', videoId: 'zZ1roRdV7xU', thumb: A('yt-learn-by-building.webp') },
      { name: 'Go from beginner to industry ready', role: 'Zero code to internships', text: 'How students who started with no code landed internships by their second year.', videoId: 'Ez8oh_akMjw', thumb: A('yt-skills.webp') },
      { name: 'Compete with the best, on a global stage', role: 'ICPC · Meta Hacker Cup · GSoC', text: 'SST’s coders on taking on the world in the Olympics of coding.', videoId: 'MzqipVCcuEM', thumb: A('yt-beginner.webp') },
      { name: 'Monthly hackathons to sharpen your skills', role: 'Hackathons', text: 'A new build every month, from game dev to AI.', videoId: 'aDU9GVr4HBs', thumb: A('yt-compete.webp') },
    ],
  },
  leaders: {
    title: 'Access to industry leaders.|Those shaping the AI revolution.',
    sub: 'Get unparalleled access to the people building the products you use.',
    sessions: [
      { name: 'Varun Mohan', role: 'Building Antigravity at Google DeepMind', text: 'An MIT-trained AI innovator addressed SST students on reshaping software development.', videoId: 'fCg1bSh1RnI', thumb: A('yt-access.webp'), logo: { name: 'Google DeepMind', src: A('talk-varun.webp') } },
      { name: 'Yash Kumar', role: 'Lead Engineer at OpenAI · ChatGPT Agents', text: 'The creator of OpenAI’s first agent addressed students on Commencement Day.', videoId: '5R95YlIdeBg', thumb: A('yt-varun.webp'), logo: { name: 'OpenAI', src: A('talk-yash.png') } },
      { name: 'Rajan Anandan', role: 'Ex-MD SEA, Google', text: 'He spoke about striving for excellence, learning from failure, and staying hungry for success.', videoId: 'M7H1SHc1f2Q', thumb: A('yt-yash.webp'), logo: { name: 'Google', src: A('talk-rajan.png') } },
      { name: 'Jacob Singh', role: 'Ex-CTO, Blinkit, India’s largest Q-commerce', text: 'He shared deep insights on tech leadership and product thinking with the students.', videoId: 'QMjFvjBwuE4', thumb: A('yt-rajan.webp'), logo: { name: 'Blinkit', src: A('talk-jacob.png') } },
      { name: 'Rahul Chari', role: 'Co-founder, PhonePe, India’s largest UPI app', text: 'Rejected by Google, he built a leading UPI platform: a journey of grit and innovation.', videoId: 'fN43OAasN5w', thumb: A('yt-jacob.webp'), logo: { name: 'PhonePe', src: A('talk-rahul.png') } },
    ],
  },
  innovation: {
    title: 'Innovation focus.|Cutting-edge AI, robotics and drone labs.',
    sub: 'Access to labs led by experts, where ideas become funded companies.',
    startups: {
      value: '7+',
      label: 'Deep-tech startups',
      text: 'Deep-tech startups building cutting-edge AI products, including India’s first humanoid robot, now incubated at SST’s Innovation Lab.',
      slides: [
        { src: A('lab-1.webp'), label: 'NeoSapiens', text: 'AI-native wearable · funded on Shark Tank India' },
        { src: A('lab-2.webp'), label: 'xSpecies AI', text: 'Building India’s first humanoid robot' },
        { src: A('lab-3.webp'), label: 'Maximem', text: 'Deep-tech startup in the Innovation Lab' },
        { src: '/media/lab-build-1890.webp', label: 'The lab', text: 'Students building a drone at the workbench' },
        { src: '/media/lab-hand-1400.webp', label: 'Robotics', text: 'Testing a robotic hand in the robotics lab' },
        { src: '/media/lab-drone-1400.webp', label: 'Drones', text: 'Flight tests outside the lab' },
      ],
      foundedTitle: 'Founded by alumni from',
      founded: [
        { name: 'Stanford', src: A('lab-alumni-1.webp') },
        { name: 'NVIDIA', src: A('lab-alumni-2.webp') },
        { name: 'Amazon', src: A('lab-alumni-3.webp') },
        { name: 'Google', src: A('lab-alumni-4.webp') },
      ],
    },
    humanoid: { title: 'India’s first humanoid', text: 'One of the SIL startups is building India’s first humanoid under the leadership of Srikanth Vidapanakal.', person: { name: 'Srikanth Vidapanakal', role: 'Stanford alum · Director AI, OLA Electric', photo: A('humanoid.webp') }, video: { id: 'egfj2gIVWfQ', title: 'India’s first humanoid, built at SST’s Innovation Lab', image: A('yt-humanoid.webp') } },
    grant: { title: '₹25 Lakh Grant', text: 'Winner among 20,000+ entries at Samsung Solve for Tomorrow, Tushar is building AI glasses that help the visually impaired.', image: A('story-percevia.webp'), href: 'https://www.linkedin.com/posts/scaler-school-of-technology_samsungsolvefortomorrow-scalerschooloftechnology-activity-7392147723963228160-L4QB' },
    aiLabs: { title: 'Evaratus', formerly: 'Formerly Scaler AI Labs', text: 'Helping build the next frontier of AGI through environments, data & talent at scale. We partner with frontier AI companies to accelerate model training through high-fidelity RL environments, expert-curated datasets and a global network of elite talent.', image: A('ai-labs.webp'), href: 'https://scalerailabs.com/' },
  },
  peers: {
    title: 'Talented peers.|A diverse cohort from 27 Indian states.',
    sub: 'Rub shoulders with the best: a diverse cohort of students from 27 Indian states.',
    statsLabel: 'Batch 2026 admission stats',
    stats: [
      { value: '20,000', label: 'NSET payments' },
      { value: '5,600', label: 'Interviewed' },
      { value: '792', label: 'Selected' },
      { value: '3.9%', label: 'Selection rate' },
    ],
    image: { src: A('cohort-map.webp'), alt: 'SST students at work together' },
    offers: '180+ SST students also secured offers from prestigious universities like IITs, NITs, University of Toronto, University of Sydney, SUNY Buffalo, Heriot-Watt and more.',
    universities: [
      { name: 'IITs', mark: A('marks/u-iit-hd.png') },
      { name: 'NITs', mark: A('marks/u-nit.png') },
      { name: 'University of Toronto', mark: A('marks/u-utoronto.png') },
      { name: 'University of Sydney', mark: A('marks/u-sydney.png') },
      { name: 'SUNY Buffalo', mark: A('marks/u-buffalo-hd.png') },
      { name: 'Heriot-Watt', mark: A('marks/u-heriotwatt.png') },
    ],
    directoryTitle: 'Meet the students behind the numbers.',
    directoryLine: 'Browse SST’s student directory: their schools, projects and where they are headed.',
    directory: { label: 'Student Directory', href: `${SST}/alum-directory/` },
    leftKicker: 'Non-exhaustive list',
    leftTitle: 'Students who joined us leaving behind prestigious offers',
    students: [
      { name: 'Karthikeya', tag: 'JEE 98.8%', text: 'Currently building a cybersecurity tool, “Raptor”, which amassed great media attention on X.', image: A('student-karthikeya.webp') },
      { name: 'Anurag Jha', tag: 'IIT BHU offer', text: 'Working on an AI-powered voice automation tool. Also got a chance to pitch at Y Combinator.', image: A('student-anurag.webp') },
      { name: 'Sourashish Sarkar', tag: 'JU, IISER offer', text: 'Internship in Singapore with a stipend of ₹2 lakhs / month. Building his own startup, Delta.', image: A('student-sourashish.webp') },
    ],
  },
};

/* ── the counsellor callback band ──────────────────────────────────────────────────────────── */

export const sstCallback = {
  title: 'Plan your next step with confidence',
  lede: 'Connect with our admission counsellor to:',
  points: ['Understand the admission process', 'Explore scholarships & degree options', 'Discover if SST is the right fit for your goals'],
  cta: { label: 'Request callback', href: '#callback' },
  image: A('callback-1.webp'),
};

/* ── campus life ────────────────────────────────────────────────────────────────────────────── */

export const sstCampus: CampusLifeContent = {
  eyebrow: 'Campus life',
  title: 'Our campus sits at the centre of India’s startup capital.|Bengaluru.',
  sub: 'In India’s Silicon Valley: an urban campus that combines cutting-edge labs with a close community, where students learn, lead clubs, run fests and forge lifelong bonds.',
  feature: { media: A('campus-1.png'), alt: 'SST students walking across the campus', position: '50% 45%' },
  clubsTurn: { text: 'Amenities and features, built for building.', accent: 'Amenities and features' },
  clubs: [
    { name: 'Fully residential', tag: 'Living', text: 'On-campus living designed for focused building and strong peer community.', media: A('social-3.webp'), alt: 'Students on campus', position: '50% 40%' },
    { name: 'Scaler Innovation Lab', tag: 'Deep tech', text: 'India’s only deep-tech lab for undergraduates where innovative ideas come to life.', media: '/media/lab-build-960.webp', alt: 'Students building a drone in the Innovation Lab', position: '55% 50%' },
    { name: 'Clubs', tag: 'Community', text: 'Open source, competitive programming, sports and entrepreneurship.', media: A('social-4.webp'), alt: 'A student club meet-up', position: '50% 40%' },
    { name: 'Mental health support', tag: 'Wellbeing', text: 'Professional counselling through our in-house mental health counsellors.', media: A('social-5.webp'), alt: 'Students together on campus', position: '50% 40%' },
  ],
  photos: [
    { media: A('campus-3.png'), alt: 'Students on campus', position: '50% 50%' },
    { media: A('campus-2.png'), alt: 'The playing area', position: '50% 55%' },
    { media: A('social-2.webp'), alt: 'Students on campus', position: '50% 50%' },
    { media: A('campus-4.png'), alt: 'Students at work in a classroom', position: '50% 45%' },
  ],
  galleries: [
    {
      id: 'lab',
      label: 'Innovation Lab',
      feature: { media: '/media/lab-build-1890.webp', alt: 'Students building a drone together in the lab', caption: 'The Innovation Lab', position: '55% 50%' },
      photos: [
        { media: A('lab-1.webp'), alt: 'NeoSapiens, a lab startup', caption: 'NeoSapiens' },
        { media: A('lab-2.webp'), alt: 'xSpecies AI, a lab startup', caption: 'xSpecies AI' },
        { media: '/media/lab-hand-1400.webp', alt: 'A student testing a robotic hand', caption: 'Robotics' },
        { media: '/media/lab-drone-1400.webp', alt: 'A student flying a drone outside the lab', caption: 'Drones', position: '60% 50%' },
      ],
    },
    {
      id: 'play',
      label: 'Playing area',
      feature: { media: A('campus-2.png'), alt: 'The playing area', caption: 'The playing area', position: '50% 55%' },
      photos: [
        { media: A('social-6.webp'), alt: 'Students on campus' },
        { media: A('social-7.webp'), alt: 'Students on campus' },
        { media: A('social-8.webp'), alt: 'Students on campus' },
        { media: A('social-9.webp'), alt: 'Students on campus' },
      ],
    },
    {
      id: 'cafe',
      label: 'Cafeteria',
      feature: { media: A('campus-3.png'), alt: 'Students in the cafeteria', caption: 'The cafeteria' },
      photos: [
        { media: A('social-2.webp'), alt: 'Students on campus' },
        { media: A('social-1.webp'), alt: 'Students on campus' },
        { media: A('social-4.webp'), alt: 'Students on campus' },
        { media: A('social-3.webp'), alt: 'Students on campus' },
      ],
    },
    {
      id: 'class',
      label: 'Classroom',
      feature: { media: A('campus-4.png'), alt: 'Students at work in a classroom', caption: 'A classroom at SST' },
      photos: [
        { media: A('social-5.webp'), alt: 'Students on campus' },
        { media: A('social-6.webp'), alt: 'Students on campus' },
        { media: A('social-7.webp'), alt: 'Students on campus' },
        { media: A('social-8.webp'), alt: 'Students on campus' },
      ],
    },
  ],
  follow: [
    { handle: '@scaler_school_of_technology', note: 'Instagram', href: 'https://www.instagram.com/scaler_school_of_technology/' },
    { handle: '@ScalerSchoolofTechnology', note: 'YouTube', href: 'https://www.youtube.com/@ScalerSchoolOfTechnology' },
  ],
};

/** Campus life on SSB's campus component (ProgramCity on the SSB site's main pages): the places as a
 *  photo stage with their points, picked from a list; the amenities as four tiles under it. */
export const sstCampusCity = {
  eyebrow: 'Campus life',
  title: 'Our campus sits at the centre of India’s startup capital.|Bengaluru.',
  sub: 'In India’s Silicon Valley: an urban campus that combines cutting-edge labs with a close community, where students learn, lead clubs, run fests and forge lifelong bonds.',
  bento: [
    { src: A('campus-1.png'), alt: 'SST students walking across the campus', position: '50% 40%', caption: 'Bengaluru campus' },
    { src: '/media/lab-build-1890.webp', alt: 'Students building a drone in the Innovation Lab', position: '55% 50%', caption: 'Innovation Lab' },
    { src: A('campus-2.png'), alt: 'The playing area', position: '50% 55%', caption: 'Playing area' },
    { src: A('campus-3.png'), alt: 'Students in the cafeteria', position: '50% 50%', caption: 'Cafeteria' },
    { src: A('campus-4.png'), alt: 'Students at work in a classroom', position: '50% 45%', caption: 'Classroom' },
    { src: A('social-3.webp'), alt: 'Students on campus', position: '50% 35%' },
    { src: A('social-6.webp'), alt: 'Students on campus', position: '50% 35%' },
  ],
  placesTitle: 'Around the campus.',
  places: [
    { label: 'The campus', title: 'In India’s Silicon Valley', chip: 'Bengaluru', image: { src: A('campus-1.png'), alt: 'SST students walking across the campus', position: '50% 40%' }, points: [{ icon: 'home', text: 'Fully residential urban campus' }, { icon: 'hub', text: 'At the centre of India’s startup capital' }] },
    { label: 'Innovation Lab', title: 'Where ideas come to life', chip: 'Scaler Innovation Lab', image: { src: '/media/lab-build-1890.webp', alt: 'Students building a drone in the Innovation Lab', position: '55% 50%' }, points: [{ icon: 'lab', text: 'India’s only deep-tech lab for undergraduates' }, { icon: 'spark', text: 'AI, robotics and drone labs led by experts' }] },
    { label: 'Playing area', title: 'Sports, clubs and fests', chip: 'Playing area', image: { src: A('campus-2.png'), alt: 'The playing area on campus', position: '50% 55%' }, points: [{ icon: 'clubs', text: 'Open source, competitive programming, sports, entrepreneurship' }, { icon: 'spark', text: 'Students lead clubs and run fests' }] },
    { label: 'Cafeteria', title: 'A close community', chip: 'Cafeteria', image: { src: A('campus-3.png'), alt: 'Students together in the cafeteria', position: '50% 50%' }, points: [{ icon: 'home', text: 'On-campus living for focused building' }, { icon: 'clubs', text: 'A strong peer community, for life' }] },
    { label: 'Classroom', title: 'Learn by building', chip: 'Classroom', image: { src: A('campus-4.png'), alt: 'Students at work in a classroom', position: '50% 45%' }, points: [{ icon: 'build', text: 'Real products from day one, not lectures' }, { icon: 'spark', text: 'Curriculum updated every 6 months' }] },
  ] as { label: string; title: string; chip: string; image: { src: string; alt: string; position: string }; points: { icon: CampusIcon; text: string }[] }[],
  pillarsLabel: 'Amenities and features',
  pillars: [
    { icon: 'home', title: 'Fully residential', text: 'On-campus living designed for focused building and strong peer community.' },
    { icon: 'lab', title: 'Scaler Innovation Lab', text: 'India’s only deep-tech lab for undergraduates where ideas come to life.' },
    { icon: 'clubs', title: 'Clubs', text: 'Open source, competitive programming, sports, entrepreneurship.' },
    { icon: 'care', title: 'Mental health support', text: 'Professional counselling by in-house mental health counsellors.' },
  ] as { icon: CampusIcon; title: string; text: string }[],
  ctas: { primary: { label: 'Explore Campus Life', href: `${SST}/campus-life/` } },
};
export type CampusIcon = 'home' | 'hub' | 'lab' | 'spark' | 'clubs' | 'build' | 'care';

export const sstTour = {
  title: 'Take the 3D campus tour.',
  src: 'https://my.matterport.com/show/?m=vaq2aHbSqEJ&ss=1&sr=-.11,-.8&play=1',
  poster: '/sst/tour-aerial.jpg',
  cta: { label: 'Explore Campus Life', href: `${SST}/campus-life/` },
};

/* ── events ─────────────────────────────────────────────────────────────────────────────────── */

export const sstEvents = {
  eyebrow: 'Events',
  title: 'Exclusive free events.|Learn from industry experts.',
  sub: 'Join our events to learn from industry experts and get the complete Scaler School of Technology experience.',
  empty: 'No upcoming events right now. New sessions are added often.',
  cta: { label: 'View All Events', href: `${SST}/events/` },
};

/* ── admissions ─────────────────────────────────────────────────────────────────────────────── */

export const sstAdmissions: AdmissionsContent = {
  eyebrow: 'Admission process',
  title: 'How to join',
  titleTail: 'SST.',
  lede: 'Applications are open for the 2027 intake. Deadline: 9th January.',
  eligibility: [
    'Age ≤ 20 as of 1 July 2027',
    '≥ 60% in Grade 12 Mathematics',
    'Current Grade 12 students & pass-outs (2025 onwards). Open to all streams: science, commerce and arts',
  ],
  apply: { label: 'Apply Now', href: APPLY },
  advisor: { label: 'Talk to a counsellor', href: '#callback' },
  steps: [
    { title: 'Application form', text: 'Fill in your academic details and achievements. Rank your programme preference between AI & Business and Computer Science & AI. Submit a video essay to express your motivation towards the programme.' },
    { title: 'Qualify for interviews', text: 'Default: book a suitable slot for NSET, SST’s entrance test (application fee ₹1,000). Fast-track: based on your JEE & SAT scores you can skip the NSET and sit for admissions directly.' },
    { title: '1:1 interview (online)', text: 'Two rounds: an AI-led interview assessing programme fit and aptitude, followed by an industry-led interview focused on startup ambition and commitment.' },
    { title: 'Admission decision', text: 'Within 7–10 days of your interview, you will receive your result. Candidates will be either accepted or rejected.' },
    { title: 'Final enrolment', text: 'Scholarship and financial assistance provided for eligible students.' },
  ],
  fastTrack: 'JEE 92%ile+ or SAT 1430+: skip the NSET and go straight to the admission interviews.',
  intakes: [],
  fine: '',
  scholarshipsTitle: '',
  scholarshipsText: '',
  scholarships: [],
  backersLabel: '',
  backers: [],
};

/* ── in the news ────────────────────────────────────────────────────────────────────────────── */

export const sstPress: PressContent = {
  eyebrow: 'In the news',
  title: 'In the news.|What has been written about SST.',
  articles: [
    { outlet: 'Times Now', short: 'Times Now', image: A('news-1.webp'), title: 'IIT Madras has partnered with Scaler School of Technology to use AI tools in its BS Data Science course', text: 'Aiming to offer personalised, flexible, and high-quality learning to students across India.', href: '#press' },
    { outlet: 'Times Now', short: 'Times Now', image: A('news-2.webp'), title: 'IIT Roorkee and Scaler partner to launch high-impact AI programmes', text: 'Addressing talent shortages with industry-led AI programmes.', href: '#press' },
    { outlet: 'Republic', short: 'Republic', image: A('news-4.webp'), title: 'Why a CS aspirant chose Scaler SST over IIT Ropar', text: 'Real-world learning tipped the scales.', href: '#press' },
    { outlet: 'The Times of India', short: 'TOI', image: A('news-7.webp'), title: 'Scaler School of Technology launches a deep-tech innovation lab', text: 'To foster robotics, AI and autonomous startups.', href: '#press' },
  ],
  recognised: {
    title: 'Recognised & featured',
    logos: [
      { name: 'ASU+GSV Summit', src: A('press-1.webp') },
      { name: 'Codeforces', src: A('press-2.webp') },
      { name: 'Hurun India', src: A('press-3.webp') },
      { name: 'TIME', src: A('press-4.webp') },
    ],
  },
};

/* ── social ─────────────────────────────────────────────────────────────────────────────────── */

export const sstSocial = {
  eyebrow: 'Social',
  title: 'Follow our journey.|On Instagram and YouTube.',
  accounts: [
    { kind: 'instagram', handle: '@scaler_school_of_technology', href: 'https://www.instagram.com/scaler_school_of_technology/' },
    { kind: 'youtube', handle: '@ScalerSchoolofTechnology', href: 'https://www.youtube.com/@ScalerSchoolOfTechnology' },
  ] as const,
  /** the bento's photos, each with its shape (landscape ~1.6:1, portrait ~4:5), ordered so every desktop
   *  row is two of each: L P P L, P L L P, L P L P */
  photos: [
    { src: A('social-1.webp'), shape: 'l' },
    { src: A('social-3.webp'), shape: 'p' },
    { src: A('social-4.webp'), shape: 'p' },
    { src: A('campus-1.png'), shape: 'l' },
    { src: A('social-5.webp'), shape: 'p' },
    { src: A('social-2.webp'), shape: 'l' },
    { src: A('campus-3.png'), shape: 'l' },
    { src: A('social-6.webp'), shape: 'p' },
    { src: A('campus-4.png'), shape: 'l' },
    { src: A('social-7.webp'), shape: 'p' },
    { src: A('campus-2.png'), shape: 'l' },
    { src: A('social-9.webp'), shape: 'p' },
  ] as { src: string; shape: 'l' | 'p' }[],
  madeBy: 'Made with ♥ by SST students',
};

/* ── FAQ and the closing band ───────────────────────────────────────────────────────────────── */

// The live page's six questions and its own answers.
export const sstFaqs: Faq[] = [
  {
    question: 'How is SST different from a regular engineering college?',
    answer: 'Most engineering colleges teach CS through lectures and exams, and leave you underprepared for what the industry actually wants. SST works differently. You learn by building real products from day one, not sitting through lectures. The curriculum is co-developed with 100+ industry leaders from Google, Meta, Microsoft and OpenAI. You get access to India’s only undergraduate Innovation Lab, real industry internships, and startup building as part of the programme. By graduation, you’ll either step into a Senior SDE or AI/ML role at a top tech company, or scale your own startup, built with real funding and mentorship from SST.',
  },
  {
    question: 'What is the difference between CS & AI and AI & Business?',
    answer: 'Both programmes have AI built into the curriculum from Day 1 and share the same campus, labs, eligibility and scholarships. What differs is the focus and where each one takes you. CS & AI is for going deep into tech: 100% tech-focused across all 4 years, with deeper software engineering and AI/ML, more advanced projects, and up to a year of industry internship. It leads to roles like Senior SDE, AI/ML Engineer and Data Engineer, with BITS Pilani and IIT-M degree options. AI & Business is for building your own startup: ~70% tech, ~30% business, with “Founder Mode” in Year 4, where you build your own startup with mentorship from investors, VCs and operators. It leads to roles like AI Product Manager, AI Consultant and Founder’s Office, with 1 year of deferred placement support if you choose entrepreneurship, and a BITS Pilani degree option.',
  },
  {
    question: 'Can I apply for both the programmes simultaneously?',
    answer: 'Yes. When you apply, you can rank your preferred programme, CS & AI, AI & Business, or both, so we know your preference and can evaluate you accordingly.',
  },
  {
    question: 'Do I need coding experience before joining?',
    answer: 'Not at all. In SST’s first batch, ~65% of students started as complete beginners in coding, and they went on to compete in contests like ICPC and build real, innovative products. The curriculum takes you from zero to industry-ready. What matters more than prior coding knowledge is your curiosity, aptitude and willingness to learn.',
  },
  {
    question: 'What is the NSET exam and how do I prepare for it?',
    answer: 'The NSET (Scaler National Scholarship & Entrance Test) is a 120-minute online proctored exam that tests Mathematics and Logical Reasoning. Your score decides both your admission eligibility and how much scholarship you’ll get, and you can attempt it up to 3 times a year. You can also be shortlisted for your achievements, such as real-world projects with users, hackathons, early startups or hands-on AI experience. With a JEE score of 92%ile+ or an SAT score of 1430+, you can skip the NSET and go straight to the admission interviews. Once you complete your application, you’ll get the NSET Prep Kit with the syllabus, marks distribution and a sample paper.',
  },
  {
    question: 'Are scholarships available and what are the criteria to get one?',
    answer: 'Yes. SST offers two scholarships through the Scaler Impact Foundation, backed by industry leaders like Vijay Shekhar Sharma (Paytm) and Prasanna Sankar (Rippling). Merit-Based Scholarships look at your academic scores (Class X, XII, JEE, BITSAT, etc.), extracurriculars and tech achievements, with extra weightage for female students. Merit-cum-Need-Based Scholarships are for students with a family income below ₹5 LPA who can show financial need. Both cover tuition fees only, are awarded for the first year, and renew based on academic performance. To apply, fill out the detailed profile form when you register for NSET.',
  },
];

export const sstClose: CloseContent = {
  eyebrow: '2027 intake · Applications close 9 Jan',
  facts: [
    { value: '4 years', label: 'UG programmes' },
    { value: 'Bengaluru', label: 'Residential campus' },
    { value: '3.9%', label: 'Selection rate, 2026' },
  ],
  title: 'India’s Ivy League for the AI Age.',
  line: 'Applications are open for the 2027 intake.',
  primaryCta: { label: 'Apply Now', href: APPLY },
  secondaryCta: { label: 'Download Internship Report', href: '#internship-report' },
  faqHelp: { title: 'Still have questions?', line: 'Talk to an admission counsellor, one to one.', cta: 'Request a callback', href: '#callback' },
  image: A('campus-1.png'),
  imageSmall: A('campus-1.png'),
  imageAlt: 'SST students walking across the Bengaluru campus',
};

export const sstFooterExtras = {
  brandLine: 'Industry-integrated UG programmes in CS & AI and AI & Business. Applications are open for the 2027 intake.',
  address: ['Scaler School of Technology', 'Electronic City, Bengaluru,', 'Karnataka, India'],
};
