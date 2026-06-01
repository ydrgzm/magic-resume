import { CSSProperties, forwardRef, ImgHTMLAttributes } from "react";

export function withBasePath(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  return base + src;
}

type ImageLikeSource = string | { src: string };

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: ImageLikeSource;
  fill?: boolean;
  priority?: boolean;
};

const Image = forwardRef<HTMLImageElement, Props>(function Image(
  { src, alt, fill, style, priority, ...rest },
  ref
) {
  const resolvedSrc = withBasePath(typeof src === "string" ? src : src.src);
  const mergedStyle: CSSProperties = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style
      }
    : style || {};

  return (
    <img
      ref={ref}
      src={resolvedSrc}
      alt={alt || ""}
      loading={priority ? "eager" : "lazy"}
      style={mergedStyle}
      {...rest}
    />
  );
});

export default Image;
