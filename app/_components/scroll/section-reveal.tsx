"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic on-scroll reveal. Fades + lifts a block into place the first time
 * it enters the viewport — no scroll-jacking, just a one-shot entrance. Under
 * reduced motion it renders its children in the final, static state.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.2,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

type StaggerProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  amount?: number;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;

/**
 * Container that reveals its <StaggerItem> children one after another as the
 * group scrolls into view. Falls back to a plain element under reduced motion.
 */
export function Stagger<T extends ElementType = "div">({
  as,
  children,
  className,
  amount = 0.15,
  ...rest
}: StaggerProps<T>) {
  const reduceMotion = useReducedMotion();
  const Tag = (as ?? "div") as ElementType;

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[(as ?? "div") as "div"];
  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;

export function StaggerItem<T extends ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: StaggerItemProps<T>) {
  const reduceMotion = useReducedMotion();
  const Tag = (as ?? "div") as ElementType;

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[(as ?? "div") as "div"];
  return (
    <MotionTag className={className} variants={itemVariants} {...rest}>
      {children}
    </MotionTag>
  );
}
