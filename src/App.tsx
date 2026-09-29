import { useEffect } from 'react'
import HomePage from './components/HomePage'
import AuthPage from './components/AuthPage'
import SearchPage from './components/SearchPage'
import CoursePage from './components/CoursePage'
import CreatorProfilePage from './components/CreatorProfilePage'
import NotFoundPage from './components/NotFoundPage'
import { courses } from './data/courses'
import './App.css'

const courseAliases: Record<string, string> = {
  'build-digital-asset': 'digital-assets',
  'learn-figma-from-basic': 'figma',
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const courseMatch = path.match(/^\/courses\/([^/]+)(?:\/(lessons|reviews))?$/)
  const namedCoursePage = [
    '/course-details',
    '/course-lessons',
    '/course-reviews',
  ].includes(path)
  const courseId = courseMatch
    ? (courseAliases[courseMatch[1]] ?? courseMatch[1])
    : 'digital-assets'
  const course = courses.find((item) => item.id === courseId)
  const section =
    courseMatch?.[2] ??
    (path === '/course-lessons'
      ? 'lessons'
      : path === '/course-reviews'
        ? 'reviews'
        : 'about')
  const isCourse = !!course && (!!courseMatch || namedCoursePage)
  const isSearch = ['/search', '/search-page', '/courses'].includes(path)
  const isCreator = [
    '/creators/purepearl-studio',
    '/creator-profile',
    '/create-profile',
  ].includes(path)
  const isSignup = ['/signup', '/register'].includes(path)
  let title = 'Page Not Found — ByteSpace'
  if (path === '/')
    title = 'ByteSpace — Discover Your Passion, Build Your Skills'
  else if (path === '/login') title = 'Sign In — ByteSpace'
  else if (isSignup) title = 'Create an Account — ByteSpace'
  else if (isSearch) title = 'Find Your Next Course — ByteSpace'
  else if (isCreator) title = 'PurePearl Studio — ByteSpace'
  else if (isCourse)
    title = `${course.title} · ${section === 'about' ? 'Course Details' : section === 'lessons' ? 'Lessons' : 'Reviews'} — ByteSpace`
  useEffect(() => {
    document.title = title
  }, [title])
  if (path === '/') return <HomePage />
  if (path === '/login') return <AuthPage mode="login" />
  if (isSignup) return <AuthPage mode="signup" />
  if (isSearch) return <SearchPage />
  if (isCreator) return <CreatorProfilePage />
  if (isCourse)
    return (
      <CoursePage
        course={course}
        tab={section as 'about' | 'lessons' | 'reviews'}
      />
    )
  return <NotFoundPage />
}
