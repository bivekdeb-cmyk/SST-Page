/**
 * SSB footer content, from the SSB concept site (ssb-school-concept.vercel.app),
 * captured 2026-09-29. Components hold no copy: everything they print is here.
 */
export interface FooterLink {
  label: string;
  href: string;
}
export interface FooterContent {
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
    image: { src: string; alt: string };
    primary: FooterLink;
    secondary: FooterLink;
  };
  tagline: string;
  columns: { title: string; links: FooterLink[] }[];
  legal: string;
  backToTop: string;
  navLabel: string;
  /** Drawn in particles at the foot (decorative). */
  wordmark: string;
  /** The campus footer: the photo the footer stands on, and the short line beside the tagline. */
  campus: { image: { src: string; small: string; alt: string }; place: string };
  /** The building footer: the SSB building cut out (transparent around it), standing in front of the name. */
  building: { src: string; small: string; alt: string };
}

export const SSB_FOOTER: FooterContent = {
  cta: {
    eyebrow: 'Your next step',
    title: 'India’s Ivy League for the AI Age.',
    body: 'Explore the CS & AI and AI & Business programmes and decide which is the right fit for you.',
    note: 'Applications are open for the 2027 intake.',
    image: { src: '/sst/campus-1.png', alt: 'SST students walking across the Bengaluru campus' },
    primary: { label: 'Apply Now', href: 'https://www.scaler.com/school-of-technology/application/' },
    secondary: { label: 'Internship Report', href: '#internship-report' },
  },
  tagline: 'For people who build.',
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Programmes', href: '#programmes' },
        { label: 'Outcomes', href: '#placements' },
        { label: 'Why SST', href: '#why-sst' },
        { label: 'Campus Life', href: '#campus' },
      ],
    },
    {
      title: 'Our offerings',
      links: [
        { label: 'Scaler School of Business', href: 'https://www.scaler.com/school-of-business' },
        { label: 'Software Development', href: 'https://www.scaler.com/academy/' },
        { label: 'Data Science', href: 'https://www.scaler.com/data-science-course/' },
        { label: 'Advanced AI & Machine Learning', href: 'https://www.scaler.com/' },
      ],
    },
  ],
  legal: '© 2027 InterviewBit Technologies Pvt. Ltd. Scaler School of Technology offers a certificate-based program. It is not a university/college and does not confer degrees.',
  backToTop: 'Back to top',
  navLabel: 'Footer',
  wordmark: 'Scaler School of Technology',
  campus: { image: { src: '/sst/campus-1.png', small: '/sst/campus-1.png', alt: 'The SST campus in Bengaluru' }, place: 'Campus: Bengaluru' },
  building: { src: '/footer/building.webp', small: '/footer/building-800.webp', alt: 'The campus building in Bengaluru' },
};
