import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  variant?: "nav" | "footer";
  onClick?: () => void;
};

export function BrandLogo({ variant = "nav", onClick }: BrandLogoProps) {
  const isNav = variant === "nav";

  return (
    <Link
      href="/"
      className={isNav ? "nav__brand" : "footer__brand-link"}
      onClick={onClick}
    >
      <Image
        src="/brand/full-lockup.png"
        alt="Global Fire Airlines"
        width={1952}
        height={766}
        className={isNav ? "nav__logo" : "footer__logo"}
        priority={isNav}
      />
    </Link>
  );
}
