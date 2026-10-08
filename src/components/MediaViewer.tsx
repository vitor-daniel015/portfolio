import { useEffect, useRef } from "react";
import { safeUrl, type ContentItem } from "../data/content";
export function MediaViewer({ item }: { item: ContentItem }) {
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const player = video.current;
    // React StrictMode remonta os efeitos em desenvolvimento.
    if (player && !player.getAttribute("src")) {
      player.src = safeUrl(item.video_url);
    }
    return () => {
      if (!player) return;
      player.pause();
      player.removeAttribute("src");
      player.load();
    };
  }, [item.id, item.video_url]);
  return item.kind === "video" ? (
    <video
      ref={video}
      key={item.id}
      className="spotlight-video"
      src={safeUrl(item.video_url)}
      poster={safeUrl(item.image)}
      preload="none"
      controls
      autoPlay
      playsInline
      aria-label={item.title}
    />
  ) : (
    <img
      className="spotlight-image"
      src={safeUrl(item.image)}
      alt={item.title}
    />
  );
}
