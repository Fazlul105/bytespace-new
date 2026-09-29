import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { categoryRows, courses } from '../data/courses'
import CourseCard from './CourseCard'
import Footer from './Footer'
import Icon from './Icon'
import SiteHeader from './SiteHeader'
import './SearchPage.css'

type SearchMode = 'courses' | 'creators'
type SearchLevel = 'all' | 'beginner' | 'intermediate' | 'advanced'
type SearchSort = 'relevant' | 'title-asc' | 'title-desc'
const levelLabels: Record<SearchLevel, string> = {
  all: 'Level',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}
const sortLabels: Record<SearchSort, string> = {
  relevant: 'Most relevant',
  'title-asc': 'Title: A–Z',
  'title-desc': 'Title: Z–A',
}
type SearchState = {
  q: string
  category: string
  level: SearchLevel
  sort: SearchSort
  mode: SearchMode
  rating: string
  duration: string
  page: number
}

const pageSize = 18
const featuredCategories = [...categoryRows[0], 'Cooking']
const categories = [
  ...new Set([
    ...categoryRows.flat(),
    ...courses.flatMap((course) => course.categories),
    'Business',
    'Development',
    'IT & Software',
    'Finance',
    'Sport',
  ]),
]
// The reference repeats six sample courses. Keep those sample entries rather
// than inventing additional course titles, ratings, or sales data.
const sampleCatalog = Array.from({ length: pageSize * 5 }, (_, index) => ({
  course: courses[index % courses.length],
  sampleId: index,
}))
const defaultState: SearchState = {
  q: '',
  category: 'Featured',
  level: 'all',
  sort: 'relevant',
  mode: 'courses',
  rating: 'any',
  duration: 'any',
  page: 1,
}

function readSearchState(): SearchState {
  const params = new URLSearchParams(window.location.search)
  const level = params.get('level')
  const sort = params.get('sort')
  const category = params.get('category') ?? 'Featured'
  const rating = params.get('rating') ?? 'any'
  const duration = params.get('duration') ?? 'any'
  return {
    q: (params.get('q') ?? '').slice(0, 120),
    category: categories.includes(category) ? category : 'Featured',
    level:
      level === 'beginner' || level === 'intermediate' || level === 'advanced'
        ? level
        : 'all',
    sort: sort === 'title-asc' || sort === 'title-desc' ? sort : 'relevant',
    mode: params.get('mode') === 'creators' ? 'creators' : 'courses',
    rating: ['4', '4.5', '4.8'].includes(rating) ? rating : 'any',
    duration: ['short', 'long'].includes(duration) ? duration : 'any',
    page: Math.max(1, Math.min(5, Math.floor(Number(params.get('page')) || 1))),
  }
}

function searchUrl(state: SearchState) {
  const params = new URLSearchParams()
  if (state.q) params.set('q', state.q)
  if (state.category !== 'Featured') params.set('category', state.category)
  if (state.level !== 'all') params.set('level', state.level)
  if (state.sort !== 'relevant') params.set('sort', state.sort)
  if (state.mode !== 'courses') params.set('mode', state.mode)
  if (state.rating !== 'any') params.set('rating', state.rating)
  if (state.duration !== 'any') params.set('duration', state.duration)
  if (state.page > 1) params.set('page', String(state.page))
  return `/search${params.size ? `?${params.toString()}` : ''}`
}

function SearchControlIcon({
  name,
}: {
  name: 'filter' | 'category' | 'sort' | 'down' | 'left' | 'right'
}) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'filter' && <path d="M3 4h18l-7 8v7l-4 2v-9L3 4Z" />}
      {name === 'category' && (
        <>
          <path d="m12 2 4 7H8l4-7Z" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <circle cx="17.5" cy="17.5" r="3.5" />
        </>
      )}
      {name === 'sort' && <path d="M4 6h16M4 12h11M4 18h6" />}
      {name === 'down' && <path d="m8 10 4 4 4-4" />}
      {name === 'left' && <path d="m14 6-6 6 6 6" />}
      {name === 'right' && <path d="m10 6 6 6-6 6" />}
    </svg>
  )
}

