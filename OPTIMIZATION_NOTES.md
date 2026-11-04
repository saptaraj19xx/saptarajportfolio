# Portfolio media and performance update

This source package is prepared for the GitHub Pages project at `/saptarajportfolio/`.

## What changed

- Converted all project, About, service, and character images from PNG/JPEG to WebP.
- Resized full project visuals to a maximum 2,600 px long edge while keeping high-quality WebP output for the project modal.
- Added 32 separate project-card thumbnails (maximum 900 px) so the gallery does not download full case-study images just to show a card.
- Added 8 lightweight WebP video posters. The video galleries show these posters instead of loading and autoplaying all MP4 files.
- Videos load only after the visitor opens a clip. Playback uses `preload="none"`.
- Re-encoded the highest-bitrate clips and cropped the three Instagram Reel files to their actual portrait picture area (the source files had large black side borders).
- Added lazy loading and asynchronous decoding to non-critical images.
- Throttled the marquee scroll animation with `requestAnimationFrame` and cached its section position between resizes.
- Prioritised the hero character image and ignored local Vite/TypeScript cache files in Git.
- Explicit `cover.webp` files are now picked first as project covers, instead of an alphabetically earlier gallery image.

## Media size comparison

Approximate uncompressed media sizes from the supplied source archive:

| Media | Original | Optimised package |
|---|---:|---:|
| Full images | 114.38 MB | 18.69 MB |
| Project thumbnails + video posters | — | 2.33 MB |
| Videos | 121.31 MB | 31.61 MB |
| **Total** | **235.69 MB** | **52.63 MB** |

The combined media payload is about 78% smaller. The original uploaded ZIP should be kept as the editable PNG/JPEG source archive; this package contains the web-ready WebP versions.

## Install and build

```bash
npm ci
npm run build
```

The project keeps its existing Vite base path for GitHub Pages: `/saptarajportfolio/`.
