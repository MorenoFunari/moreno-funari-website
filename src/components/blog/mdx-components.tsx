import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { Callout } from "./callout";
import styles from "./mdx-content.module.css";
import { ReflectionPrompt } from "./reflection-prompt";

type AnchorProps = ComponentPropsWithoutRef<"a">;

export const mdxComponents = {
  h1: MdxHeadingTwo,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={styles.h2} {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={styles.h3} {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className={styles.paragraph} {...props} />
  ),
  a: MdxLink,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className={styles.list} {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className={styles.list} {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className={styles.listItem} {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className={styles.blockquote} {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className={styles.strong} {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className={styles.emphasis} {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className={styles.rule} {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className={styles.code} {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className={styles.pre} {...props} />
  ),
  Callout,
  ReflectionPrompt,
} satisfies MDXComponents;

function MdxHeadingTwo(props: ComponentPropsWithoutRef<"h1">) {
  return <h2 className={styles.h2} {...props} />;
}

function MdxLink({ href, children, ...props }: AnchorProps) {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link className={styles.link} href={href}>
        {children}
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      className={styles.link}
      href={href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}
