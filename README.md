# ByteSpace

Public repository: [Fazlul105/bytespace-new](https://github.com/Fazlul105/bytespace-new). Implementation branch: `feat/bytespace-website`.

A React and TypeScript implementation of the **ByteSpace New** frontend assessment for Doin Tech Limited. It includes the full landing page and the bonus sign-in and sign-up pages.

The desktop layout follows the supplied [ByteSpace Figma design](https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website?node-id=0-1). Responsive layouts adapt that reference for smaller screens. Images, illustrations, and brand marks are drawn from the supplied design; text and interactive content are implemented as reusable components.

## Run locally

Use **Node.js 22.12 or later** and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. No environment variables or external service credentials are required.

### Available commands

| Command                | Purpose                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| `npm run dev`          | Start the development server.                                             |
| `npm run build`        | Run the TypeScript build checks and generate production files in `dist/`. |
| `npm run preview`      | Serve the production build locally after running `build`.                 |
| `npm run lint`         | Check the source with Oxlint.                                             |
| `npm run typecheck`    | Run TypeScript project checks.                                            |
| `npm run format:check` | Check formatting with Prettier.                                           |
| `npm run format`       | Apply Prettier formatting.                                                |

## Pages and interactions

| Route       | Page                                                                                            |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `/`         | Landing page with course discovery, learning paths, creator features, testimonials, and footer. |
| `/login`    | Sign-in form and social sign-in controls.                                                       |
| `/signup`   | Account registration form.                                                                      |
| `/register` | Alias for the registration page.                                                                |
| Other paths | A not-found page with a link home.                                                              |

The landing page includes:

- Course search across titles, categories, and the sample creator name.
- Category filters, expandable category choices, result counts, and an empty-results state.
- Learning-path and footer category buttons that update the course results.
- Course preview dialogs with descriptions, lesson details, and pricing.
- A mobile navigation menu and responsive content grids.
- Newsletter input validation and explanatory footer dialogs.

The account forms validate fields locally, explain errors next to their inputs, and focus the first invalid field. Shared UI includes labeled controls, visible keyboard focus, a skip link, live feedback, reduced-motion styles, and native dialogs with Escape dismissal and focus restoration.

## Project structure

```text
src/
  App.tsx                    Route selection and not-found page
  main.tsx                   Application entry point
  index.css                  Global styles, tokens, and accessibility utilities
  App.css                    Landing-page and shared component styles
  fonts.css                  Local font declarations
  components/
    HomePage.tsx             Landing sections, search, and category state
    AuthPage.tsx             Shared sign-in and registration forms
    AuthPage.css             Account-page layout and responsive styles
    CourseCard.tsx           Reusable course summary
    Footer.tsx               Newsletter form and informational dialogs
    Modal.tsx                Shared native dialog
    Brand.tsx                ByteSpace logo and wordmark
    Icon.tsx                 SVG icon components
    Visuals.tsx              Avatars, progress cards, and decorative ornaments
  data/
    courses.ts               Typed sample course data and categories
public/
  assets/                    Optimized source imagery and SVG artwork
  fonts/                     Locally served typography
vercel.json                  Production routing and response headers
```

React manages the interactive state. Course content is kept separately from presentation, and repeated cards, icons, dialogs, and visual elements share components. Vite builds the application, and a small pathname switch handles the routes.

## Frontend scope

This is an interactive frontend assessment with sample content:

- Sign-in and registration validate input but do not authenticate users or create accounts. Form data is not sent to a server or stored by the application; passwords are cleared after successful local validation.
- Google and Facebook controls display a message explaining that social authentication is not connected.
- The newsletter form validates the email format and shows a preview message. It does not subscribe, transmit, or save the address.
- Course prices, reviews, progress, and revenue figures are sample design content. Enrollment, payment processing, a course editor, and account dashboards are not connected.
- Search and filter state lasts for the current page session. The application does not add analytics or tracking cookies.

## Deploy to Vercel

1. Import the public GitHub repository into Vercel.
2. Select the repository directory containing `package.json` and the **Vite** framework preset.
3. Use `npm ci` to install dependencies, `npm run build` to build, and `dist` as the output directory. Use a Node.js version that satisfies the project's engine requirement.
4. Deploy and open the resulting public URL. Check direct navigation and refresh on `/login`, `/signup`, and `/register` as well as the home page.

`vercel.json` includes the build settings and a rewrite to `index.html` for application routes. Asset, font, and favicon requests are excluded from that rewrite. No environment variables are needed.

## Assessment workflow

Development branch: `feat/bytespace-website`. Changes are prepared on this separate branch for review through a pull request, following the assessment's Git branching requirement.

See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for design and font sources.
