import Image from "next/image";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
};

export function MediaImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "100vw",
  fill = false,
  width = 1400,
  height = 933,
}: MediaImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        quality={75}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      quality={75}
      priority={priority}
      loading={priority ? undefined : "lazy"}
    />
  );
}
