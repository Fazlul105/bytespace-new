export type Course = {
  id: string
  title: string
  image: string
  alt: string
  categories: string[]
  description: string
}
export const courses: Course[] = [
  {
    id: 'figma',
    title: 'Learn Figma from Basic',
    image: 'course-figma.webp',
    alt: 'Designer working on interface layouts at a desk',
    categories: ['UI/UX Design', 'Design', 'Graphic Design', 'Web Development'],
    description:
      'Build a foundation in interface design, from your first frame to a clear, usable prototype.',
  },
  {
    id: 'digital-assets',
    title: 'Build Digital Asset',
    image: 'course-digital-assets.webp',
    alt: 'A collection of digital illustrations and icons',
    categories: [
      'Design',
      'Digital Illustration',
      'Graphic Design',
      'Drawing & Painting',
      'Animation',
      'Crafts',
    ],
    description:
      'Explore the process of turning creative ideas into a collection of useful digital assets.',
  },
  {
    id: 'big-data',
    title: 'the Power of Big Data',
    image: 'course-big-data.webp',
    alt: 'Analytics dashboard with charts on a computer monitor',
    categories: ['Data Science', 'IT & Software', 'Development', 'Business'],
    description:
      'Discover how to read data, understand patterns, and communicate insights with confidence.',
  },
  {
    id: 'productivity',
    title: 'Balancing Productivity and Self-Care',
    image: 'course-productivity.webp',
    alt: 'A bright home workspace with a desktop computer',
    categories: ['Productivity', 'Freelance & Entrepreneurship'],
    description:
      'Develop practical habits for focused work while making room for rest and sustainable growth.',
  },
  {
    id: 'finance',
    title: 'Mastering Money Management',
    image: 'course-finance.webp',
    alt: 'A financial chart showing growth over time',
    categories: ['Business', 'Finance', 'Freelance & Entrepreneurship'],
    description:
      'Learn the essentials of budgeting, planning, and building a more considered relationship with money.',
  },
  {
    id: 'startup',
    title: 'From Idea to Startup Success',
    image: 'course-startup.webp',
    alt: 'A team developing ideas with colorful sticky notes',
    categories: [
      'Business',
      'Marketing',
      'Social Media',
      'Creative Marketing',
      'Freelance & Entrepreneurship',
    ],
    description:
      'Take the first steps from an initial idea to a thoughtful plan for a new venture.',
  },
]
export const categoryRows = [
  [
    'Featured',
    'Music',
    'Drawing & Painting',
    'Marketing',
    'Animation',
    'Social Media',
    'UI/UX Design',
    'Creative Marketing',
  ],
  [
    'Digital Illustration',
    'Film & Video',
    'Crafts',
    'Freelance & Entrepreneurship',
    'Graphic Design',
    'Photography',
  ],
  ['Productivity', 'Web Development', 'Data Science', 'Cooking'],
]
