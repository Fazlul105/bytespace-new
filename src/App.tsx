import { useEffect } from 'react'
import HomePage from './components/HomePage'
import AuthPage from './components/AuthPage'
import './App.css'

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'ByteSpace — Discover Your Passion, Build Your Skills',
      '/login': 'Sign In — ByteSpace',
      '/signup': 'Create an Account — ByteSpace',
      '/register': 'Create an Account — ByteSpace',
    }
    document.title = titles[path] ?? 'Page Not Found — ByteSpace'
  }, [path])
  if (path === '/login') return <AuthPage mode="login" />
  if (path === '/signup' || path === '/register')
    return <AuthPage mode="signup" />
  if (path !== '/')
    return (
      <main className="not-found blue-grid">
        <span>404</span>
        <h1>This page isn’t available.</h1>
        <p>There’s plenty more to discover at ByteSpace.</p>
        <a className="button" href="/">
          Back to home
        </a>
      </main>
    )
  return <HomePage />
}