export default function SearchPage() {
  const [state, setState] = useState<SearchState>(readSearchState)
  const [draftQuery, setDraftQuery] = useState(state.q)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function restoreSearch() {
      const restored = readSearchState()
      setState(restored)
      setDraftQuery(restored.q)
    }
    window.addEventListener('popstate', restoreSearch)
    return () => window.removeEventListener('popstate', restoreSearch)
  }, [])

  function updateSearch(patch: Partial<SearchState>, scroll = false) {
    const next = { ...state, page: 1, ...patch }
    setState(next)
    window.history.pushState(null, '', searchUrl(next))
    if (scroll) {
      window.requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ block: 'start' })
        resultsRef.current?.focus({ preventScroll: true })
      })
    }
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    updateSearch({ q: draftQuery.trim() }, true)
  }

  function resetSearch() {
    setDraftQuery('')
    updateSearch(defaultState)
    inputRef.current?.focus()
  }

  const query = state.q.toLowerCase()
  const matchesLevel = state.level === 'all' || state.level === 'beginner'
  const matchesRating = state.rating === 'any' || Number(state.rating) <= 4.5
  const matchesDuration = state.duration !== 'short'
  const matchingCourses = sampleCatalog
    .filter(
      ({ course }) =>
        matchesLevel &&
        matchesRating &&
        matchesDuration &&
        (state.category === 'Featured' ||
          course.categories.includes(state.category)) &&
        `${course.title} ${course.categories.join(' ')} purepearl studio`
          .toLowerCase()
          .includes(query),
    )
    .sort((a, b) => {
      if (state.sort === 'title-asc')
        return a.course.title.localeCompare(b.course.title)
      if (state.sort === 'title-desc')
        return b.course.title.localeCompare(a.course.title)
      return a.sampleId - b.sampleId
    })
  const creatorMatches =
    matchesLevel &&
    matchesRating &&
    matchesDuration &&
    'purepearl studio design business technology'.includes(query) &&
    (state.category === 'Featured' ||
      courses.some((course) => course.categories.includes(state.category)))
  const resultCount =
    state.mode === 'courses' ? matchingCourses.length : Number(creatorMatches)
  const pageCount = Math.max(1, Math.ceil(resultCount / pageSize))
  const currentPage = Math.min(state.page, pageCount)
  const visibleCourses = matchingCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )
  const hasActiveSearch =
    state.q !== '' ||
    state.category !== 'Featured' ||
    state.level !== 'all' ||
    state.rating !== 'any' ||
    state.duration !== 'any' ||
    state.mode !== 'courses'

  return (
    <div className="search-page">
      <a className="skip-link" href="#search-page-title">
        Skip to content
      </a>
      <div className="search-page-banner blue-grid">
        <SiteHeader light />
        <div className="search-page-intro container">
          <h1 id="search-page-title" tabIndex={-1}>
            Find Your Next {state.mode === 'creators' ? 'Creator' : 'Course'}
          </h1>
          <form
            className="catalog-search"
            role="search"
            onSubmit={submitSearch}
          >
            <div className="catalog-search-input">
              <button type="submit" aria-label="Search">
                <Icon name="search" />
              </button>
              <label className="sr-only" htmlFor="catalog-search-query">
                Search {state.mode}
              </label>
              <input
                ref={inputRef}
                id="catalog-search-query"
                type="search"
                placeholder="Search"
                value={draftQuery}
                onChange={(event) => setDraftQuery(event.target.value)}
                maxLength={120}
              />
            </div>
            <label className="catalog-search-mode">
              <span className="sr-only">Search type</span>
              <select
                value={state.mode}
                onChange={(event) =>
                  updateSearch({
                    mode: event.target.value as SearchMode,
                    q: draftQuery.trim(),
                  })
                }
              >
                <option value="courses">Courses</option>
                <option value="creators">Creators</option>
              </select>
              <SearchControlIcon name="down" />
            </label>
          </form>
        </div>
      </div>

      <main className="search-page-main container">
        <div className="catalog-toolbar">
          <button
            className={`catalog-filter-button ${filtersOpen ? 'is-open' : ''}`}
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            aria-controls="catalog-extra-filters"
          >
            <SearchControlIcon name="filter" />
            Filter
          </button>
          <label
            className={`catalog-select catalog-level ${state.level !== 'all' ? 'catalog-value-selected' : ''}`}
          >
            <Icon name="bars" />
            <span className="sr-only">Course level</span>
            <span className="catalog-select-value" aria-hidden="true">
              {levelLabels[state.level]}
            </span>
            <select
              aria-label="Course level"
              value={state.level}
              onChange={(event) =>
                updateSearch({ level: event.target.value as SearchLevel })
              }
            >
              <option value="all">Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
          <label
            className={`catalog-select catalog-category ${state.category !== 'Featured' ? 'catalog-value-selected' : ''}`}
          >
            <SearchControlIcon name="category" />
            <span className="sr-only">Course category</span>
            <span className="catalog-select-value" aria-hidden="true">
              {state.category === 'Featured' ? 'Category' : state.category}
            </span>
            <select
              aria-label="Course category"
              value={state.category}
              onChange={(event) =>
                updateSearch({ category: event.target.value })
              }
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'Featured' ? 'Category' : category}
                </option>
              ))}
            </select>
          </label>
          <label className="catalog-select catalog-sort">
            <SearchControlIcon name="sort" />
            <span className="sr-only">Sort results</span>
            <span className="catalog-select-value" aria-hidden="true">
              {sortLabels[state.sort]}
            </span>
            <select
              aria-label="Sort results"
              value={state.sort}
              onChange={(event) =>
                updateSearch({ sort: event.target.value as SearchSort })
              }
            >
              <option value="relevant">Most relevant</option>
              <option value="title-asc">Title: A–Z</option>
              <option value="title-desc">Title: Z–A</option>
            </select>
          </label>
        </div>

        {filtersOpen && (
          <section
            id="catalog-extra-filters"
            className="catalog-extra-filters"
            aria-label="Additional course filters"
          >
            <label>
              Minimum rating
              <select
                value={state.rating}
                onChange={(event) =>
                  updateSearch({ rating: event.target.value })
                }
              >
                <option value="any">Any rating</option>
                <option value="4">4.0 and above</option>
                <option value="4.5">4.5 and above</option>
                <option value="4.8">4.8 and above</option>
              </select>
            </label>
            <label>
              Duration
              <select
                value={state.duration}
                onChange={(event) =>
                  updateSearch({ duration: event.target.value })
                }
              >
                <option value="any">Any duration</option>
                <option value="short">Under 2 hours</option>
                <option value="long">2 hours or more</option>
              </select>
            </label>
            <button className="text-button" onClick={resetSearch}>
              Reset all filters
            </button>
          </section>
        )}

        <div className="catalog-category-tabs" aria-label="Featured categories">
          {featuredCategories.map((category) => (
            <button
              key={category}
              className={`filter-chip ${state.category === category ? 'active' : ''}`}
              aria-pressed={state.category === category}
              onClick={() => updateSearch({ category })}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className="catalog-results"
          ref={resultsRef}
          tabIndex={-1}
          aria-label="Search results"
          aria-describedby="catalog-sample-description"
        >
          <p id="catalog-sample-description" className="sr-only">
            This preview repeats six sample courses to demonstrate the supplied
            catalog layout and pagination. The course links open their
            individual details pages.
          </p>
          <div
            className={hasActiveSearch ? 'catalog-result-summary' : 'sr-only'}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <p>
              {resultCount}{' '}
              {state.mode === 'courses'
                ? 'sample course entries'
                : resultCount === 1
                  ? 'creator'
                  : 'creators'}
              {state.q && <> for “{state.q}”</>}
              {resultCount > 0 && (
                <>
                  {' '}
                  · Page {currentPage} of {pageCount}
                </>
              )}
            </p>
            {hasActiveSearch && (
              <button className="text-button" onClick={resetSearch}>
                Clear filters
              </button>
            )}
          </div>

          {resultCount === 0 ? (
            <div className="empty-state catalog-empty-state">
              <Icon name="search" />
              <h2>No {state.mode} found</h2>
              <p>Try another search or clear your filters to explore more.</p>
              <button className="button" onClick={resetSearch}>
                Explore courses
              </button>
            </div>
          ) : state.mode === 'courses' ? (
            <div className="course-grid catalog-grid">
              {visibleCourses.map(({ course, sampleId }) => (
                <CourseCard key={sampleId} course={course} />
              ))}
            </div>
          ) : (
            <article className="catalog-creator-card">
              <div className="catalog-creator-monogram" aria-hidden="true">
                ps
              </div>
              <div>
                <h2>
                  <a href="/creators/purepearl-studio">purepearl studio</a>
                </h2>
                <p>Explore courses in design, business, and technology.</p>
                <p className="catalog-creator-count">6 sample courses</p>
                <a className="button" href="/creators/purepearl-studio">
                  View creator
                </a>
              </div>
            </article>
          )}
        </div>

        {resultCount > 0 && pageCount > 1 && (
          <nav className="catalog-pagination" aria-label="Search result pages">
            <button
              className="catalog-page-arrow"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => updateSearch({ page: currentPage - 1 }, true)}
            >
              <SearchControlIcon name="left" />
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  className="catalog-page-number"
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                  onClick={() => updateSearch({ page }, true)}
                >
                  {page}
                </button>
              ),
            )}
            <button
              className="catalog-page-arrow"
              aria-label="Next page"
              disabled={currentPage === pageCount}
              onClick={() => updateSearch({ page: currentPage + 1 }, true)}
            >
              <SearchControlIcon name="right" />
            </button>
          </nav>
        )}
      </main>
      <Footer />
    </div>
  )
}
