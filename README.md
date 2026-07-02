# United States Congress Legislators Dashboard
An easy to navigate tool for viewing information about members of the United States Congress.

## Screenshots
*upcoming*

**Live Demo:**
*upcoming*

## Overview

The database at https://github.com/unitedstates/congress-legislators is mantained through a combination of manual edits by volunteers and automated imports from a variety of sources. Stored in YAML, the text-based format can make it difficult for people to browse, or identify information that may be in need of attention. This project makes their work easier to explore and validate by presenting it through a user-friendly interface. It is a tool for contributors, researchers, and anyone interested in congressional data.

## Features / To Do List

- [ ] load data
- [ ] profile pages
- [ ] responsive layout
- [ ] dark/light mode
- [ ] card view
- [ ] search field
- [ ] filters menu
- [ ] dashboard
- [ ] pinned profiles
- [ ] portrait images
- [ ] state flags
- [ ] notes

## Tech Stack

| Category    | Technologies                           |
|-------------|----------------------------------------|
| Frontend    | React, TypeScript, Tailwind CSS        |
| Tooling     | Vite, Vitest                           |
| Persistence | LocalStorage                           |
| Data Source | Congress Legislators API               |
| Deployment  | *tbd*                                  |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/glowmachine/uscl-dashboard.git
cd uscl-dashboard

# Install dependencies
npm install

# Start the dev server
npm run dev

# Open in browser, typically (for Vite)
http://localhost:5173
````

## Attribution
- civic data from https://github.com/unitedstates/congress-legislators
- state flags from https://github.com/nibsbin/us-state-flags-svg