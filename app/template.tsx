import { PageTransitionShell } from "./_components/motion/page-transition-shell";
import type { ReactNode } from "react";

export default function Template({
  children,
}: {
  children: ReactNode;
}) {
  return <PageTransitionShell>{children}</PageTransitionShell>;
}
