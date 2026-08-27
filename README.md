# United States Congress Legislators Viewer
A webapp for quickly looking up information on members of the US Congress.

## Screenshots
*upcoming*

## Live Demo:
[uscl-viewer.netlify.app](https://uscl-viewer.netlify.app/)

## Overview

The database at [unitedstates/congress-legislators](https://github.com/unitedstates/congress-legislators) is mantained through a combination of automated imports and manual edits. Their large text-based records can be intimidating or difficult for regular people to browse. This project makes exploring that information easier with a user-friendly interface. It's a webapp for volunteers, researchers, and anyone interested in congressional data.

## Features / To Do List

- [x] load data
- [x] profile pages
- [x] responsive layout
- [x] dark/light mode
- [x] search field
- [x] filters menu
- [x] portrait images
- [x] state flags
- [ ] card view
- [ ] pinned profiles
- [ ] notes
- [ ] dashboard

## Tech Stack

| Area             | Technologies                    |
|------------------|---------------------------------|
| Frontend         | React, TypeScript, Tailwind CSS |
| Build & Testing  | Vite, Vitest                    |
| Data Persistence | LocalStorage                    |
| Data Source      | Congress Legislators            |
| Icons            | Google Fonts, Font Awesome      |
| Deployment       | Netlify                         |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/glowmachine/uscl-viewer.git
cd uscl-viewer

# Install dependencies
npm install

# Start the dev server
npm run dev

# Open in browser, typically (for Vite)
http://localhost:5173
````

## Attribution
- civic data from https://github.com/unitedstates/congress-legislators
- legislators photos from https://github.com/unitedstates/images
- state flags from https://github.com/nibsbin/us-state-flags-svg