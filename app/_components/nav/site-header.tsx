"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { capture } from "@/app/_lib/posthog";
import { landingContent } from "@/app/_content/landing";
import { useMotionAllowed } from "../motion/use-motion-allowed";

export function SiteHeader() {
  const motionAllowed = useMotionAllowed();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-content/10 bg-base-100/70 text-base-content shadow-sm cw-liquid">
      <div className="navbar mx-auto min-h-20 max-w-7xl gap-4 px-4 sm:min-h-24 sm:px-6 lg:px-8 xl:px-12">
        <div className="navbar-start">
          {motionAllowed ? (
            <motion.a
              href="#"
              className="btn btn-ghost h-auto min-h-0 gap-2.5 rounded-box px-2 py-2 text-base-content normal-case sm:gap-3.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/caffeinated-web-logo.webp"
                alt={`${landingContent.brand.name} logo`}
                width={48}
                height={60}
                unoptimized
                priority
                className="-my-1 h-10 w-auto sm:h-12"
              />
              <span className="text-xs font-semibold leading-none sm:text-base">
                {landingContent.brand.name}
              </span>
            </motion.a>
          ) : (
            <a
              href="#"
              className="btn btn-ghost h-auto min-h-0 gap-2.5 rounded-box px-2 py-2 text-base-content normal-case sm:gap-3.5"
            >
              <Image
                src="/caffeinated-web-logo.webp"
                alt={`${landingContent.brand.name} logo`}
                width={48}
                height={60}
                unoptimized
                priority
                className="-my-1 h-10 w-auto sm:h-12"
              />
              <span className="text-xs font-semibold leading-none sm:text-base">
                {landingContent.brand.name}
              </span>
            </a>
          )}
        </div>

        <nav
          aria-label="Primary"
          className="navbar-end gap-2 text-sm sm:gap-3 sm:text-base"
        >
          <a
            href="#pricing"
            className="btn btn-ghost rounded-box px-3 font-medium text-base-content/70 hover:text-base-content sm:px-4"
            onClick={() => capture("nav_pricing_clicked")}
          >
            Pricing
          </a>
          {motionAllowed ? (
            <motion.a
              href="#contact"
              className="btn btn-primary rounded-box px-4 font-medium shadow sm:px-5"
              whileHover={{ y: -1.5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={() => capture("nav_contact_clicked")}
            >
              Contact
            </motion.a>
          ) : (
            <a
              href="#contact"
              className="btn btn-primary rounded-box px-4 font-medium shadow sm:px-5"
              onClick={() => capture("nav_contact_clicked")}
            >
              Contact
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
