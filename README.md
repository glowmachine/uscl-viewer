# USCL Viewer

Web app for browsing data on current congress legislators from the unitedstates/congress-legislators<sup>[1](https://github.com/unitedstates/congress-legislators)</sup> respository.

[https://glowmachine.github.io/uscl-viewer/](https://glowmachine.github.io/uscl-viewer/)

## Screenshots

| Main View | Dark Mode | Column Selector | Filter Selector | Details Page |
|-|-|-|-|-|
|![Alt text](/public/screenshots/1.jpg "Main View")|![Alt text](/public/screenshots/2.jpg "Dark Mode")|![Alt text](/public/screenshots/4.jpg "Column Selector")|![Alt text](/public/screenshots/3.jpg "Filter Selector")|![Alt text](/public/screenshots/5.jpg "Details Page")

## Overview

<b>unitedstates/congress-legislators</b> is a database mantained through a combination of automated imports and manual edits by volunteers. Since their large text-based records can be intimidating for regular people to browse, this project makes looking through that information easier with a user-friendly interface. It's a webapp for anyone interested in exploring or helping maintain open source congressional data.

## Features

- browse current legislators of congress
- search by any part of any name
- filter by state, type, and party
- select columns of data to view
- view details of individual members
- toggle between light/dark mode
- responsive layout for large and small screens

## Tech Stack

| Area             | Technologies                                  |
|------------------|-----------------------------------------------|
| Frontend         | TypeScript, Tailwind CSS, React, React Router |
| Icons            | Google Fonts, Font Awesome                    |
| State Management | React Context API                             |
| Validation       | Zod                                           |
| Data Persistence | LocalStorage                                  |
| Data Source      | unitedstates/congress-legislator (GitHub)     |
| Build & Testing  | Vite, Vitest                                  |
| Deployment       | GitHub Pages                                  |

## Architecture

Data is fetched from the unitedstates/congress-legislators GitHub repository and validated with Zod schemas, which normalize data from the various source JSON files into per-legislator objects.

## Challenges

- <i>Finding a way to recreate YAML formatting for the members' details pages.</i> I was still learning, so I didn't want to use a library for what seemed like a small task. And, since I was learning TypeScript, my focus was on utilizing types as much as possible. This caused a lot of headaches because I was validating fetched data with object types, but I couldn't use them to output undefined properties since the type was lost at runtime. The solution would've been to duplicate each object type as default object. I ended up learning to use Zod, which neatly provided a runtime-persistent object with schemas, types with z.infer, and a way to validate outside JSON with z.parse.
- <i>Designing a recursive function to output object values in YAML format while walking a Zod schema.</i> This was the first time I had to apply recursion involving two separate objects, the data and the schema. It also required flags for styling. I just started using Zod, and figuring out how to unwrap schemas while still passing type checking was confusing. My function ended up taking args for parent schema, current schema, data, output, and flags for formatting.
- <i>Deploying an SPA project using Vite and React Router on GitHub Pages.</i> I previously used Netlify without any problems, but it was much more involved getting things working on GitHub Pages, especially since these issues could only be observed once deployed, not during the usual development process, and only with vaguely helpful "blocked because of a disallowed MIME type" errors.
  - Vite requires `base` to be set to `/[reponame]/` in `vite.config.ts` because of how it builds relative links. Without this, the app keeps trying to locate resources at `[username].github.io/` instead of `[username].github.io/[reponame]/`. Needing to deploy via a workflow and GitHub Actions was also new to me, but their documentation made it pretty easy.
  - React Router then requires `basename` to be set to `/[reponame]` in the router object so that each path also includes that segment. Without it, even though navigation between pages works, the url will appear to be `[username].github.io/[path]`. This was more difficult to figure out since it wasn't addressed in their official documentation, but found in some StackOverflow threads.
  - Finally, GitHub Pages still returns a 404 error whenever refreshing while not on `/` or visiting another page directly. It looks for that resource at that location, which doesn't actually exist since it's just a router path. The best solution I could find (by [rafgraph](https://github.com/rafgraph/spa-github-pages)) was to let it reach a custom `404.html` that transforms the current url into a query so that `index.html` can check to see if it's a redirect and then let React Router render the correct component.

## Setup

```bash
# Clone the repo
git clone https://github.com/glowmachine/uscl-viewer.git
cd uscl-viewer

# Install dependencies
npm install

# Start the dev server
npm run dev

# Open in browser
http://localhost:5173
````

## Roadmap
- [x] responsive layout
- [x] load data
- [x] table page
- [x] search field
- [x] filters menu
- [x] profile pages
- [x] images
- [x] dark/light mode
- [ ] committee data
- [ ] historical data
- [ ] navigation menu
- [ ] backend

## Attribution

1. congressional data from https://github.com/unitedstates/congress-legislators
2. legislator photos from https://github.com/unitedstates/images
3. state flags from https://github.com/nibsbin/us-state-flags-svg