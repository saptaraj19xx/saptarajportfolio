# Saptaraj Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Add new work

For a single-image project, add a **WebP** file directly to:

`src/assets/projects/`

The project is automatically discovered and placed in the Graphic Design category.

For a multi-image project, create a folder under `src/assets/projects/` and add its folder name, title, category and description to `projectConfig` in `src/data/projects.ts`. Name the main image `cover.webp` so it is used as the card cover. Add a matching thumbnail under `src/assets/project-thumbnails/` using the same relative folder and filename.

## Run locally

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The Vite base path is configured for GitHub Pages at `/saptarajportfolio/`.

See [OPTIMIZATION_NOTES.md](./OPTIMIZATION_NOTES.md) for the media and performance changes in this package.
