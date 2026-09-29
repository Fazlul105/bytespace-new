import { useRef, useState } from 'react'
import { courses } from '../data/courses'
import CourseCard from './CourseCard'
import Footer from './Footer'
import Icon from './Icon'
import SiteHeader from './SiteHeader'
import './CreatorProfilePage.css'

function FilterIcon({ kind }: { kind: 'filter' | 'category' | 'sort' }) {
  return (
    <svg
      className="creator-filter-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === 'filter' && <path d="M4 4h16l-6.5 8v7l-3 1v-8L4 4Z" />}
      {kind === 'category' && (
        <>
          <path d="m12 3 4 6H8l4-6Z" />
          <rect x="3" y="14" width="6" height="6" />
          <circle cx="17" cy="17" r="3" />
        </>
      )}
      {kind === 'sort' && <path d="M4 6h16M4 12h11M4 18h6" />}
    </svg>
  )
}

export default function CreatorProfilePage() {
  const [following, setFollowing] = useState(false)
  const [followFeedback, setFollowFeedback] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [level, setLevel] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('relevant')
  const [query, setQuery] = useState('')
  const filterButton = useRef<HTMLButtonElement>(null)

  const displayedCourses = courses.filter(
    (course) =>
      (!level || level === 'Beginner') &&
      (!category || course.categories.includes(category)) &&
      course.title.toLowerCase().includes(query.trim().toLowerCase()),
  )
  if (sort === 'title-asc')
    displayedCourses.sort((a, b) => a.title.localeCompare(b.title))
  if (sort === 'title-desc')
    displayedCourses.sort((a, b) => b.title.localeCompare(a.title))
  const hasFilters = Boolean(level || category || query.trim())
  const sortLabels: Record<string, string> = {
    relevant: 'Most relevant',
    'title-asc': 'Title: A–Z',
    'title-desc': 'Title: Z–A',
  }

  function resetFilters() {
    setLevel('')
    setCategory('')
    setQuery('')
  }

  function toggleFollow() {
    const next = !following
    setFollowing(next)
    setFollowFeedback(
      next
        ? 'Following PurePearl Studio in this preview. This preference is not saved.'
        : 'Follow removed in this preview. No account settings were changed.',
    )
  }

  return (
    <>
      <a className="skip-link" href="#creator-profile-title">
        Skip to content
      </a>
      <main>
        <div className="creator-profile-hero blue-grid">
          <SiteHeader light />
          <section
            className="creator-profile-intro container"
            aria-labelledby="creator-profile-title"
          >
            <div className="creator-identity">
              <img
                src="/assets/avatar-bearded.webp"
                alt="PurePearl Studio creator"
                width="96"
                height="96"
              />
              <div className="creator-identity-content">
                <div className="creator-name-row">
                  <h1 id="creator-profile-title" tabIndex={-1}>
                    PurePearl Studio
                  </h1>
                  <span className="creator-label">Creator</span>
                </div>
                <p>Passionate UI/UX, Web designer</p>
              </div>
            </div>
            <div className="creator-biography">
              <p>
                Welcome to the creative world of [Creator&apos;s Name]. Here,
                you&apos;ll discover the passion, expertise, and inspiration
                that drive my creative journey. Let&apos;s explore and learn
                together!
              </p>
              <p>
                ive into my creative portfolio, showcasing a glimpse of my
                artistic endeavors. From digital designs to multimedia projects,
                each piece tells a unique story. Explore the world of creativity
                with me.
              </p>
            </div>
            <div className="creator-profile-actions">
              <div className="creator-profile-counts">
                <a href="#creator-courses">
                  <span>3</span> Products
                </a>
                <span className="creator-followers">
                  <span>{following ? 13 : 12}</span> Followers
                </span>
              </div>
              <button
                className="button creator-follow-button"
                type="button"
                aria-pressed={following}
                onClick={toggleFollow}
              >
                {following ? 'Following' : 'Follow'}
              </button>
            </div>
            <p className="creator-follow-feedback" role="status">
              {followFeedback}
            </p>
          </section>
        </div>

        <section
          className="creator-catalog container"
          id="creator-courses"
          tabIndex={-1}
          aria-label="Courses by PurePearl Studio"
        >
          <div
            className="creator-filter-area"
            onKeyDown={(event) => {
              if (event.key === 'Escape' && filtersOpen) {
                setFiltersOpen(false)
                filterButton.current?.focus()
              }
            }}
          >
            <div className="creator-filter-toolbar">
              <div className="creator-filter-group">
                <button
                  ref={filterButton}
                  className={`creator-filter-control ${filtersOpen ? 'is-active' : ''}`}
                  type="button"
                  aria-expanded={filtersOpen}
                  aria-controls="creator-filter-panel"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <FilterIcon kind="filter" />
                  Filter
                </button>
                <label
                  className={`creator-filter-control ${level ? 'is-active' : ''}`}
                >
                  <Icon name="bars" />
                  <span className="sr-only">Course level</span>
                  <span aria-hidden="true">{level || 'Level'}</span>
                  <select
                    aria-label="Course level"
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                  >
                    <option value="">Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </label>
                <label
                  className={`creator-filter-control ${category ? 'is-active' : ''}`}
                >
                  <FilterIcon kind="category" />
                  <span className="sr-only">Course category</span>
                  <span aria-hidden="true">{category || 'Category'}</span>
                  <select
                    aria-label="Course category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="">Category</option>
                    {[
                      'Design',
                      'IT & Software',
                      'Business',
                      'Productivity',
                      'Marketing',
                    ].map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="creator-filter-control creator-sort">
                <FilterIcon kind="sort" />
                <span className="sr-only">Sort courses</span>
                <span aria-hidden="true">{sortLabels[sort]}</span>
                <select
                  aria-label="Sort courses"
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="relevant">Most relevant</option>
                  <option value="title-asc">Title: A–Z</option>
                  <option value="title-desc">Title: Z–A</option>
                </select>
              </label>
            </div>
            {filtersOpen && (
              <div className="creator-filter-panel" id="creator-filter-panel">
                <label htmlFor="creator-course-query">
                  Search this creator&apos;s courses
                </label>
                <div>
                  <input
                    id="creator-course-query"
                    type="search"
                    value={query}
                    maxLength={120}
                    placeholder="Search by course title"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <button
                    className="text-button"
                    type="button"
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            )}
          </div>

          <p
            className={hasFilters ? 'creator-results-status' : 'sr-only'}
            role="status"
          >
            {displayedCourses.length}{' '}
            {displayedCourses.length === 1 ? 'course' : 'courses'}
            {hasFilters ? ' match your filters.' : ' by PurePearl Studio.'}
            {hasFilters && (
              <button
                className="text-button"
                type="button"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            )}
          </p>
          {displayedCourses.length ? (
            <div className="course-grid creator-course-grid">
              {displayedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="empty-state creator-empty-state">
              <Icon name="search" />
              <h2>No courses found</h2>
              <p>Try another category, level, or course title.</p>
              <button className="button" type="button" onClick={resetFilters}>
                View all courses
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
