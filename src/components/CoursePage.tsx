import { useState } from 'react'
import type { ReactNode } from 'react'
import { courses } from '../data/courses'
import type { Course } from '../data/courses'
import SiteHeader from './SiteHeader'
import Footer from './Footer'
import Icon from './Icon'
import Modal from './Modal'
import './CoursePage.css'

export type CourseTab = 'about' | 'lessons' | 'reviews'
type CourseIconName =
  'video' | 'resources' | 'certificate' | 'consultation' | 'people' | 'share'
const courseIconPaths: Record<CourseIconName, ReactNode> = {
  video: (
    <>
      <path d="M3 5h12v14H3z" />
      <path d="m15 10 6-4v12l-6-4" />
    </>
  ),
  resources: (
    <>
      <path d="M3 4h7l2 3h9v14H3V4Z" />
      <path d="M6 11h12M6 15h9" />
    </>
  ),
  certificate: (
    <>
      <path d="M8 6H3v16h18V6h-5M8 12h3M6 17h5M15 15h3M15 18h3" />
      <rect x="8" y="2" width="8" height="7" rx="1" />
      <path d="m10 9-1 4 3-2 3 2-1-4" />
    </>
  ),
  consultation: (
    <>
      <path d="M7 14a7 7 0 0 1 7-7M3 13A11 11 0 0 1 14 2M8 4 6 2M4 8 2 6M17 9l-2 3 3 3 3-2v6c-6 1-12-5-11-11h6Z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M2 20v-3a7 7 0 0 1 14 0v3H2ZM17 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 4 5v2h-3" />
    </>
  ),
  share: (
    <>
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="18" cy="4" r="2.5" />
      <circle cx="18" cy="20" r="2.5" />
      <path d="m7 10.7 8.8-5.4M7 13.3l8.8 5.4" />
    </>
  ),
}
function CourseIcon({ name }: { name: CourseIconName }) {
  return (
    <svg
      className="course-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {courseIconPaths[name]}
    </svg>
  )
}
function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <span
      className="course-stars"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="star"
          className={star > rating ? 'star-empty' : ''}
        />
      ))}
    </span>
  )
}
const description = [
  'Embark on an enlightening exploration into the world of digital creation with our comprehensive course, "Build Digital Assets: A Comprehensive Guide." This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.',
  "In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.",
  "As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.",
]
const keyPoints = [
  'Foundational Concepts',
  'Design Principles Mastery',
  'Advanced Techniques in Digital Creation',
  'Project Showcase and Critique',
  'Optimizing for Various Platforms',
  'Digital Asset Management Best Practices',
  'Monetization Strategies',
  'Capstone Project: Building Your Portfolio',
]
const sneakPeeks = [
  { file: 'sketch', alt: 'Sketching interface ideas in a notebook' },
  { file: 'interface', alt: 'Designing an interface on a laptop' },
  { file: 'workspace', alt: 'Digital design workspace with a desktop monitor' },
  { file: 'mobile', alt: 'Two phones showing colorful mobile interfaces' },
]
const modules = [
  {
    title: 'Module 1: Introduction to Digital Assets',
    description:
      "Lay the groundwork with lessons like 'Understanding Digital Elements' and 'Navigating Design Software Tools.' Dive into the essentials of digital asset creation.",
  },
  {
    title: 'Module 2: Design Principles for Impact',
    description:
      "Master the principles that drive impactful designs with lessons such as 'Color Theory in Digital Design' and 'Typography Essentials.' Elevate your visual communication skills.",
  },
  {
    title: 'Module 4: User-Centric Design Strategies',
    description:
      "Understand 'Design Thinking in Digital Creation' and delve into 'User Experience (UX) Essentials.' Craft digital assets with a focus on user-centric design.",
  },
  {
    title: 'Module 5: Interactive Media and Engagement',
    description:
      "Engage your audience with lessons like 'Creating Interactive Presentations' and 'Integrating Multimedia Elements.' Master the art of creating immersive digital experiences.",
  },
  {
    title: 'Module 6: Project Showcase and Critique',
    description:
      "Perfect your presentation skills with 'Effective Presentation Techniques' and embrace collaboration with 'Peer Critique and Collaboration.' Showcase your work with confidence.",
  },
  {
    title: 'Module 7: Optimizing Digital Assets for Various Platforms',
    description:
      "Adapt your digital creations for 'Mobile Platforms' and optimize for 'Social Media.' Ensure widespread accessibility and engagement across diverse digital landscapes.",
  },
]
const lessons = [
  { name: 'Introduction to Digital Assets', duration: '12 mins' },
  { name: 'Design Principles for Impacts', duration: '21 mins' },
  { name: 'Advanced Techniques in Digital Creation', duration: '16 mins' },
]
const reviews = [
  {
    name: 'PurePearl Studio',
    avatar: 'purepearl',
    rating: 5,
    quote:
      '"The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!"',
  },
  {
    name: 'Albert Flores',
    avatar: 'albert',
    rating: 5,
    quote:
      "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
  },
  {
    name: 'Cody Fisher',
    avatar: 'cody',
    rating: 5,
    quote:
      'The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.',
  },
  {
    name: 'Brooklyn Simmons',
    avatar: 'brooklyn',
    rating: 5,
    quote:
      'The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.',
  },
]
type Preview = { title: string; description?: string }
function EnrollmentCard({
  onPreview,
  onEnroll,
  basePath,
}: {
  onPreview: (preview: Preview) => void
  onEnroll: () => void
  basePath: string
}) {
  const benefits: [CourseIconName, string][] = [
    ['resources', 'Learning Resources'],
    ['video', 'Quality Lesson Videos'],
    ['certificate', 'Certificate of Completion'],
    ['consultation', 'Private Consultation'],
  ]
  return (
    <aside
      className="course-enrollment"
      aria-label="Course enrollment and creator"
    >
      <h2>112 Lessons (24 hours)</h2>
      <ol className="course-lesson-preview">
        {lessons.map((lesson, index) => (
          <li key={lesson.name}>
            <button onClick={() => onPreview({ title: lesson.name })}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{lesson.name}</span>
              <span>{lesson.duration}</span>
            </button>
          </li>
        ))}
      </ol>
      <a
        className="course-more-lessons"
        href={`${basePath}/lessons#course-tabs`}
      >
        99 more videos
      </a>
      <p className="course-enroll-copy">
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>
      <p className="course-enroll-price">
        <strong>$25</strong>
        <span>/lifetime</span>
      </p>
      <button className="button course-enroll-button" onClick={onEnroll}>
        Enroll Now
      </button>
      <h2 className="course-includes-title">This course include</h2>
      <ul className="course-includes">
        {benefits.map(([icon, text]) => (
          <li key={text}>
            <CourseIcon name={icon} />
            {text}
          </li>
        ))}
      </ul>
      <div className="course-creator-summary">
        <img
          src="/assets/course-creator-portrait.webp"
          alt=""
          width="52"
          height="52"
        />
        <div>
          <a href="/creators/purepearl-studio">PurePearl Studio</a>
          <p>Professional Creator</p>
        </div>
      </div>
      <p className="course-creator-copy">
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>
      <a className="course-profile-link" href="/creators/purepearl-studio">
        See Full Profile
      </a>
    </aside>
  )
}
function AboutCourse({
  course,
  onImage,
}: {
  course: Course
  onImage: (image: { src: string; alt: string }) => void
}) {
  return (
    <div className="course-about">
      <h2>Description</h2>
      <div className="course-description">
        {(course.id === 'digital-assets'
          ? description
          : [course.description]
        ).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <h2>Sneak Peak</h2>
      <div className="course-sneak-grid">
        {sneakPeeks.map((image) => (
          <button
            key={image.file}
            onClick={() =>
              onImage({
                src: `/assets/course-sneak-${image.file}.webp`,
                alt: image.alt,
              })
            }
            aria-label={`Enlarge: ${image.alt}`}
          >
            <img
              src={`/assets/course-sneak-${image.file}.webp`}
              alt={image.alt}
              width="167"
              height="125"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      <h2>Key Points</h2>
      <ul className="course-key-points">
        {keyPoints.map((point) => (
          <li key={point}>
            <span>
              <Icon name="check" />
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}
function CourseLessons({
  onPreview,
}: {
  onPreview: (preview: Preview) => void
}) {
  return (
    <div className="course-lessons-body">
      <h2>Explore the Modules</h2>
      <p>
        Immerse yourself in the course content as we break down each module into
        comprehensive lessons, providing practical insights and hands-on
        experiences.
      </p>
      <h2>Lesson List</h2>
      <div className="course-module-list">
        {modules.map((module) => (
          <button
            className="course-module"
            key={module.title}
            onClick={() => onPreview(module)}
          >
            <span className="course-module-icon">
              <CourseIcon name="video" />
            </span>
            <span>
              <strong>{module.title}</strong>
              <span>{module.description}</span>
            </span>
          </button>
        ))}
      </div>
      <h2>Lesson Content</h2>
      <p>
        Engage with each lesson through captivating video content, detailed
        textual explanations, and interactive elements. Download resources,
        complete assignments, and test your understanding with quizzes.
      </p>
      <h2>Lesson Progress Tracking</h2>
      <p>
        Witness your growth as you complete lessons, with an intuitive progress
        tracking feature guiding you through your learning journey.
      </p>
      <div className="course-lesson-progress">
        <p>Learning Progress</p>
        <strong>55%</strong>
        <div
          role="progressbar"
          aria-label="Sample learning progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={55}
        >
          <span />
        </div>
      </div>
    </div>
  )
}
function CourseReviews({ course }: { course: Course }) {
  const [rating, setRating] = useState(0)
  const filtered = reviews.filter(
    (review) => !rating || review.rating === rating,
  )
  return (
    <div className="course-reviews-body">
      <h2>What Learners Are Saying</h2>
      <p>
        Discover what our learners have to say about their experience with '
        {course.id === 'digital-assets'
          ? 'Build Digital Assets: A Comprehensive Guide'
          : course.title}
        .' Read reviews and ratings from individuals who have embarked on the
        transformative journey of mastering{' '}
        {course.id === 'digital-assets'
          ? 'digital asset creation'
          : 'new skills'}
        .
      </p>
      <div
        className="course-rating-summary"
        aria-label="Sample course rating distribution"
      >
        <div className="course-rating-score">
          <span>Ratings</span>
          <strong>4.7</strong>
        </div>
        <div className="course-rating-distribution">
          {[720, 120, 21, 12, 16].map((count, index) => (
            <div key={count} className="course-rating-row">
              <div className="course-rating-track">
                <span style={{ width: `${[92, 36, 9, 3.5, 5][index]}%` }} />
              </div>
              <Stars />
              <span>{count}</span>
            </div>
          ))}
        </div>
      </div>
      <h2 className="course-individual-heading">Individual Reviews:</h2>
      <div
        className="course-review-filters"
        aria-label="Filter reviews by rating"
      >
        {[0, 5, 4, 3, 2, 1].map((value) => (
          <button
            key={value}
            className={rating === value ? 'active' : ''}
            aria-pressed={rating === value}
            onClick={() => setRating(value)}
          >
            {value ? (
              <>
                <Icon name="star" />
                {value}
              </>
            ) : (
              'All rating'
            )}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} {filtered.length === 1 ? 'review' : 'reviews'} shown
        {rating ? ` with ${rating} stars` : ''}.
      </p>
      <div className="course-review-list">
        {filtered.length ? (
          filtered.map((review) => (
            <article className="course-review-card" key={review.name}>
              <div className="course-review-author">
                <img
                  src={`/assets/course-review-${review.avatar}.webp`}
                  alt=""
                  width="52"
                  height="52"
                  loading="lazy"
                />
                <div>
                  <h3>{review.name}</h3>
                  <p>UI/UX Designer</p>
                </div>
                <span>a year ago</span>
              </div>
              <Stars rating={review.rating} />
              <p>{review.quote}</p>
            </article>
          ))
        ) : (
          <div className="course-review-empty">
            <h3>No {rating}-star reviews to display</h3>
            <p>The available sample reviews are all rated five stars.</p>
            <button className="button" onClick={() => setRating(0)}>
              Show all reviews
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default function CoursePage({
  tab = 'about',
  course = courses.find((item) => item.id === 'digital-assets')!,
}: {
  tab?: CourseTab
  course?: Course
}) {
  const [preview, setPreview] = useState<Preview | null>(null)
  const [enrollOpen, setEnrollOpen] = useState(false)
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null)
  const [shareOpen, setShareOpen] = useState(false)
  const [shareStatus, setShareStatus] = useState('')
  const basePath = `/courses/${course.id}`
  const title =
    course.id === 'digital-assets'
      ? 'Build Digital Asset: A Comprehensive Guide'
      : course.title
  const poster =
    course.id === 'digital-assets'
      ? '/assets/course-preview-instructor.webp'
      : `/assets/${course.image}`
  async function shareCourse() {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(
        new URL(basePath, window.location.origin).href,
      )
      setShareStatus('Course link copied')
    } catch {
      setShareOpen(true)
    }
  }
  return (
    <div className={`course-page course-page--${tab}`}>
      <a className="skip-link" href="#course-tabs">
        Skip to course content
      </a>
      <section
        className="course-masthead blue-grid"
        aria-labelledby="course-title"
      >
        <SiteHeader light />
        <div className="course-heading container">
          <h1 id="course-title">{title}</h1>
          <p className="course-subtitle">
            {course.id === 'digital-assets'
              ? 'Unlock the Power of Digital Creation with Expert Guidance'
              : course.description}
          </p>
          <p className="course-byline">
            by <a href="/creators/purepearl-studio">purepearl studio</a>
          </p>
          <div className="course-badges">
            <span>
              <Icon name="bars" />
              Intermediate
            </span>
            <a href={`${basePath}/reviews#course-tabs`}>
              <Icon name="star" />
              4.8 (172 reviews)
            </a>
            <span>
              <CourseIcon name="people" />
              199 Students
            </span>
          </div>
          <div className="course-share">
            <button className="button" onClick={shareCourse}>
              <CourseIcon name="share" />
              Share
            </button>
            <span role="status">{shareStatus}</span>
          </div>
        </div>
        <div className="course-media-layout container">
          <button
            className="course-poster"
            onClick={() => setPreview({ title })}
            aria-label={`Open video preview for ${title}`}
          >
            <img
              src={poster}
              alt={
                course.id === 'digital-assets'
                  ? 'Course instructor wearing glasses and a purple sweater'
                  : course.alt
              }
              width="1440"
              height="960"
              fetchPriority="high"
            />
            <span className="course-play">
              <svg viewBox="0 0 60 60" aria-hidden="true">
                <circle cx="30" cy="30" r="30" fill="#f5f5ff" />
                <path d="m25 17 17 13-17 13V17Z" fill="#b09788" />
              </svg>
            </span>
          </button>
          <EnrollmentCard
            onPreview={setPreview}
            onEnroll={() => setEnrollOpen(true)}
            basePath={basePath}
          />
        </div>
      </section>
      <main id="course-tabs" className="course-body container" tabIndex={-1}>
        <div className="course-body-column">
          <nav className="course-tabs" aria-label="Course sections">
            {(['about', 'lessons', 'reviews'] as const).map((section) => (
              <a
                key={section}
                href={`${basePath}${section === 'about' ? '' : `/${section}`}#course-tabs`}
                aria-current={tab === section ? 'page' : undefined}
              >
                {section === 'about'
                  ? 'About'
                  : section === 'lessons'
                    ? tab === 'about'
                      ? 'Lessons'
                      : 'Lesson'
                    : 'Reviews'}
              </a>
            ))}
          </nav>
          {tab === 'about' ? (
            <AboutCourse course={course} onImage={setImage} />
          ) : tab === 'lessons' ? (
            <CourseLessons onPreview={setPreview} />
          ) : (
            <CourseReviews course={course} />
          )}
        </div>
      </main>
      <Footer
        onCategory={(category) =>
          window.location.assign(
            `/search?category=${encodeURIComponent(category)}`,
          )
        }
      />
      {preview && (
        <Modal title={preview.title} onClose={() => setPreview(null)}>
          <img
            className="course-preview-dialog-image"
            src={poster}
            alt="Course preview"
          />
          <p>{preview.description || course.description}</p>
          <p>A playable lesson video is not available in this preview.</p>
          <a className="button" href={`${basePath}/lessons#course-tabs`}>
            Explore lessons
          </a>
        </Modal>
      )}
      {enrollOpen && (
        <Modal
          title="Start your learning journey"
          onClose={() => setEnrollOpen(false)}
        >
          <p>{title}</p>
          <p>
            <strong>$25</strong> for lifetime access
          </p>
          <p>
            Enrollment and payments are not available in this preview. You can
            explore the account registration form.
          </p>
          <a className="button" href="/signup">
            Create an account
          </a>
        </Modal>
      )}
      {image && (
        <Modal title="Sneak peek" onClose={() => setImage(null)}>
          <img
            className="course-expanded-image"
            src={image.src}
            alt={image.alt}
          />
          <p>{image.alt}</p>
        </Modal>
      )}
      {shareOpen && (
        <Modal title="Share this course" onClose={() => setShareOpen(false)}>
          <p>Copy this link to share the course.</p>
          <label className="sr-only" htmlFor="course-share-link">
            Course link
          </label>
          <input
            id="course-share-link"
            className="course-share-input"
            readOnly
            value={new URL(basePath, window.location.origin).href}
            onFocus={(event) => event.currentTarget.select()}
          />
        </Modal>
      )}
    </div>
  )
}
