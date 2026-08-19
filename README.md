# United States Congress Legislators Dashboard
An easy to navigate tool for viewing information about members of the United States Congress.

## Screenshots
*upcoming*

## Live Demo:
[congress-search-v3.netlify.app](https://congress-search-v3.netlify.app/)

## Overview

The database at https://github.com/unitedstates/congress-legislators is mantained through a combination of automated imports and manual edits. Stored in YAML, the text-based format can make it difficult for people to browse. This project makes exploring the information easier with a user-friendly interface. It is simple a tool for volunteers, researchers, and anyone interested in congressional data.

## Features / To Do List

- [x] load data
- [x] profile pages
- [ ] responsive layout
- [ ] dark/light mode
- [ ] card view
- [x] search field
- [x] filters menu
- [ ] dashboard
- [ ] pinned profiles
- [x] portrait images
- [ ] state flags
- [ ] notes

## Tech Stack

| Category    | Technologies                           |
|-------------|----------------------------------------|
| Frontend    | React, TypeScript, Tailwind CSS        |
| Tooling     | Vite, Vitest                           |
| Persistence | LocalStorage                           |
| Data Source | Congress Legislators                   |
| Icons       | Google Fonts, Font Awesome             |
| Deployment  | Netlify                                |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/glowmachine/congress-search-v3.git
cd congress-search-v3

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