import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { courses, categoryRows } from '../data/courses'
import type { Course } from '../data/courses'
import Brand from './Brand'
import Icon from './Icon'
import type { IconName } from './Icon'
import CourseCard from './CourseCard'
import { Ornaments, ProgressCard, StudentCard } from './Visuals'
import Modal from './Modal'
import Footer from './Footer'

const learningPaths: [string, IconName][] = [
  ['Design', 'design'],
  ['Development', 'development'],
  ['IT & Software', 'laptop'],
  ['Business', 'business'],
  ['Marketing', 'marketing'],
  ['Photography', 'camera'],
]
const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Enthusiastic Learner',
    avatar: 'woman',
    quote:
      '“ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.”',
  },
  {
    name: 'James L.',
    role: 'Lifelong Learner',
    avatar: 'james',
    quote:
      '“I’ve tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.”',
  },
  {
    name: 'Alex B.',
    role: 'Inspired Creator',
    avatar: 'alex',
    quote:
      '“As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It’s fulfilling to see my courses making a positive impact on learners globally.”',
  },
]
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [category, setCategory] = useState('Featured')
  const [showMore, setShowMore] = useState(false)
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const filtered = courses.filter(
    (course) =>
      (category === 'Featured' || course.categories.includes(category)) &&
      `${course.title} ${course.categories.join(' ')} purepearl studio`
        .toLowerCase()
        .includes(search.toLowerCase()),
  )
  function selectCategory(next: string, scroll = false) {
    setCategory(next)
    setSearch('')
    setQuery('')
    if (scroll) {
      resultsRef.current?.scrollIntoView({ block: 'start' })
      resultsRef.current?.focus({ preventScroll: true })
    }
  }
  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearch(query.trim())
    setCategory('Featured')
    resultsRef.current?.scrollIntoView({ block: 'start' })
    resultsRef.current?.focus({ preventScroll: true })
  }
  return (
    <>
      <a className="skip-link" href="#hero-title">
        Skip to content
      </a>
      <main id="main">
        <section className="hero blue-grid" aria-labelledby="hero-title">
          <header
            className="header container"
            onKeyDown={(event) => {
              if (menuOpen && event.key === 'Escape') {
                setMenuOpen(false)
                event.currentTarget
                  .querySelector<HTMLButtonElement>('.mobile-menu-toggle')
                  ?.focus()
              }
            }}
          >
            <Brand light />
            <nav className="desktop-nav" aria-label="Main navigation">
              <a href="#home">Home</a>
              <a href="#courses">Courses</a>
              <a href="#creators">Creators</a>
            </nav>
            <div className="header-actions">
              <a href="/login">Sign In</a>
              <a href="/signup">Join Us</a>
              <a href="/login" aria-label="Your courses">
                <Icon name="bag" />
              </a>
            </div>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
            {menuOpen && (
              <nav
                id="mobile-nav"
                className="mobile-nav"
                aria-label="Mobile navigation"
              >
                <a href="#home" onClick={() => setMenuOpen(false)}>
                  Home
                </a>
                <a href="#courses" onClick={() => setMenuOpen(false)}>
                  Courses
                </a>
                <a href="#creators" onClick={() => setMenuOpen(false)}>
                  Creators
                </a>
                <a href="/login">Sign In</a>
                <a href="/signup">Join Us</a>
              </nav>
            )}
          </header>
          <div id="home" className="hero-copy container">
            <h1 id="hero-title" tabIndex={-1}>
              Get Access to Hundreds <br />
              Courses Available
            </h1>
            <p>
              Unlock your creativity, gain valuable knowledge, and grow your
              business with our wide range of courses.
            </p>
            <form className="hero-search" role="search" onSubmit={submitSearch}>
              <label className="search-input">
                <span className="sr-only">
                  Search courses, topics, or creators
                </span>
                <Icon name="search" />
                <input
                  type="search"
                  placeholder="Course, topic, creator"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  maxLength={120}
                />
              </label>
              <button className="button" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-ring" />
            <img
              className="hero-person"
              src="/assets/hero-learner.webp"
              width="578"
              height="541"
              alt=""
              fetchPriority="high"
            />
            <ProgressCard />
            <StudentCard />
            <div className="design-badge">
              <p>UI/UX Design</p>
              <span>
                200 Courses <b>•</b> 1000+ Students
              </span>
            </div>
          </div>
          <Ornaments variant="hero" />
        </section>
        <section className="partners" aria-label="Learning partners">
          <div className="container partner-list">
            {[1, 2, 3, 4, 5].map((number) => (
              <img
                key={number}
                src={`/assets/partner-logo-${number}.svg`}
                width="168"
                height="44"
                alt={`Logoipsum partner ${number}`}
                loading="lazy"
              />
            ))}
          </div>
        </section>
        <section
          className="discovery container"
          id="courses"
          aria-labelledby="discovery-title"
        >
          <div className="section-heading">
            <h2 id="discovery-title">
              Discover Your Passion, <br />
              Build Your Skills
            </h2>
            <p>
              At Bytespace Courses, we bring you closer to life-changing
              knowledge. Explore a variety of courses across different
              <br className="wide-break" /> fields, from technology to the arts,
              and make a difference in your career and life.
            </p>
          </div>
          <div
            className="category-filters"
            aria-label="Filter courses by category"
          >
            {categoryRows.map((row, index) => (
              <div className="filter-row" key={index}>
                {row.map((label) => (
                  <button
                    key={label}
                    className={`filter-chip ${category === label ? 'active' : ''}`}
                    aria-pressed={category === label}
                    onClick={() => selectCategory(label)}
                  >
                    {label}
                  </button>
                ))}
                {index === 2 && (
                  <button
                    className="more-categories"
                    aria-expanded={showMore}
                    aria-controls="extra-categories"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? '− Less' : '+ More'}
                  </button>
                )}
              </div>
            ))}
            {showMore && (
              <div className="filter-row" id="extra-categories">
                {[
                  'Business',
                  'Finance',
                  'Development',
                  'IT & Software',
                  'Sport',
                ].map((label) => (
                  <button
                    key={label}
                    className={`filter-chip ${category === label ? 'active' : ''}`}
                    aria-pressed={category === label}
                    onClick={() => selectCategory(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div
            className="course-results"
            ref={resultsRef}
            tabIndex={-1}
            aria-label="Course results"
          >
            <p
              className={
                category !== 'Featured' || search ? 'result-summary' : 'sr-only'
              }
              role="status"
            >
              {filtered.length} {filtered.length === 1 ? 'course' : 'courses'}
              {search
                ? ` for “${search}”`
                : category !== 'Featured'
                  ? ` in ${category}`
                  : ' available'}
              {(category !== 'Featured' || search) && (
                <button
                  className="text-button"
                  onClick={() => selectCategory('Featured')}
                >
                  Clear filters
                </button>
              )}
            </p>
            {filtered.length ? (
              <div className="course-grid">
                {filtered.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onSelect={setSelectedCourse}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <Icon name="search" />
                <h3>No courses found</h3>
                <p>Try a different topic or explore the featured courses.</p>
                <button
                  className="button"
                  onClick={() => selectCategory('Featured')}
                >
                  View featured courses
                </button>
              </div>
            )}
          </div>
          <section
            className="learning-paths"
            id="categories"
            aria-labelledby="paths-title"
          >
            <div className="section-heading">
              <h2 id="paths-title">
                Explore Diverse Learning Paths at Bytespace
              </h2>
              <p>
                At Bytespace, we believe in empowering individuals through
                knowledge. Our diverse range of courses spans various
                <br className="wide-break" /> fields, ensuring there’s something
                for everyone. Unleash your potential and explore our carefully
                curated categories.
              </p>
            </div>
            <div className="path-grid">
              {learningPaths.map(([name, icon]) => (
                <button
                  className="path-card"
                  key={name}
                  onClick={() => selectCategory(name, true)}
                >
                  <span>
                    <Icon name={icon} />
                  </span>
                  {name}
                </button>
              ))}
            </div>
          </section>
        </section>
        <section
          className="features"
          aria-label="Learn and create with ByteSpace"
        >
          <div className="feature-row growth container">
            <div className="feature-copy">
              <h2>
                Your Path to Professional <br />
                Growth Starts Here!
              </h2>
              <p>
                Explore our curated selection of courses tailored to enhance
                your capabilities and accelerate your career journey. <br />
                Whether you are looking to sharpen specific skills, gain
                industry expertise, or embark on a new career path entirely, we
                have the resources you need.
              </p>
              <dl className="stats">
                <div>
                  <dt>12K</dt>
                  <dd>Students</dd>
                </div>
                <div>
                  <dt>70+</dt>
                  <dd>Courses</dd>
                </div>
                <div>
                  <dt>16</dt>
                  <dd>Creators</dd>
                </div>
              </dl>
            </div>
            <div className="growth-art" aria-hidden="true">
              <CourseCard course={courses[0]} decorative />
              <img
                className="growth-person"
                src="/assets/hero-learner.webp"
                alt=""
                width="577"
                height="540"
                loading="lazy"
              />
              <ProgressCard />
              <img
                className="feature-spring"
                src="/assets/ornament-creator-spring-tilted-lime.svg"
                alt=""
                width="216"
                height="216"
                loading="lazy"
              />
            </div>
          </div>
          <div className="feature-row create container" id="creators">
            <div className="creator-art" aria-hidden="true">
              <div className="revenue-card revenue-total">
                <p>Total Revenue</p>
                <small>July 1-28</small>
                <strong>$120.29</strong>
                <div className="progress-track">
                  <span />
                </div>
              </div>
              <div className="revenue-card revenue-year">
                <p>Year to Date</p>
                <small>2023</small>
                <strong>$1,200.38</strong>
                <span className="revenue-change">+12$</span>
              </div>
              <img
                className="creator-person"
                src="/assets/creator-learner.webp"
                width="435"
                height="596"
                alt=""
                loading="lazy"
              />
              <StudentCard />
              <img
                className="feature-spring"
                src="/assets/ornament-creator-spring-tilted-lime.svg"
                width="216"
                height="216"
                alt=""
                loading="lazy"
              />
            </div>
            <div className="feature-copy">
              <h2>
                Create &amp; Manage <br />
                Courses Easily.
              </h2>
              <p>
                <strong>ByteSpace</strong> supports individuals or entities in
                the creation, publication, and administration of educational
                courses.
              </p>
              <ul className="creator-benefits">
                {[
                  'Share Your Expertise',
                  'Monetize Your Passion',
                  'Flexibility and Autonomy',
                  'Build a Community',
                ].map((text) => (
                  <li key={text}>
                    <span>
                      <Icon name="check" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section
          className="creator-cta blue-grid"
          aria-labelledby="creator-cta-title"
        >
          <Ornaments variant="creator" />
          <div className="cta-copy container">
            <h2 id="creator-cta-title">
              Unlock Your Potential as a <br />
              Creator with ByteSpace
            </h2>
            <p>
              Experience the collaboration of numerous creators and an expanding
              selection of courses. Register now and become a
              <br className="wide-break" /> part of a community comprising over
              10,000 local and international creators. Utilize our Course
              Editor, and showcase your
              <br className="wide-break" /> expertise by publishing your finest
              course on the ByteSpace Course Library.
            </p>
            <a className="button" href="/signup">
              Join as Creator
            </a>
          </div>
        </section>
        <section className="testimonials" aria-labelledby="testimonials-title">
          <div className="container">
            <div className="testimonials-intro">
              <h2 id="testimonials-title">
                Discover What Our <br />
                Community Is Saying
              </h2>
              <p>
                At ByteSpace, our vibrant community of learners and creators is
                at the heart of what we do. Hear directly from those who have
                experienced the transformative journey of learning and creating
                on our platform. Explore testimonials that reflect the diverse
                perspectives of enthusiastic learners and accomplished creators.
              </p>
            </div>
            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <figure key={item.name} className="testimonial-card">
                  <img
                    src={`/assets/avatar-${item.avatar}.webp`}
                    alt=""
                    width="80"
                    height="80"
                    loading="lazy"
                  />
                  <figcaption>
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                  </figcaption>
                  <blockquote>{item.quote}</blockquote>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer onCategory={(name) => selectCategory(name, true)} />
      {selectedCourse && (
        <Modal
          title={selectedCourse.title}
          onClose={() => setSelectedCourse(null)}
        >
          <img
            className="modal-course-image"
            src={`/assets/${selectedCourse.image}`}
            alt={selectedCourse.alt}
          />
          <p>{selectedCourse.description}</p>
          <dl className="course-facts">
            <div>
              <dt>Level</dt>
              <dd>Beginner</dd>
            </div>
            <div>
              <dt>Lessons</dt>
              <dd>17</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>2 hours 16 mins</dd>
            </div>
          </dl>
          <p className="modal-price">
            <strong>$25</strong> / lifetime
          </p>
          <a className="button" href="/signup">
            Start learning
          </a>
          <p className="modal-note">
            Course preview. Enrollment and payments are not connected.
          </p>
        </Modal>
      )}
    </>
  )
}
