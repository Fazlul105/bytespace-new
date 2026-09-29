import Footer from './Footer'
import SiteHeader from './SiteHeader'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <>
      <a className="skip-link" href="#not-found-title">
        Skip to content
      </a>
      <div className="not-found-page blue-grid">
        <SiteHeader light />
        <main
          className="not-found-content container"
          aria-labelledby="not-found-title"
        >
          <img
            className="not-found-number"
            src="/assets/not-found-404.svg"
            width="920"
            height="480"
            alt=""
          />
          <div className="not-found-copy">
            <h1 id="not-found-title" tabIndex={-1}>
              <span className="sr-only">404. </span>
              The page you are looking <br />
              for doesn’t exist
            </h1>
            <p>
              Try to use a correct url or go back to homepage to start again
            </p>
            <a className="button" href="/">
              Back to Home
            </a>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
