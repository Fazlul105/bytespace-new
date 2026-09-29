import { useState, type FormEvent } from 'react'
import './AuthPage.css'

type AuthMode = 'login' | 'signup'
type FieldName = 'name' | 'email' | 'password'
type FormErrors = Partial<Record<FieldName, string>>

function FacebookIcon() {
  return (
    <svg viewBox="968.5 711 36 36" aria-hidden="true">
      <path
        d="M1003.17 729C1003.17 719.795 995.705 712.333 986.5 712.333C977.295 712.333 969.833 719.795 969.833 729C969.833 737.319 975.928 744.214 983.896 745.464V733.818H979.664V729H983.896V725.328C983.896 721.151 986.384 718.844 990.191 718.844C992.015 718.844 993.922 719.169 993.922 719.169V723.271H991.82C989.75 723.271 989.104 724.555 989.104 725.874V729H993.727L992.988 733.818H989.104V745.464C997.072 744.214 1003.17 737.319 1003.17 729Z"
        fill="currentColor"
      />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="1056.5 711 36 36" aria-hidden="true" fill="currentColor">
      <path d="M1090.46 729.375C1090.46 728.278 1090.36 727.236 1090.19 726.222H1074.5V732.486H1083.49C1083.08 734.542 1081.9 736.278 1080.15 737.458V741.625H1085.51C1088.65 738.722 1090.46 734.444 1090.46 729.375Z" />
      <path d="M1074.5 718.93C1076.96 718.93 1079.15 719.778 1080.89 721.43L1085.64 716.68C1082.76 713.986 1079 712.333 1074.5 712.333C1067.99 712.333 1062.36 716.083 1059.63 721.528L1065.15 725.819C1066.47 721.861 1070.15 718.93 1074.5 718.93Z" />
      <path d="M1074.5 745.667C1067.99 745.667 1062.36 741.917 1059.63 736.472L1065.15 732.18C1066.47 736.139 1070.15 739.069 1074.5 739.069C1076.75 739.069 1078.65 738.458 1080.15 737.458L1085.51 741.625C1082.76 744.167 1079 745.667 1074.5 745.667ZM1065.15 725.819V721.528H1059.63L1065.15 725.819Z" />
      <path d="M1059.63 732.18H1065.15C1064.81 731.18 1064.63 730.111 1064.63 729C1064.63 727.889 1064.82 726.819 1065.15 725.819L1059.63 721.528C1058.49 723.778 1057.83 726.305 1057.83 729C1057.83 731.694 1058.49 734.222 1059.63 736.472V732.18Z" />
      <path d="M1065.15 732.18H1059.63V736.472L1065.15 732.18Z" />
    </svg>
  )
}

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const isSignup = mode === 'signup'
  const [errors, setErrors] = useState<FormErrors>({})
  const [feedback, setFeedback] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const password = String(data.get('password') ?? '')
    const nextErrors: FormErrors = {}

    if (isSignup && name.length < 2) {
      nextErrors.name = 'Enter your full name (at least 2 characters).'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!password || (isSignup && password.length < 8)) {
      nextErrors.password = isSignup
        ? 'Use at least 8 characters for your password.'
        : 'Enter your password.'
    }

    setErrors(nextErrors)
    setFeedback('')
    const firstError = (Object.keys(nextErrors) as FieldName[])[0]
    if (firstError) {
      const input = form.elements.namedItem(firstError)
      if (input instanceof HTMLInputElement) input.focus()
      return
    }

    // This assessment is a frontend preview. Credentials stay in this form and
    // are never sent, logged, or saved. Clear the password after validation.
    const passwordInput = form.elements.namedItem('password')
    if (passwordInput instanceof HTMLInputElement) passwordInput.value = ''
    setFeedback(
      isSignup
        ? 'Your details pass the preview checks. This demo does not create an account, and no details were sent.'
        : 'Your details pass the preview checks. Sign-in is not connected in this demo, and no details were sent.',
    )
  }

  function clearFieldFeedback(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: undefined }))
    setFeedback('')
  }

  return (
    <main className={`auth-page auth-page--${mode}`}>
      <div className="auth-shell">
        <header className="auth-header">
          <a className="auth-home" href="/" aria-label="ByteSpace home">
            <img
              src="/assets/bytespace-mark.svg"
              width="29"
              height="32"
              alt=""
            />
          </a>
        </header>

        <div className="auth-layout">
          <aside
            className="auth-introduction"
            aria-labelledby="auth-introduction-title"
          >
            <h2 id="auth-introduction-title">
              {isSignup ? 'Sign up and come in' : 'Sign in with ease'}
            </h2>
            <p>
              {isSignup
                ? 'The registration process is straightforward, uncomplicated, and efficient, allowing users to sign up quickly, easily, and at no cost'
                : 'Experience a seamless and efficient sign-in process that grants you instant access to a world of knowledge.'}
            </p>
            <img
              className="auth-illustration"
              src="/assets/auth-illustration.svg"
              width="552"
              height="587"
              alt=""
            />
          </aside>

          <section className="auth-card" aria-labelledby="auth-title">
            <div className="auth-card-heading">
              <p className="auth-eyebrow">
                {isSignup ? 'Create an Account' : 'Sign In'}
              </p>
              <h1 id="auth-title">
                {isSignup ? (
                  <>
                    Welcome to
                    <br />
                    ByteSpace
                  </>
                ) : (
                  'Welcome Back'
                )}
              </h1>
            </div>

            <form className="auth-form" noValidate onSubmit={handleSubmit}>
              <div className="auth-fields">
                {isSignup && (
                  <div className="auth-field">
                    <label htmlFor="auth-name">Full Name</label>
                    <input
                      id="auth-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jamie Davis"
                      required
                      maxLength={100}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? 'auth-name-error' : undefined
                      }
                      onChange={() => clearFieldFeedback('name')}
                    />
                    {errors.name && (
                      <p className="auth-error" id="auth-name-error">
                        {errors.name}
                      </p>
                    )}
                  </div>
                )}
                <div className="auth-field">
                  <label htmlFor="auth-email">Email</label>
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    placeholder="designer@example.com"
                    required
                    maxLength={254}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'auth-email-error' : undefined
                    }
                    onChange={() => clearFieldFeedback('email')}
                  />
                  {errors.email && (
                    <p className="auth-error" id="auth-email-error">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="auth-field">
                  <label htmlFor="auth-password">Password</label>
                  <input
                    id="auth-password"
                    name="password"
                    type="password"
                    autoComplete={
                      isSignup ? 'new-password' : 'current-password'
                    }
                    placeholder="********"
                    required
                    minLength={isSignup ? 8 : undefined}
                    maxLength={128}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? 'auth-password-error' : undefined
                    }
                    onChange={() => clearFieldFeedback('password')}
                  />
                  {errors.password && (
                    <p className="auth-error" id="auth-password-error">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>
              <div className="auth-submit-row">
                <button className="auth-submit" type="submit">
                  {isSignup ? 'Continue' : 'Sign In'}
                </button>
              </div>
            </form>

            {!isSignup && (
              <div className="auth-social">
                <div className="auth-divider">
                  <span>or</span>
                </div>
                <div className="auth-social-buttons">
                  <button
                    type="button"
                    aria-label="Continue with Facebook"
                    onClick={() =>
                      setFeedback(
                        'Facebook sign-in is not connected in this frontend demo.',
                      )
                    }
                  >
                    <FacebookIcon />
                  </button>
                  <button
                    type="button"
                    aria-label="Continue with Google"
                    onClick={() =>
                      setFeedback(
                        'Google sign-in is not connected in this frontend demo.',
                      )
                    }
                  >
                    <GoogleIcon />
                  </button>
                </div>
              </div>
            )}

            <div
              className="auth-feedback"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {feedback && <p>{feedback}</p>}
            </div>
            <p className="auth-switch">
              {isSignup ? 'Already have an account? ' : 'New user? '}
              <a href={isSignup ? '/login' : '/signup'}>
                {isSignup ? 'Login' : 'Create an account'}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
