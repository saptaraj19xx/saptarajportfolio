Saptaraj Portfolio - Local Video Support Update

Replace these 3 files in your project:

src/data/projects.ts
src/lib/projects.ts
src/sections/ProjectsSection.tsx

Your existing folders remain:

src/assets/projects/
src/assets/videos/

Put video files directly in src/assets/videos/.

Supported:
- .mp4
- .webm
- .mov
- .m4v

The filename automatically becomes the project title.
If the filename contains:
- "reel" -> Reels
- "short" -> Shorts
- "podcast" -> Video Editing
- anything else -> Video Editing

No Supabase, database, or environment variables are used.

After replacing the files, restart Vite:
Ctrl+C
npm run dev
