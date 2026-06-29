"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { siteConfig } from "@/config/site";
import { isActivePath } from "@/lib/navigation";

import styles from "./mobile-navigation.module.css";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("is-menu-open");
      return;
    }

    document.body.classList.add("is-menu-open");
    queueMicrotask(() => {
      firstLinkRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        queueMicrotask(() => {
          buttonRef.current?.focus();
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-menu-open");
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };
  const toggleMenu = () => setIsOpen((current) => !current);

  return (
    <div className={styles.mobileNavigation}>
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
        className={styles.button}
        onClick={toggleMenu}
        ref={buttonRef}
        type="button"
      >
        <span className={styles.icon} aria-hidden="true">
          <span className={styles.iconLine} />
          <span className={styles.iconLine} />
          <span className={styles.iconLine} />
        </span>
      </button>

      {isOpen ? (
        <>
          <button
            aria-label="Chiudi menu"
            className={styles.backdrop}
            onClick={closeMenu}
            type="button"
          />
          <nav
            aria-label="Menu mobile"
            className={styles.panel}
            id={panelId}
          >
            <ul className={styles.list}>
              {siteConfig.mainNavigation.map((item, index) => {
                const isActive = isActivePath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        styles.link,
                        isActive ? styles.active : undefined,
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      href={item.href}
                      onClick={closeMenu}
                      ref={index === 0 ? firstLinkRef : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className={styles.secondaryList}>
              <li>
                <Link
                  aria-current={pathname === "/contatti" ? "page" : undefined}
                  className={[
                    styles.link,
                    pathname === "/contatti" ? styles.active : undefined,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  href="/contatti"
                  onClick={closeMenu}
                >
                  Contatti
                </Link>
              </li>
            </ul>

            <ButtonLink
              className={styles.cta}
              fullWidth
              href="/#inizia-da-qui"
              onClick={closeMenu}
            >
              Inizia da qui
            </ButtonLink>
          </nav>
        </>
      ) : null}
    </div>
  );
}
