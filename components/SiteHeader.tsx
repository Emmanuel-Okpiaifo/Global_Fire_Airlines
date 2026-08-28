"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const links = [
  { href: "/#corridor", label: "The corridor" },
  { href: "/#membership", label: "Membership" },
  { href: "/#experience", label: "The experience" },
  { href: "/#join", label: "Join the list" },
];

const DRAWER_MS = 380;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open || closing);
    return () => document.body.classList.remove("nav-open");
  }, [open, closing]);

  const drawerVisible = open || closing;

  const close = () => {
    if (!open || closing) return;
    setClosing(true);
    setOpen(false);
  };

  const toggle = () => {
    if (open) {
      close();
      return;
    }
    setClosing(false);
    setOpen(true);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closing]);

  const drawerClass = open
    ? "nav__drawer--open"
    : closing
      ? "nav__drawer--closing"
      : "";

  useEffect(() => {
    if (!open && closing) {
      const timer = window.setTimeout(() => setClosing(false), DRAWER_MS);
      return () => window.clearTimeout(timer);
    }
  }, [open, closing]);

  return (
    <header className={`nav ${scrolled || drawerVisible ? "nav--solid" : ""}`}>
      <div className="nav__bar">
        <BrandLogo variant="nav" onClick={close} />

        <button
          type="button"
          className={`nav__burger ${open ? "nav__burger--open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav__desktop" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/#join" className="nav__cta">
            Join founding circle
          </Link>
        </nav>
      </div>

      <div
        id={menuId}
        className={`nav__drawer ${drawerClass}`}
        aria-hidden={!drawerVisible}
      >
        <button
          type="button"
          className="nav__backdrop"
          aria-label="Close menu"
          onClick={close}
          tabIndex={drawerVisible ? 0 : -1}
        />
        <div className="nav__panel">
          <nav className="nav__mobile" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#join"
              className="nav__cta"
              onClick={close}
            >
              Join founding circle
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
