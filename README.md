# Netflix Clone Demo

This is a React + Tailwind Netflix-style clone made for a student assignment.

## API Setup

The app uses the OMDb API.

If you want to use your own key, create a `.env` file in the project root:

```env
VITE_OMDB_API_KEY=your_key_here
```

If no env key is present, the app falls back to the key used during development.

## What The Project Demonstrates

- React components
- Props and state
- `useEffect` for API fetching
- Routing with `react-router-dom`
- Context API for My List
- Responsive UI with Tailwind CSS
- Simple filtering and reusable cards/modals

## Student Notes

- API code: [src/api/freeApis.js](/Users/sanjogsingh/Desktop/clone/netflix-clone/src/api/freeApis.js:1)
- App-level data loading: [src/App.jsx](/Users/sanjogsingh/Desktop/clone/netflix-clone/src/App.jsx:1)
- Shared state for My List: [src/context/ListContext.jsx](/Users/sanjogsingh/Desktop/clone/netflix-clone/src/context/ListContext.jsx:1)

Run the app with:

```bash
npm run dev
```
