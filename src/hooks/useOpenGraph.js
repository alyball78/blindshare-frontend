import { useEffect } from "react";

export function useOpenGraph({ title, description, image }) {
  useEffect(() => {
    const setMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content || "");
    };

    setMeta("og:title", title);
    setMeta("og:description", description);
    if (image) setMeta("og:image", image);
  }, [title, description, image]);
}
