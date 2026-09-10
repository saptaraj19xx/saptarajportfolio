# Saptaraj Portfolio — Local Projects

This version does **not** use Supabase, a database, or environment variables.

## Add new work

Put images directly in:

`src/assets/projects/`

Supported formats:
- PNG
- JPG / JPEG
- WEBP
- GIF

You do not need to edit `projects.ts`.

The site automatically discovers every image in that folder and displays it in the Projects section.

## Run

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Notes

The project metadata is generated from the filename. For example:

`my-awesome-poster_01.png`

becomes:

`My Awesome Poster 01`

The default category is `Graphic Design`.

For different categories, descriptions, videos, or individual project pages, the project data can later be extended without adding a database.
