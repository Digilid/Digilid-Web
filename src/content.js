// All site copy lives here so the team can edit text without touching components.
// Items marked SAMPLE are placeholders: replace with real case studies, reviews and numbers before launch.

export const CONTACT_EMAIL = 'hello@digilid.com' // SAMPLE: confirm the studio inbox

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'reviews', label: 'Reviews' },
]

export const hero = {
  lines: ['Create', 'beyond', 'ordinary.'],
  intro:
    'Digilid is a creative studio that helps ambitious brands grow through strategy, design, motion and meaningful content.',
  primary: 'Start a project',
  secondary: 'See our work',
}

export const process = [
  { title: 'We observe.', text: 'We study your market, your customers and the gaps nobody has noticed yet.' },
  { title: 'We think.', text: 'We turn what we learn into a clear position and a plan worth backing.' },
  { title: 'We create.', text: 'We design, write, shoot and edit the work that carries the idea.' },
  { title: 'We move.', text: 'We launch, measure and keep the brand moving with purpose.' },
]

export const about = {
  heading: ['Curious by nature.', 'Creative by instinct.'],
  story:
    'Every brand has a story waiting to be discovered. We uncover it, shape it into something memorable, and move with purpose.',
  philosophy:
    'We communicate with clarity and humanity. Clear, not complex. Confident, not arrogant. Creative, not promotional. Thoughtful, not noisy. Human, always.',
  cards: [
    { title: 'Mission', text: 'To help brands find clarity, create with purpose and grow with impact.' },
    { title: 'Vision', text: 'To become a global creative company known for curiosity, originality and meaningful work.' },
    {
      title: 'The studio',
      text: 'Marketers, content creators, designers and an editor working as one team, from the first conversation to the final cut.',
    },
    {
      title: 'Digilid Academy',
      text: 'Our training arm, teaching digital content strategy, creative writing and digital marketing through structured programmes.',
    },
  ],
  values: [
    { key: 'curiosity', title: 'Curiosity', text: 'Ask one more question.' },
    { key: 'creativity', title: 'Creativity', text: 'Make the idea impossible to ignore.' },
    { key: 'purpose', title: 'Purpose', text: 'Every piece has a job to do.' },
    { key: 'integrity', title: 'Integrity', text: 'Say what we mean. Do what we say.' },
    { key: 'collaboration', title: 'Collaboration', text: 'Your team and ours, at one table.' },
  ],
}

export const services = {
  tagline: 'Smart Strategies. Real Results. Grow Your Brand Online.',
  word: 'AGENCY',
  left: [
    { key: 'web', title: 'Web Development', text: 'Fast, considered websites built to convert.' },
    { key: 'personal', title: 'Personal Branding', text: 'A clear, credible voice for founders and leaders.' },
    { key: 'hosting', title: 'Hosting Services', text: 'Managed hosting, uptime and care after launch.' },
    { key: 'video', title: 'Video Editing', text: 'Reels, films and edits cut for every platform.' },
  ],
  right: [
    { key: 'ads', title: 'Paid Ads', text: 'Meta and Google campaigns tuned for return.' },
    { key: 'seo', title: 'Search Engine Optimization', text: 'Be found by the people already looking for you.' },
    { key: 'social', title: 'Social Media Marketing', text: 'Content calendars, community and growth.' },
    { key: 'design', title: 'Graphics Design', text: 'Identity, campaigns and everything in between.' },
  ],
}

// SAMPLE: swap in real client case studies. Images come from the Digilid brand guide.
export const work = [
  { title: 'Digilid identity', tag: 'Brand identity', year: '2026', img: 'card' },
  { title: 'Clarity and humanity', tag: 'Out-of-home', year: '2026', img: 'billboard' },
  { title: 'Carry the mark', tag: 'Merchandise', year: '2026', img: 'tote' },
  { title: 'Object studies', tag: 'Product styling', year: '2026', img: 'bottle' },
  { title: 'The red pixel workshop', tag: 'Brand strategy', year: '2026', img: 'grid' },
]

// SAMPLE: replace with real reviews (with permission) and verified results.
export const reviews = [
  {
    quote: 'They asked better questions about our business than we did. The launch felt like us, only sharper.',
    name: 'Founder',
    role: 'Lifestyle brand',
    metric: '3.2×',
    metricLabel: 'enquiries in launch month',
  },
  {
    quote: 'Calm, clear and on time. The reels did the selling for us.',
    name: 'Owner',
    role: 'Food and beverage',
    metric: '+41%',
    metricLabel: 'seasonal orders',
  },
  {
    quote: 'Digilid rebuilt how we explain our product. Customers finally get it in one line.',
    name: 'Director',
    role: 'D2C startup',
    metric: '2.4×',
    metricLabel: 'qualified leads',
  },
  {
    quote: 'One team for strategy, design and video. It saved us months of back and forth.',
    name: 'Marketing lead',
    role: 'Hospitality group',
    metric: '68%',
    metricLabel: 'lower cost per booking',
  },
  {
    quote: 'They treat the brand like it’s their own, and push back when it matters.',
    name: 'Co-founder',
    role: 'Real estate developer',
    metric: '12 wks',
    metricLabel: 'brief to full rollout',
  },
]

export const marquee = [
  'Better questions',
  'Calm and clear',
  'Felt like us',
  'Pushed back when it mattered',
  'One team',
  'On time',
]

export const footer = {
  headline: ['Building', 'brands', 'that lead.'],
  cta: 'Start a project',
  columns: [
    { title: 'Studio', links: [['About', '#about'], ['Services', '#services'], ['Work', '#work'], ['Reviews', '#reviews']] },
    { title: 'Services', links: [['Paid Ads', '#services'], ['Social Media', '#services'], ['Web Development', '#services'], ['Video Editing', '#services']] },
  ],
  socials: [
    ['Instagram', '#'],
    ['LinkedIn', '#'],
    ['YouTube', '#'],
    ['Behance', '#'],
  ],
}
