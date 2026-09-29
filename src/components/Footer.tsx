import { useState } from 'react'
import type { FormEvent } from 'react'
import Brand from './Brand'
import Modal from './Modal'
const information: Record<string, string> = {
  'Affiliate Program':
    'Interested in sharing your knowledge? Explore the creator section and discover how ByteSpace brings learners and creators together. Affiliate registration is not available in this preview.',
  Contact:
    'This is a ByteSpace website preview. A customer support service is not connected. You can explore the featured courses or visit the sign-up page to try the form.',
  Help: 'Search for a course, choose a category, or select a course card to see its details, lessons, and reviews. Use Sign In or Join Us to explore the account pages. Forms validate your input locally; accounts and purchases are not created.',
  About:
    'ByteSpace brings learners and creators together to discover new skills. This frontend preview recreates the supplied ByteSpace design, including its sample courses and community stories.',
  'Privacy Policy':
    'Account and newsletter fields are validated locally without sending or saving their contents. Search-page query and filter choices appear in the page URL so results can be shared and revisited. Vercel serves the website and may process standard request information under its own privacy policy.',
  'Terms of Service':
    'This website is an assessment preview. Courses, ratings, prices, and testimonials are sample content from the supplied design. Real enrollment, account creation, and purchases are not available.',
  'Cookies Settings':
    'This preview does not use tracking cookies or save account details in your browser. There are no optional cookies to configure.',
}
export default function Footer({
  onCategory,
}: {
  onCategory?: (name: string) => void
}) {
  const [notice, setNotice] = useState('')
  const [info, setInfo] = useState<string | null>(null)
  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice(
      'Thanks for your interest! This is a preview, so your email has not been sent or saved.',
    )
    event.currentTarget.reset()
  }
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="newsletter">
            <Brand />
            <p>
              Stay Up to date with our latest features and releases by joining
              our newsletter.
            </p>
            <form onSubmit={subscribe}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email for the newsletter
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                required
                maxLength={254}
              />
              <button
                className="button"
                type="submit"
                aria-label="Search — join newsletter"
              >
                Search
              </button>
            </form>
            <p className="newsletter-consent">
              By subscribing, you agree to our{' '}
              <button onClick={() => setInfo('Privacy Policy')}>
                Privacy Policy
              </button>{' '}
              and consent to receive updates from our
              <br className="wide-break" /> company.
            </p>
            <p className="newsletter-status" role="status">
              {notice}
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <div>
              <a href="/search">Featured Courses</a>
              <a href="/#categories">Featured Categories</a>
              {['Business', 'IT', 'Design'].map((name) => (
                <a
                  key={name}
                  href={`/search?category=${encodeURIComponent(name === 'IT' ? 'IT & Software' : name)}`}
                  onClick={
                    onCategory
                      ? (event) => {
                          if (
                            event.metaKey ||
                            event.ctrlKey ||
                            event.shiftKey ||
                            event.altKey
                          )
                            return
                          event.preventDefault()
                          onCategory(name === 'IT' ? 'IT & Software' : name)
                        }
                      : undefined
                  }
                >
                  {name}
                </a>
              ))}
            </div>
            <div>
              {[
                'Development',
                'Marketing',
                'Photography',
                'Finance',
                'Sport',
              ].map((name) => (
                <a
                  key={name}
                  href={`/search?category=${encodeURIComponent(name)}`}
                  onClick={
                    onCategory
                      ? (event) => {
                          if (
                            event.metaKey ||
                            event.ctrlKey ||
                            event.shiftKey ||
                            event.altKey
                          )
                            return
                          event.preventDefault()
                          onCategory(name)
                        }
                      : undefined
                  }
                >
                  {name}
                </a>
              ))}
            </div>
            <div>
              <a href="/#creators">Become a Creator</a>
              {['Affiliate Program', 'Contact', 'Help', 'About'].map((name) => (
                <button key={name} onClick={() => setInfo(name)}>
                  {name}
                </button>
              ))}
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>@ 2023 ByteSpace. All rights reserved.</p>
          <div>
            {['Privacy Policy', 'Terms of Service', 'Cookies Settings'].map(
              (name) => (
                <button key={name} onClick={() => setInfo(name)}>
                  {name}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
      {info && (
        <Modal title={info} onClose={() => setInfo(null)}>
          <p>{information[info]}</p>
          <button className="button" onClick={() => setInfo(null)}>
            Got it
          </button>
        </Modal>
      )}
    </footer>
  )
}
