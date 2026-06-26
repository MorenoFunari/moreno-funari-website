"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { isActivePath } from "@/lib/navigation";

import styles from "./desktop-navigation.module.css";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Navigazione principale">
      <ul className={styles.list}>
        {siteConfig.mainNavigation.map((item) => {
          const isActive = isActivePath(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={[styles.link, isActive ? styles.active : undefined]
                  .filter(Boolean)
                  .join(" ")}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
