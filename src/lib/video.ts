export type EmbedInfo =
  | { provider: "youtube"; embedSrc: string; thumbnail: string }
  | { provider: "vimeo"; embedSrc: string; thumbnail: null }
  | null;

export function parseEmbedUrl(url?: string): EmbedInfo {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      let id = "";
      if (parsed.hostname.includes("youtu.be")) {
        id = parsed.pathname.slice(1);
      } else if (parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/")[2] ?? "";
      } else {
        id = parsed.searchParams.get("v") ?? "";
      }
      if (!id) return null;
      return {
        provider: "youtube",
        embedSrc: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
        thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      };
    }

    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (!id) return null;
      return {
        provider: "vimeo",
        embedSrc: `https://player.vimeo.com/video/${id}`,
        thumbnail: null,
      };
    }

    return null;
  } catch {
    return null;
  }
}

/** True for a direct video file (uploaded .mp4/.webm/.mov) rather than a YouTube/Vimeo link. */
export function isDirectVideoFile(url?: string) {
  if (!url) return false;
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}
